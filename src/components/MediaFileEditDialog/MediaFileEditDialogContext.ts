import {BehaviorSubject, combineLatestWith, map, OperatorFunction, Subject, tap} from "rxjs";
import {useEffect, useState} from "react";
import {MediaFile} from "../../services/MediaLibraryService/interface";

export const editMediaFilesOpen$ = new Subject();
const file$ = new BehaviorSubject<MediaFile | undefined>(undefined);

type ContextActions = {
    setEditFile(file: MediaFile): void
    closeModal(): void
    initEditFileForm(): () => void
};

type EditMediaFileContext = {
    file: MediaFile | undefined,
    open: boolean
};

const setEditFile: ContextActions["setEditFile"] = file => {
    file$.next(file);

    editMediaFilesOpen$.next(true);
};

const closeModal: ContextActions["closeModal"] = () => {
    editMediaFilesOpen$.next(false);
}

const context$ = new BehaviorSubject<EditMediaFileContext>({
    open: false,
    file: undefined
});

const initEditFileForm = () => {
    const subscriber = contextBus$.subscribe();

    return () => subscriber.unsubscribe();
}

const actions: ContextActions = {
    setEditFile,
    closeModal,
    initEditFileForm
};

const contextBus$ = file$.pipe(
    combineLatestWith(editMediaFilesOpen$),
    map(
        ([file, open]) => ({
            file,
            open
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
