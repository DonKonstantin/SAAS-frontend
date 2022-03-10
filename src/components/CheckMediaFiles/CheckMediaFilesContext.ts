import {MediaFilesDoubles} from "../../services/MediaLibraryService/interface";
import {BehaviorSubject, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";
import m3uServiceFactory from "../../services/M3uService";
import mediaLibraryService from "../../services/MediaLibraryService";

const getFileNamesAndPath = (text: string): FilePathAndName[] => {
    const paths = text.split("\n").filter(val => !!val);


    return paths.map(
        path => {
            // @ts-ignore
            const fileName = (path as string).split('\\').pop().split('/').at(-1);

            return {
                fileName: fileName as string || path,
                path
            }
        }
    )
}

type CheckMediaFilesContext = {
    fileCheckResult: MediaFilesDoubles[],
    rawData: string;
    filePathsOrNames: FilePathAndName[],
    fileNames: string[],
    isCheckProgress: boolean,
    isChecked: boolean
    isError: boolean;
}

type CheckMediaFilesContextActions = {
    addFileRawData(filePathOrName: string): void;
    removeFileRawData(filePathOrName: string): void;
    runCheck(): void;
    downloadPlaylist(withDoubles: boolean): void;
    resetCheck(): void;
}

type FilePathAndName = {
    fileName: string,
    path: string,
}

type WithCheckMediaFilesContext<T = {}> =
    CheckMediaFilesContext
    & CheckMediaFilesContextActions
    & T;

class DefaultContext implements CheckMediaFilesContext {
    fileCheckResult: MediaFilesDoubles[] = [];
    rawData: string = "";
    fileNames: string[] = [];
    filePathsOrNames: FilePathAndName[] = [];
    isCheckProgress: boolean = false;
    isChecked: boolean = false;
    isError: boolean = false;
}

const context$ = new BehaviorSubject<CheckMediaFilesContext>(new DefaultContext());

const addFileRawData: CheckMediaFilesContextActions['addFileRawData'] = rawData => {
    context$.next({
        ...context$.getValue(),
        rawData,
    })
}

const removeFileRawData: CheckMediaFilesContextActions["removeFileRawData"] = () => {
    context$.next(
        {
            ...new DefaultContext(),
            rawData: context$.getValue().rawData
        }
    );
}

const runCheck: CheckMediaFilesContextActions["runCheck"] = async () => {
    context$.next({
        ...context$.getValue(),
        isChecked: true,
        isError: false,
        isCheckProgress: true
    });

    const {
        rawData,
    } = context$.getValue();

    const filesData = getFileNamesAndPath(rawData);

    try {
        const result = await mediaLibraryService().findDoubles(
            filesData.map(info => info.fileName)
        );

        const allFilesDoubleData: MediaFilesDoubles[] = filesData.map(({fileName, path}) => {
            const doubles = result.find(r => r.fileName === fileName)?.doubles || [];

            return {
                fileName: path,
                doubles
            }
        });

        context$.next({
            ...context$.getValue(),
            isChecked: true,
            fileCheckResult: allFilesDoubleData,
            filePathsOrNames: filesData,
            isCheckProgress: false
        });
    } catch (e) {
        context$.next({
            ...context$.getValue(),
            isChecked: true,
            isError: true,
            fileCheckResult: [],
            filePathsOrNames: filesData,
            isCheckProgress: false
        });
    }
}
const resetCheck: CheckMediaFilesContextActions["resetCheck"] = () => {
    context$.next({
        ...context$.getValue(),
        fileCheckResult: [],
        isChecked: false,
        isCheckProgress: false,
        isError: false,
    })
}

const downloadPlaylist: CheckMediaFilesContextActions["downloadPlaylist"] = (withDoubles = false) => {
    const {fileCheckResult} = context$.getValue();

    const fileNames = fileCheckResult.filter(
        f => {
            if (withDoubles) {
                return true;
            }

            return f.doubles.length === 0
        }
    ).map((f => f.fileName))

    m3uServiceFactory().createPlaylist(fileNames);
}


const actions: CheckMediaFilesContextActions = {
    addFileRawData,
    removeFileRawData,
    runCheck,
    downloadPlaylist,
    resetCheck
};

export const useCheckMediaFilesContext = (...pipeModifications: OperatorFunction<any, CheckMediaFilesContext>[]): WithCheckMediaFilesContext => {
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
