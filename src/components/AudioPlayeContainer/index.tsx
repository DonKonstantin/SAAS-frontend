import {FC, useEffect, useRef, useState} from "react";
import AudioPlayer from 'react-h5-audio-player';
import {audioPlayerChangeSongBus$, audioPlayerControlBus$, useAudioPlayer} from "../../context/AudioPlayerContext";
import {distinctUntilChanged} from "rxjs";
import H5AudioPlayer from "react-h5-audio-player";
import {Box} from "@mui/material";

const AudioPlayerContainer: FC = () => {
    const [songSrc, setSongSrc] = useState<string>("");
    const {currentPlaySongId, stopPlay, continuePlay} = useAudioPlayer(distinctUntilChanged(() => true));

    useEffect(() => {
        const subscriber = audioPlayerChangeSongBus$.subscribe({
            next: value => {
                setSongSrc(value as string);
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

    const player = useRef<H5AudioPlayer | undefined>()

    return (
        <Box
            sx={{
                position: "fixed",
                maxWidth: "400px",
                r: 0,
                b: 0
            }}
        >
        <AudioPlayer
            // @ts-ignore
            ref={player}
            layout={"stacked-reverse"}
            src={songSrc}
            onPause={() => stopPlay()}
            onPlay={() => currentPlaySongId && continuePlay(currentPlaySongId)}
        />
        </Box>
    )
}


export default AudioPlayerContainer;
