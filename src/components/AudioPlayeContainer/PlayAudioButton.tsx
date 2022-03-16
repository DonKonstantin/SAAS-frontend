import {FC} from "react";
import {useAudioPlayer} from "../../context/AudioPlayerContext";
import {IconButton} from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import {distinctUntilKeyChanged} from "rxjs";

type Props = {
    fileName: string
}

const PlayAudioButton: FC<Props> = props => {
    const {fileName} = props;
    const {toggleSongPlay, currentPlaySongId} = useAudioPlayer(distinctUntilKeyChanged("currentPlaySongId"));

    return (
        <IconButton
            onClick={() => toggleSongPlay(fileName)}
        >
            {
                currentPlaySongId !== fileName
                    ? (<PlayCircleFilledWhiteOutlinedIcon/>)
                    : (<PauseCircleOutlineOutlinedIcon/>)
            }
        </IconButton>
    )
}

export default PlayAudioButton;
