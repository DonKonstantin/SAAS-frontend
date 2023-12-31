import {BehaviorSubject, OperatorFunction, Subject} from "rxjs";
import mediaFileClient from "../services/MediaFileClient";
import {useEffect, useState} from "react";

type AudioPlayerContextActions = {
    toggleSongPlay(fileName: string, isProject: boolean, songName?: string): void;
    continuePlay(): void;
    stopPlay(): void
}

type AudioPlayerContext = {
    currentPlaySongId: string | undefined;
    songName: string | undefined;
    lastSongPlay: string | undefined;
    onPause: boolean;
}

const context$ = new BehaviorSubject<AudioPlayerContext>({
    currentPlaySongId: undefined,
    lastSongPlay: undefined,
    onPause: true,
    songName: undefined,
});

const toggleSongPlay: AudioPlayerContextActions["toggleSongPlay"] = async (fileName, isProject: boolean, songName?: string) => {
    const {
        onPause,
        lastSongPlay
    } = context$.getValue();

    if (lastSongPlay === fileName) {
        onPause ? continuePlay() : stopPlay();

        return;
    }

    startPlay(fileName, isProject, songName);
}

const startPlay = async (fileName: string, isProject: boolean, songName?: string) => {
    const url = await mediaFileClient().GetFilePath(fileName, isProject);

    audioPlayerChangeSongBus$.next(url);
    audioPlayerControlBus$.next(true);

    context$.next({
        ...context$.getValue(),
        currentPlaySongId: fileName,
        lastSongPlay: fileName,
        onPause: false,
        songName: songName || undefined
    })
}

const continuePlay: AudioPlayerContextActions["continuePlay"] = () => {
    audioPlayerControlBus$.next(true);
    const {
        lastSongPlay
    } = context$.getValue();

    context$.next({
        ...context$.getValue(),
        currentPlaySongId: lastSongPlay,
        onPause: false,
    })
}


const stopPlay: AudioPlayerContextActions["stopPlay"] = () => {
    audioPlayerControlBus$.next(false);

    context$.next({
        ...context$.getValue(),
        currentPlaySongId: undefined,
        onPause: true,
    })
}

const actions: AudioPlayerContextActions = {
    toggleSongPlay,
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
