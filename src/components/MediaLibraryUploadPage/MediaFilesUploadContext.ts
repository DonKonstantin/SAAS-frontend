import {LicenseType, MediaFile, MediaFilesDoubles} from "../../services/MediaLibraryService/interface";
import {
    BehaviorSubject,
    combineLatestWith,
    concatMap,
    filter,
    map,
    merge,
    mergeMap,
    of,
    OperatorFunction,
    scan,
    startWith,
    Subject,
    switchMap,
    tap,
} from "rxjs";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {notificationsDispatcher} from "../../services/notifications";
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
    [id: string]: {
        progress: number;
        uploadSize: number;
        uploaded: boolean;
    }
}

// Поля контекста, нужные для получения их снаружи
type MediaFileUploadContext = {
    licenseType: LicenseType | undefined,
    files: MediaFileToUpload[],
}

type ContextActions = {
    addFilesToUpload(files: MediaFileToUpload[]): void;
    setLicenseType(type: LicenseType): void;
    initMediaFilesUploadContext(): () => void;
    uploadFiles(files: MediaFileToUpload[]): void
    updateMediaInfoFile(files: MediaFile): void
    uploadAllFiles(): void;
    deleteAllFiles(): void;
    replaceAllFiles(): void;
    setReplacedTargetFile(file: MediaFile, targetFileId: string, force?: boolean): void
    deleteFilesById(ids: string[])
};


/**
 * Обновление статуса по загрузке файла
 * @param fileId
 * @param progressEvent
 */
const updateFileUploadProgressStatus = (fileId: string, progressEvent) => {
    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    uploadStatus$.next({
        ...uploadStatus$.getValue(),
        [fileId]: {
            progress: percent,
            uploadSize: progressEvent.loaded,
            uploaded: percent >= 100,
        }
    })
}

/**
 * загрузка заменяемого файла на сервер с отслеживанием прогресса
 * @param replacedFile
 */
async function replaceFileOnServer(replacedFile: MediaFileToUpload) {
    const {
        replaceId,
        mediaInfo,
        file
    } = replacedFile;

    const newFileMedia = await mediaFileClient().Replace(
        replaceId || mediaInfo.id,
        file,
        mediaInfo,
        {
            onUploadProgress: updateFileUploadProgressStatus.bind(null, [mediaInfo.uuid])
        }
    );

    replacedFile.mediaInfo = {
        ...mediaInfo,
        ...newFileMedia
    }

    return {
        ...replacedFile
    };
}


/**
 * загрузка нового файла на сервер с отслеживанием прогресса
 * @param uploadedFile
 * @param licenseType
 */
async function uploadFileOnServer(uploadedFile: MediaFileToUpload, licenseType: LicenseType) {
    const {
        mediaInfo,
        file
    } = uploadedFile;

    const newFileMedia = await mediaFileClient().Upload(
        licenseType,
        file,
        mediaInfo,
        {
            onUploadProgress: updateFileUploadProgressStatus.bind(null, [mediaInfo.uuid])
        }
    );

    uploadedFile.mediaInfo = {
        ...mediaInfo,
        ...newFileMedia
    }

    return {
        ...uploadedFile
    };
}

// Текущий выбранный тип лиценции
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
 * Общий список id файлов на удаление
 */
const idMediaFilesToDelete$ = new Subject<string[]>();

const deleteFilesById: ContextActions["deleteFilesById"] = ids => {
    idMediaFilesToDelete$.next(ids);
}

const deleteAllFiles: ContextActions["deleteAllFiles"] = () => {
    idMediaFilesToDelete$.next(
        // берем id, тк он показатель того что файл есть на сервере, и id имеет приоритет на uuid
        mediaFilesToUpload$.getValue().map(f => f.mediaInfo.id || f.mediaInfo.uuid)
    )
    /**
     * TODO Переделать вывод, сделать одну шину, которая будет запускать обновление статусов загрузок файлов
     * т.е. - Любое изменение файла должно обнулять статус загруженного файла
     * */

    /*   mediaFilesToUpload$.next([]);
       uploadStatus$.next({})*/
}

// формируем список файлов на основе переданных id на удаление
const deleteFilesBus$ = idMediaFilesToDelete$.pipe(
    startWith([]),
    concatMap(file => file),
    scan((acc, idOrUuid) => {
        const files = mediaFilesToUpload$.getValue();
        const mediaFile = files.find((file) => file.mediaInfo.id === idOrUuid || file.mediaInfo.uuid === idOrUuid) as MediaFileToUpload;

        if (mediaFile) {
            acc.push(mediaFile );
        }

        return acc;
    }, [] as MediaFileToUpload[]),
);

/**
 * Шина на удаление с сервера
 */
const deleteFromServer$ = deleteFilesBus$.pipe(
    switchMap(async (files) => {
        const deleteFromServer = files.filter(f => !!f.mediaInfo?.id).map(f => f.mediaInfo.id);

        return await mediaLibraryService().delete(deleteFromServer);
    })
);

// Шина на удаление из стейта
const deleteFromState$ = deleteFilesBus$.pipe(
    tap(
        files => {
            const uuid = files.map(f => f.mediaInfo.uuid);
            mediaFilesToUpload$.next(
                mediaFilesToUpload$.getValue().filter(
                    f => !uuid.includes(f.mediaInfo.uuid)
                )
            )
        }
    )
)


const deleteStatusBus$ = new Subject<string[]>();
// удаляем информацию о загрузке файлов и их состояний
const updateStatusBus$ = merge(
    deleteFilesBus$.pipe(
        map(files => {
            return files.map(f => f.mediaInfo.uuid);
        })
    ),
    deleteStatusBus$.pipe(
        startWith([])
    )
).pipe(
    tap(
        uuids => {
            // const uuids = files.map(f => f.mediaInfo.uuid);
            const uploadedState = uploadStatus$.getValue();

            uuids.forEach(uuid => {
                if (Object.prototype.hasOwnProperty.call(uploadedState, uuid)) {
                    delete uploadedState[uuid];
                }
            })

            uploadStatus$.next(uploadedState);
        }
    )
)

/**
 * Устанавливаем таргетированный файл для замены на обновленный
 * @param file
 * @param targetFileId
 * @param force
 */
const setReplacedTargetFile: ContextActions["setReplacedTargetFile"] = (file, targetFileId, force) => {
    const currentFiles = mediaFilesToUpload$.getValue();

    mediaFilesToUpload$.next([
        ...currentFiles.map(
            f => {
                if (f.mediaInfo.uuid !== file.uuid) {
                    return f;
                }

                f.replaceId = targetFileId;
                f.forceUpload = false;

                if (force) {
                    f.forceUpload = force;
                    f.replaceId = "";
                }

                return f;
            }
        )
    ]);
}

const updateMediaInfoFile: ContextActions["updateMediaInfoFile"] = mediaInfo => {
    const files = mediaFilesToUpload$.getValue();
    let needUpdates = false;

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

    // в том случае, если инфа поменялась, то считаем что файл обновился, и его статус о загрузке нужно сбросить
    deleteStatusBus$.next([mediaInfo.uuid]);
    mediaFilesToUpload$.next(newState);
}

const uploadBus$ = new Subject<MediaFileToUpload[]>();

const uploadFiles = (files: MediaFileToUpload[]) => {
    uploadBus$.next(files);
}

const uploadAllFiles: ContextActions["uploadAllFiles"] = () => {
    uploadBus$.next(mediaFilesToUpload$.getValue());
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
            filter(file => {
                    const statusState = uploadStatus$.getValue();

                    if (Object.prototype.hasOwnProperty.call(statusState, file.mediaInfo.uuid)) {
                        return !statusState[file.mediaInfo.uuid].uploaded;
                    }

                    return true;
                }
            ),
            // Отменяем загрузку поставленных на паузу файлов
            filter(file => !stopToUploads$.getValue()
                .find(stoppedFile => stoppedFile.mediaInfo.uuid === file.mediaInfo.uuid)
            ),
            // Отравляем только файлы, прошедшие минимальное количество метатегов
            filter(
                file => metaTagsValidator.validate(file.mediaInfo).requiredPercent === 100
            ),
            switchMap(async () => {
                    // Если нужно принудительно загрузить, пропускаем
                    if (file.forceUpload) {
                        return file;
                    }

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
            // У файла есть дубли, не выбран какой файл и з дублей заменяем и нет принудительного обновления
            filter(file => !(file.hasDoubles && !file.replaceId && !file.forceUpload)),
            switchMap(async (file) => {
                    /**
                     * TODO Поправить баг с реренедером объектов когда меняется поля наличия дублей
                     * TODO Найти решение получше по разделению
                     */
                    if ((file.hasDoubles && !!file.replaceId) || !!file.mediaInfo.id) {
                        return replaceFileOnServer(file);
                    }

                    return uploadFileOnServer(file, licenseType$.getValue());
                }
            ),
            tap(file => {
                if (!file) {
                    return;
                }

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
    subscriber.add(deleteFromServer$.subscribe());
    subscriber.add(deleteFromState$.subscribe());
    subscriber.add(updateStatusBus$.subscribe());

    return () => subscriber.unsubscribe();
};

const actions: ContextActions = {
    setLicenseType,
    addFilesToUpload,
    setReplacedTargetFile,
    updateMediaInfoFile,
    uploadFiles,
    uploadAllFiles,
    deleteAllFiles,
    replaceAllFiles,
    initMediaFilesUploadContext,
    deleteFilesById: deleteFilesById
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
