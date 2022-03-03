import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {BehaviorSubject, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";

type SelectReplaceFileDialogContext = {
    availableFiles: MediaFile[],
    targetFile: MediaFile | undefined
    open: boolean,
}

const context$ = new BehaviorSubject<SelectReplaceFileDialogContext>({
    availableFiles: [],
    targetFile: undefined,
    open: false
})


type SelectReplaceFileDialogActions = {
    openReplaceFileDialog(targetFile: MediaFile, availableFiles: MediaFile[]): void
    closeReplaceFileDialog(): void
}

const openReplaceFileDialog: SelectReplaceFileDialogActions["openReplaceFileDialog"] = (targetFile, availableFiles) => {
    context$.next({
        availableFiles,
        targetFile,
        open: true
    })
}

const closeReplaceFileDialog: SelectReplaceFileDialogActions["closeReplaceFileDialog"] = () => {
    context$.next({
        availableFiles: [],
        targetFile: undefined,
        open: true
    })
}

type WithReplaceFileDialog<T = {}> =
    SelectReplaceFileDialogContext
    & SelectReplaceFileDialogActions
    & T

const actions = {
    openReplaceFileDialog,
    closeReplaceFileDialog
}


export const useReplaceFileDialog = (...pipeModifications: OperatorFunction<any, SelectReplaceFileDialogContext>[]): WithReplaceFileDialog => {
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
