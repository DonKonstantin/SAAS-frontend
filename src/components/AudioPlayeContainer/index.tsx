import React, {FC, useEffect, useRef, useState} from "react";
import AudioPlayer from 'react-h5-audio-player';
import H5AudioPlayer from 'react-h5-audio-player';
import {audioPlayerChangeSongBus$, audioPlayerControlBus$, useAudioPlayer} from "../../context/AudioPlayerContext";
import {distinctUntilChanged, distinctUntilKeyChanged} from "rxjs";
import {List, ListItem, ListItemIcon, ListItemText, Portal, Typography} from "@mui/material";
import Draggable from 'react-draggable';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import clsx from "clsx";
import {clientServerDetector} from "../../services/clientServerDetector";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";

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

const savePositions = getStartPosition();

const SongTitle = styled(Typography)`
    &.MuiTypography-root {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        display: block;
    }
`

const SongName = () => {
    const {songName} = useAudioPlayer(distinctUntilKeyChanged("songName"));

    if (!songName ) {
        return <> </>;
    }

    return <SongTitle variant={"caption"} color={"primary"}>{`${songName}`}</SongTitle>
}

const AudioPlayerContainer: FC = () => {
    const [songSrc, setSongSrc] = useState<string>("");
    const {stopPlay, continuePlay} = useAudioPlayer(distinctUntilChanged(() => true));

    const [showPlayer, setShowPlayer] = useState(false);
    const {t} = useTranslation();


    useEffect(() => {
        const subscriber = audioPlayerChangeSongBus$.subscribe({
            next: value => {
                setShowPlayer(true);

                setSongSrc(value as string);
            }
        });

        subscriber.add(
            audioPlayerControlBus$
                .subscribe({
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

    const player = useRef<H5AudioPlayer | undefined>();

    return (
        <>
            <List>
                <ListItem button onClick={() => setShowPlayer(val => !val)}
                          className={clsx("left-menu-item", "can-activate", {"is-active": showPlayer})}>
                    <ListItemIcon color="inherit">
                        <AudiotrackIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t("Медиа-плеер")}/>
                </ListItem>
            </List>
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
                            header={<SongName/>}
                            onPause={() => stopPlay()}
                            onPlay={() => continuePlay()}
                        />
                    </div>
                </Draggable>
            </Portal>
        </>
    )
}


export default AudioPlayerContainer;
