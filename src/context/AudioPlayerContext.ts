import {BehaviorSubject, OperatorFunction, Subject} from "rxjs";
import mediaFileClient from "../services/MediaFileClient";
import {useEffect, useState} from "react";

type AudioPlayerContextActions = {
    playSong(fileName: string): void;
    continuePlay(fileName: string): void;
    stopPlay(): void
}

type AudioPlayerContext = {
    currentPlaySongId: string | undefined
}

const context$ = new BehaviorSubject<AudioPlayerContext>({
    currentPlaySongId: undefined
});

const playSong: AudioPlayerContextActions["playSong"] = async (fileName) => {
    const {
        currentPlaySongId
    } = context$.getValue();

    if (currentPlaySongId === fileName) {
        stopPlay();

        return
    }
    const url = await mediaFileClient().GetFilePath(fileName);

    audioPlayerChangeSongBus$.next(url);
    context$.next({
        ...context$.getValue(),
        currentPlaySongId: fileName,
    })
}

const continuePlay: AudioPlayerContextActions["continuePlay"] = (fileName) => {
    context$.next({
        ...context$.getValue(),
        currentPlaySongId: fileName,
    })
}

const stopPlay: AudioPlayerContextActions["stopPlay"] = () => {
    audioPlayerControlBus$.next(false);
    context$.next({
        ...context$.getValue(),
        currentPlaySongId: undefined,
    })
}

const actions: AudioPlayerContextActions = {
    playSong,
    stopPlay,
    continuePlay
}


export const audioPlayerChangeSongBus$ = new Subject<string>();
export const audioPlayerControlBus$ = new Subject<boolean>();

type WithAudioPlayerContext<T = {}> =
    AudioPlayerContext
    & AudioPlayerContextActions
    & T;

export const useAudioPlayer = (...pipeModifications: OperatorFunction<any, AudioPlayerContext>[]): WithAudioPlayerContext => {
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
