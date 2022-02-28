import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";
import {
    BehaviorSubject,
    combineLatestWith,
    filter,
    map,
    mergeMap,
    of,
    OperatorFunction,
    Subject,
    switchMap,
    tap,
    throwError
} from "rxjs";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {notificationsDispatcher} from "../../services/notifications";
import mediaLibraryService from "../../services/MediaLibraryService";
import mediaFileClient from "../../services/MediaFileClient";

// Сущность с комплексной инфой по отравляемой инфе на сервер и сам файл
export type MediaFileToUpload = {
    mediaInfo: MediaFile & { uuid?: string },
    file: File,
    replace: boolean    //Флаг для перезаписи файла
    replaceId: string
}


export type MediaUploadFiles = {
    toUploadFiles: File[] // файлы, отправляемые на загрузку на сервер
    mediaFiles: MediaFile[] // файлы сохраненные в системе, уже после загрузки файла
}

// Поля контекста, нужные для получения их снаружи
type MediaFileUploadContext = {
    licenseType: LicenseType,
    files: MediaFileToUpload[],
}

type ContextActions = {
    addFilesToUpload: { (files: MediaFileToUpload[]): void };
    setLicenseType: { (type: LicenseType): void };
    removeFilesToUpload: { (files: MediaFileToUpload[]): void };
    initMediaFilesUploadContext: { (): () => void };
    uploadFiles: { (files: MediaFileToUpload[]): void };
};

const licenseType$ = new BehaviorSubject<LicenseType>(LicenseType.amurco);

const setLicenseType: ContextActions["setLicenseType"] = type => {
    licenseType$.next(type)
};

/**
 * Все файлы загруженные пользователем в браузер, и ожидающие отправки
 */
const mediaFilesToUpload$ = new BehaviorSubject<MediaFileToUpload[]>([]);

const addFilesToUpload: ContextActions["addFilesToUpload"] = files => {
    const currentFiles = mediaFilesToUpload$.getValue();

    const doubleFilesNames = files.filter(
        file => currentFiles.find(value => value.file.name === file.file.name)
    );

    mediaFilesToUpload$.next([
        ...currentFiles,
        ...files
            .filter(
                file => !currentFiles.find(value => value.file.name === file.file.name)
            )
            .map(
                file => {
                    file.mediaInfo.uuid = uuidv4();

                    return file;
                }
            )
    ]);

    if (doubleFilesNames.length > 0) {
        const fileNames = doubleFilesNames.map(file => file.file.name).join(", ");

        notificationsDispatcher().dispatch({
            message: `Эти файлы уже прикреплены ${fileNames}`,
            type: "info"
        })
    }
};

const removeFilesToUpload: ContextActions["removeFilesToUpload"] = files => {
    const oldState = mediaFilesToUpload$.getValue();

    const state = oldState.filter(file => !files.find(f => f.mediaInfo.uuid === file.mediaInfo.uuid))

    mediaFilesToUpload$.next([
        ...state
    ]);
};

const uploadEmitter$ = new Subject<boolean>();

const uploadAllFiles: ContextActions["uploadFiles"] = () => {
    uploadEmitter$.next(true);
}

type WithMediaUploadHoc = ContextActions & MediaFileUploadContext;
const context$ = new BehaviorSubject<MediaFileUploadContext>({
    files: [],
    licenseType: LicenseType.amurco
})

const fakeUpload = (file) => {
    return setTimeout(
        () => file, Math.random() * 10000
    )
}

const stopToUploads$ = new BehaviorSubject<MediaFileToUpload[]>([]);
const repeatToUpload$ = new BehaviorSubject<MediaFileToUpload[]>([]);
export const uploadStatus$ = new BehaviorSubject<{
    [key: string]: {
        file: MediaFileToUpload,
        progress: number,
        status: string
    }
}[]>([]);
/**
 * Upload file stream
 */
const uploadStream$ = mediaFilesToUpload$.pipe(
    combineLatestWith(uploadEmitter$),
    filter(file => !!file.file),
);

const uploadBus$ = new Subject<MediaFileToUpload[]>();

const uploadFiles = (files: MediaFileToUpload[]) => {
    uploadBus$.next(files);
}


/**
 * 1. В поток uploadBus$ падают файлы, которые нужно загрузить на сервер
 * 2. Превращать поток из массива в отдельные элементы
 * 3. Проверять файл на дубли перед залитием mediaLibraryService().findDoubles(). Дубли
 * файлов размещать в отдельный стейт и не пропускать их дальше
 * 4. Заливать только файлы без дублей
 *
 * Для задублированных файлов
 * 1. Заливать если установлен id заменяемого файла replaceFileId
 * 2. Проверять файл на дубли перед залитием mediaLibraryService().findDoubles(names[])
 */

const newFilesUploadBus$ = uploadBus$.pipe(
    mergeMap(file => file),
    mergeMap(file => of(file)
        .pipe(
            switchMap(
                async () => {
                    const [doubles] = await mediaLibraryService().findDoubles([file.mediaInfo.file_name])

                    if (doubles.doubles.length > 0) {
                        throwError("has doubles")
                    }

                    return file;
                }
            ),
            switchMap(
                async (file) => {
                    return await mediaFileClient().Upload(licenseType$.getValue(), file.file,
                        {
                            onUploadProgress: progressEvent => {
                                uploadStatus$.next({
                                    ...uploadStatus$.getValue(),
                                    [file.mediaInfo.uuid]: {
                                        file: file,
                                        progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
                                        status: progressEvent.status
                                    }
                                })
                            }
                        })
                }
            ),
            tap(console.log)
            /* catchError(
                 err => {
                     console.log(err)
                     throw err;
                 }
             ),
             tap(file => console.log("file", file)),
             share()*/
        ),),
    tap((file) => console.log("file", file)),
);

const initMediaFilesUploadContext: ContextActions["initMediaFilesUploadContext"] = () => {
    const subscriber = licenseType$.pipe(
        combineLatestWith(mediaFilesToUpload$),
        // @ts-ignore
        map(
            ([licenseType, files]) => {
                return {
                    licenseType: licenseType,
                    files: files,
                } as unknown as MediaFileUploadContext
            }
        ),
    ).subscribe({
        next: value => context$.next(value)
    });

    subscriber.add(newFilesUploadBus$.subscribe());
    subscriber.add(repeatToUpload$.subscribe());

    return () => subscriber.unsubscribe();
};

const actions: ContextActions = {
    setLicenseType,
    addFilesToUpload,
    removeFilesToUpload,
    uploadFiles,
    initMediaFilesUploadContext,
};

export const useMediaLibraryUpload = (...pipeModifications: OperatorFunction<any, MediaFileUploadContext>[]): WithMediaUploadHoc => {
    const [contextValue, setContextValue] = useState(context$.getValue())
    useEffect(() => {
        const subscription = context$
            // @ts-ignore
            .pipe(...pipeModifications)
            .subscribe({
                next: data => setContextValue(data)
            })

        return () => {
            try {
                subscription.unsubscribe()
            } catch (e) {
            }
        }
    })

    return {
        ...contextValue,
        ...actions
    }
}
