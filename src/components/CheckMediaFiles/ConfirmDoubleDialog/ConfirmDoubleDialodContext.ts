import {MediaFile} from "../../../services/MediaLibraryService/interface";
import {BehaviorSubject, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";

type ConfirmDoubleDialogContext = {
    availableFiles: MediaFile[],
    targetFileName: string | undefined
    open: boolean,
}

const context$ = new BehaviorSubject<ConfirmDoubleDialogContext>({
    availableFiles: [],
    targetFileName: undefined,
    open: true
})


type ConfirmDoubleDialogActions = {
    openReplaceFileDialog(targetFileName: string, availableFiles: MediaFile[]): void
    closeReplaceFileDialog(): void
}

const openReplaceFileDialog: ConfirmDoubleDialogActions["openReplaceFileDialog"] = (targetFileName, availableFiles) => {
    context$.next({
        availableFiles,
        targetFileName,
        open: true,
    })
}

const closeReplaceFileDialog: ConfirmDoubleDialogActions["closeReplaceFileDialog"] = () => {
    context$.next({
        ...context$.getValue(),
        open: false
    })
}

type WithReplaceFileDialog<T = {}> =
    ConfirmDoubleDialogContext
    & ConfirmDoubleDialogActions
    & T

const actions = {
    openReplaceFileDialog,
    closeReplaceFileDialog
}

export const useConfirmDoubleDialog = (...pipeModifications: OperatorFunction<any, ConfirmDoubleDialogContext>[]): WithReplaceFileDialog => {
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
