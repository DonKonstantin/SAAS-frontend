import {BehaviorSubject, OperatorFunction, Subject} from "rxjs";
import mediaFileClient from "../services/MediaFileClient";
import {useEffect, useState} from "react";

type AudioPlayerContextActions = {
    playSong(id: string): void;
    continuePlay(id: string): void;
    stopPlay(): void
}

type AudioPlayerContext = {
    currentPlaySongId: string | undefined
}

const context$ = new BehaviorSubject<AudioPlayerContext>({
    currentPlaySongId: undefined
});

const playSong: AudioPlayerContextActions["playSong"] = async (id) => {
    const src = await mediaFileClient().Load(id);


    audioPlayerChangeSongBus$.next(src);
    context$.next({
        ...context$.getValue(),
        currentPlaySongId: id,
    })
}

const continuePlay: AudioPlayerContextActions["continuePlay"] = (id) => {
    context$.next({
        ...context$.getValue(),
        currentPlaySongId: id,
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

export const useAudioPlayer = (...pipeModifications: OperatorFunction<any, {}>[]): WithAudioPlayerContext => {
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
