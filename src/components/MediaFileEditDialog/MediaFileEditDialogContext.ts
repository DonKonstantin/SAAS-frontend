import {BehaviorSubject, combineLatestWith, map, OperatorFunction, startWith, Subject, tap} from "rxjs";
import {useEffect, useState} from "react";
import {MediaFile} from "../../services/MediaLibraryService/interface";

export const editMediaFilesOpen$ = new Subject<boolean>();
const file$ = new BehaviorSubject<MediaFile | undefined>(undefined);
const users$ = new BehaviorSubject<SongUser[]>([]);

export type SongUser = {
    id: string;
    name: string;
    lastName: string
}

type ContextActions = {
    setEditFile(file: MediaFile, users?: SongUser[]): void
    saveEditFile(file: MediaFile): void
    closeModal(): void
    initEditFileForm(): () => void
};

type EditMediaFileContext = {
    file: MediaFile | undefined,
    users: SongUser[] // вспомогательная инфа по пользователям, работающих с файлом
    open: boolean
};

const setEditFile: ContextActions["setEditFile"] =( file, users = []) => {
    file$.next(JSON.parse(JSON.stringify(file)));
    users$.next(users);

    editMediaFilesOpen$.next(true);
};

const saveEditFile:ContextActions["saveEditFile"] = file => {
    file$.next(JSON.parse(JSON.stringify(file)));
}

const closeModal: ContextActions["closeModal"] = () => {
    editMediaFilesOpen$.next(false);
}

const context$ = new BehaviorSubject<EditMediaFileContext>({
    open: false,
    file: undefined,
    users: []
});

const initEditFileForm = () => {
    const subscriber = contextBus$.subscribe();

    return () => subscriber.unsubscribe();
}

const actions: ContextActions = {
    setEditFile,
    saveEditFile,
    closeModal,
    initEditFileForm
};

const contextBus$ = file$.pipe(
    combineLatestWith(editMediaFilesOpen$.pipe(
        startWith(false),
    ),
        users$.pipe(
            startWith([])
        )),
    map(
        ([file, open, users]) => ({
            file,
            open,
            users
        })
    ),
    tap(value => context$.next(value))
)

type WithEditMediaFilesModal<T = {}> =
    EditMediaFileContext
    & ContextActions
    & T
;

export const useEditMediaFilesModal = (...pipeModifications: OperatorFunction<any, EditMediaFileContext>[]): WithEditMediaFilesModal => {
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
};
