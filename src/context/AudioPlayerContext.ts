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
    // const file = await mediaFileClient().Load(fileName);
    // let src = "";


    // const cookie = new Cookies();

    /*const srcPathStream = await fetch(url, {
        method: "get",
        headers: {
            Authorization: cookie.get('token')
        }
    })
        .then(response => {
            const reader = response.body.getReader();
            new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }

                            console.log(value)
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
    ;*/

    // TODO: Добавить получение файла для его воспроизмедение в плеере, сейчас есть проблема с получением стрима


   /* console.log(file)
    console.log(srcPathStream)
    const audio = new Audio()*/
    console.log(url)

    // src = srcPathStream;

   /* if (file) {
        src = URL.createObjectURL(result as Blob);

        console.log(src)
        // audio.src = src
        // audio.load()
    }*/

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
