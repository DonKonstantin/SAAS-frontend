import {FC, useEffect, useRef, useState} from "react";
import AudioPlayer from 'react-h5-audio-player';
import H5AudioPlayer from 'react-h5-audio-player';
import {audioPlayerChangeSongBus$, audioPlayerControlBus$, useAudioPlayer} from "../../context/AudioPlayerContext";
import {distinctUntilChanged} from "rxjs";
import {Box, Fab, Portal} from "@mui/material";
import Draggable from 'react-draggable';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import clsx from "clsx";
import {clientServerDetector} from "../../services/clientServerDetector";

const eventLogger = (_, {x, y}) => {
    localStorage.setItem('audioPlayerPosition', JSON.stringify({x, y}));
};

const getStartPosition = () => {
    if (clientServerDetector().isServer()) {
        return {x: 0, y: 0}
    }

    const savedData = localStorage.getItem("audioPlayerPosition") || "{}";

    try {
        return JSON.parse(savedData)
    } catch {
        return {x: 0, y: 0}
    }
}

const savePositions = getStartPosition()

const AudioPlayerContainer: FC = () => {
    const [songSrc, setSongSrc] = useState<string>("");
    const {currentPlaySongId, stopPlay, continuePlay} = useAudioPlayer(distinctUntilChanged(() => true));

    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const subscriber = audioPlayerChangeSongBus$.subscribe({
            next: value => {
                setShowPlayer(true);

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

                    setShowPlayer(true);
                    // @ts-ignore
                    (player.current.audio.current as HTMLMediaElement).play()
                }
            })
        )

        return () => subscriber.unsubscribe();
    }, [])

    const player = useRef<H5AudioPlayer | undefined>()

    return (
        <>
            <Box
                sx={{p: 1}}
            >
                <Fab
                    color={"primary"}
                    size={"small"}
                    onClick={() => setShowPlayer(val => !val)}
                >
                    <AudiotrackIcon/>
                </Fab>
            </Box>
            <Portal>
                <Draggable
                    handle="#draggable-dialog-title"
                    cancel={'[class*="MuiDialogContent-root"]'}
                    onStop={eventLogger}
                    defaultPosition={savePositions}
                >
                    <div
                        id="draggable-dialog-title"
                        className={clsx("audio-player", {
                            '--visible': showPlayer
                        })}
                    >
                        <AudioPlayer
                            // @ts-ignore
                            ref={player}
                            layout={"stacked-reverse"}
                            src={songSrc}
                            onPause={() => stopPlay()}
                            onPlay={() => currentPlaySongId && continuePlay(currentPlaySongId)}
                        />
                    </div>
                </Draggable>
            </Portal>
        </>
    )
}


export default AudioPlayerContainer;
