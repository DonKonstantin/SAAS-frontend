import {LicenseType, MediaFile, MediaFilesDoubles} from "../../services/MediaLibraryService/interface";
import {
    BehaviorSubject,
    combineLatestWith,
    concatMap,
    filter,
    map,
    mergeMap,
    of,
    OperatorFunction,
    Subject,
    switchMap,
    tap,
} from "rxjs";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {notificationsDispatcher} from "../../services/notifications";
import mediaLibraryService from "../../services/MediaLibraryService";
import mediaFileClient from "../../services/MediaFileClient";
import MediaFileTagValidator from "../../services/MediaLibraryService/validator/MediaFileTagValidator";

/**
 * TODO: Сделать удаление файлов, уже загруженных, с сервера
 */

// Сущность с комплексной инфой по отравляемой инфе на сервер и сам файл
export type MediaFileToUpload = {
    mediaInfo: MediaFile,
    file: File,
    replace: boolean    //Флаг для перезаписи файла
    replaceId: string,  // ID
    hasDoubles: boolean,    // Флаг налиячия дублей файла
    forceUpload?: boolean // флаг принудительной загрузки
}

/**
 * Статус прогресса загрузок файлов
 */
export type ProgressUploadStatusByFile = {
    [key: string]: {
        file: MediaFileToUpload,
        progress: number,
        uploadSize: number
    }
}


export type MediaUploadFiles = {
    toUploadFiles: File[] // файлы, отправляемые на загрузку на сервер
    mediaFiles: MediaFile[] // файлы сохраненные в системе, уже после загрузки файла
}

// Поля контекста, нужные для получения их снаружи
type MediaFileUploadContext = {
    licenseType: LicenseType | undefined,
    files: MediaFileToUpload[],
}

type ContextActions = {
    addFilesToUpload: { (files: MediaFileToUpload[]): void };
    setLicenseType: { (type: LicenseType): void };
    removeFilesToUpload: { (files: MediaFileToUpload[]): void };
    initMediaFilesUploadContext: { (): () => void };
    uploadFiles: { (files: MediaFileToUpload[]): void };
    updateMediaInfoFile: { (files: MediaFile): void };
    uploadAllFiles: { (): void };
    deleteAllFiles: { (): void };
    replaceAllFiles: { (): void }
    setReplacedTargetFile: { (file: MediaFile, targetFileId: string) }
};

const licenseType$ = new BehaviorSubject<LicenseType>(LicenseType.amurco);

// set new license type
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

/**
 * Устанавливаем таргетированный файл для замены на обновленный
 * @param file
 * @param targetFileId
 */
const setReplacedTargetFile: ContextActions["setReplacedTargetFile"] = (file, targetFileId) => {
    const currentFiles = mediaFilesToUpload$.getValue();

    mediaFilesToUpload$.next([
        ...currentFiles.map(
            f => {
                if (f.mediaInfo.uuid !== file.uuid) {
                    return f;
                }

                f.replaceId = targetFileId;

                return f
            }
        )
    ]);
}

const updateMediaInfoFile: ContextActions["updateMediaInfoFile"] = mediaInfo => {
    const files = mediaFilesToUpload$.getValue();
    let needUpdates = false

    const newState = files.map(f => {
        if (f.mediaInfo.uuid !== mediaInfo.uuid) {
            return f;
        }

        needUpdates = true;

        return {
            ...f,
            mediaInfo: {
                ...f.mediaInfo,
                ...mediaInfo
            }
        }
    })

    if (!needUpdates) {
        return;
    }

    const oldUploadedState = uploadStatus$.getValue();
    if (Object.prototype.hasOwnProperty.call(oldUploadedState, mediaInfo.uuid)) {
        delete oldUploadedState[mediaInfo.uuid];

        uploadStatus$.next(oldUploadedState);

        uploadedFiles$.next(
            uploadedFiles$.getValue().filter(f => f.mediaInfo.uuid !== mediaInfo.uuid)
        );
    }


    mediaFilesToUpload$.next(newState);
}

/**
 * Удаление файла из подготовленных к отпарвке. также сбрасывает
 * @param files
 */
const removeFilesToUpload: ContextActions["removeFilesToUpload"] = files => {
    const oldState = mediaFilesToUpload$.getValue();

    const state = oldState.filter(file => !files.find(f => f.mediaInfo.uuid === file.mediaInfo.uuid))

    const oldUploadedState = uploadStatus$.getValue();

    files.forEach(file => {
        if (Object.prototype.hasOwnProperty.call(oldUploadedState, file.mediaInfo.uuid)) {
            delete oldUploadedState[file.mediaInfo.uuid];
        }
    })

    uploadStatus$.next(oldUploadedState);

    mediaFilesToUpload$.next([
        ...state
    ]);
};

const uploadBus$ = new Subject<MediaFileToUpload[]>();

const uploadFiles = (files: MediaFileToUpload[]) => {
    uploadBus$.next(files);
}

const uploadAllFiles: ContextActions["uploadAllFiles"] = () => {
    uploadBus$.next(mediaFilesToUpload$.getValue());
}

const deleteAllFiles: ContextActions["deleteAllFiles"] = () => {
    /**
     * TODO Переделать вывод, сделать одну шину, которая будет запускать обновление статусов загрузок файлов
     * т.е. - Любое изменение файла должно обнулять статус загруженного файла
     * */

    mediaFilesToUpload$.next([]);
    uploadedFiles$.next([])
    uploadStatus$.next({})
}

const replaceAllFiles: ContextActions["replaceAllFiles"] = () => {
    uploadBus$.next(mediaFilesToUpload$.getValue().filter(
        file => !!file.replaceId
    ));
}

type WithMediaUploadHoc = ContextActions & MediaFileUploadContext;
const context$ = new BehaviorSubject<MediaFileUploadContext>({
    files: [],
    licenseType: LicenseType.amurco,
})

const stopToUploads$ = new BehaviorSubject<MediaFileToUpload[]>([]);


// Содержит список уже загруженных файлов
const uploadedFiles$ = new BehaviorSubject<MediaFileToUpload[]>([]);

// Содержит карту дублей для файлов
export const doubleFiles$ = new BehaviorSubject<{
    [key: string]: MediaFilesDoubles
}>({});

export const uploadStatus$ = new BehaviorSubject<ProgressUploadStatusByFile>({});

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
const metaTagsValidator = new MediaFileTagValidator(["title", "origin_name", "artist", "license_type"])

/**
 * TODO: Поправить сбор информации о наличии дублей файлов в единое сообщение, а не для каждого файла раздельно
 */
const filesUploadBus$ = uploadBus$.pipe(
    mergeMap(file => file),
    concatMap(file =>
        of(file as MediaFileToUpload).pipe(
            // Отменяем загрузку уже загруженных файлов
            filter(file => !uploadedFiles$.getValue()
                .find(uploadedFile => uploadedFile.mediaInfo.uuid === file.mediaInfo.uuid)
            ),
            // Отменяем загрузку поставленных на паузу файлов
            filter(file => !stopToUploads$.getValue()
                .find(stoppedFile => stoppedFile.mediaInfo.uuid === file.mediaInfo.uuid)
            ),
            // Отравляем только файлы, прошедшие минимальное количество метатегов
            filter(
                file => metaTagsValidator.validate(file.mediaInfo).requiredPercent === 100
            ),
            switchMap(
                async () => {
                    if (file.replaceId) {
                        const doubles = doubleFiles$.getValue();

                        if (Object.prototype.hasOwnProperty.call(doubles, file.mediaInfo.uuid)) {
                            delete doubles[file.mediaInfo.uuid];

                            doubleFiles$.next(doubles)
                        }
                        return file
                    }

                    const [doubles] = await mediaLibraryService().findDoubles([file.mediaInfo.origin_name])

                    if (doubles.doubles.length > 0) {
                        doubleFiles$.next({
                            ...doubleFiles$.getValue(),
                            // @ts-ignore
                            [file.mediaInfo.uuid as string]: doubles
                        });

                        file.hasDoubles = true

                        notificationsDispatcher().dispatch({
                            message: `Файл ${file.mediaInfo.origin_name} имеет дубли`,
                            type: "warning"
                        })
                    }

                    return {
                        ...file
                    };
                }
            ),
            switchMap(
                async (file) => {
                    /**
                     * TODO Поправить баг с реренедером объектов когда меняется поля наличия дублей
                     */
                    let newFileMedia: MediaFile | undefined;

                    if (file.hasDoubles && !file.replaceId) {
                        return;
                    }

                    // TODO Найти решение получше по разделению
                    if ((file.hasDoubles && !!file.replaceId) || !!file.mediaInfo.id) {
                        newFileMedia = await mediaFileClient().Replace(
                            file.replaceId || file.mediaInfo.id,
                            file.file,
                            file.mediaInfo,
                            {
                                onUploadProgress: progressEvent => {
                                    uploadStatus$.next({
                                        ...uploadStatus$.getValue(),
                                        [file.mediaInfo.uuid as string]: {
                                            file: file,
                                            progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
                                            uploadSize: progressEvent.loaded,
                                        }
                                    })
                                }
                            }
                        );

                        file.mediaInfo = {
                            ...file.mediaInfo,
                            ...newFileMedia
                        }

                        return {
                            ...file
                        };
                    }

                    newFileMedia = await mediaFileClient().Upload(
                        licenseType$.getValue(),
                        file.file,
                        file.mediaInfo,
                        {
                            onUploadProgress: progressEvent => {
                                uploadStatus$.next({
                                    ...uploadStatus$.getValue(),
                                    [file.mediaInfo.uuid as string]: {
                                        file: file,
                                        progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
                                        uploadSize: progressEvent.loaded,
                                    }
                                })
                            }
                        }
                    );

                    file.mediaInfo = {
                        ...file.mediaInfo,
                        ...newFileMedia
                    }

                    return {
                        ...file
                    };
                }
            ),
            tap(file => {
                if (!file) {
                    return;
                }

                uploadedFiles$.next(
                    [...uploadedFiles$.getValue(), file as MediaFileToUpload]
                )

                const files = mediaFilesToUpload$.getValue();
                let needUpdates = false;

                const newState = files.map(f => {
                    if (f.mediaInfo.uuid !== file.mediaInfo.uuid) {
                        return f;
                    }

                    needUpdates = true;

                    return {
                        ...f,
                        mediaInfo: {
                            ...f.mediaInfo,
                            ...file.mediaInfo
                        }
                    }
                })

                if (!needUpdates) {
                    return;
                }

                mediaFilesToUpload$.next(newState);
            }),
        )
    ),
);

const initMediaFilesUploadContext: ContextActions["initMediaFilesUploadContext"] = () => {
    /**
     * TODO: переделать обновление и инициализацию
     */
    mediaFilesToUpload$.next([]);
    uploadedFiles$.next([]);
    uploadStatus$.next({});

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

    subscriber.add(filesUploadBus$.subscribe());
    // subscriber.add(repeatToUpload$.subscribe());

    return () => subscriber.unsubscribe();
};

const actions: ContextActions = {
    setLicenseType,
    addFilesToUpload,
    setReplacedTargetFile,
    updateMediaInfoFile,
    removeFilesToUpload,
    uploadFiles,
    uploadAllFiles,
    deleteAllFiles,
    replaceAllFiles,
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
