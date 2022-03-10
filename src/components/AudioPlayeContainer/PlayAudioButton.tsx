import {FC} from "react";
import {useAudioPlayer} from "../../context/AudioPlayerContext";
import {IconButton} from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

type Props = {
    fileName: string
}

const PlayAudioButton: FC<Props> = props => {
    const {fileName} = props;
    const {playSong, currentPlaySongId} = useAudioPlayer();

    return (
        <IconButton
            onClick={() => playSong(fileName)}
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
