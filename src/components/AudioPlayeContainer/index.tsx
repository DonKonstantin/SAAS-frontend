import {FC, useEffect, useRef, useState} from "react";
import AudioPlayer from 'react-h5-audio-player';
import {audioPlayerChangeSongBus$, audioPlayerControlBus$, useAudioPlayer} from "../../context/AudioPlayerContext";

const AudioPlayerContainer: FC = () => {
    const [songSrc, setSongSrc] = useState<string>("");
    const {currentPlaySongId = "222", stopPlay, continuePlay} = useAudioPlayer();

    useEffect(() => {
        const subscriber = audioPlayerChangeSongBus$.subscribe({
            next: value => {
                setSongSrc(songSrc as string)
            }
        });

        subscriber.add(
            audioPlayerControlBus$.subscribe({
                // @ts-ignore
                next: value => {
                    if (!value) {
                        // @ts-ignore
                        (player.current.audio.current as HTMLMediaElement).pause();

                        return;
                    }

                    // @ts-ignore
                    (player.current.audio.current as HTMLMediaElement).play()
                }
            })
        )

        return () => subscriber.unsubscribe();
    }, [])

    const player = useRef()

    return (
        <AudioPlayer
            ref={player}
            layout={"stacked-reverse"}
            // src={songSrc}
            src={"https://dl1.mp3party.net/download/10410354"}
            onPause={() => stopPlay()}
            onPlay={() => currentPlaySongId && continuePlay(currentPlaySongId)}
        />
    )
}


export default AudioPlayerContainer;
