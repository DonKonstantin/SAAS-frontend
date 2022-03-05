import {FC} from "react";
import {useAudioPlayer} from "../../context/AudioPlayerContext";
import {IconButton} from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

type Props = {
    fileId: string
}

const PlayAudioButton: FC<Props> = props => {
    const {fileId} = props;
    const {playSong, currentPlaySongId} = useAudioPlayer();

    return (
        <IconButton
            onClick={() => playSong(fileId)}
        >
            {
                currentPlaySongId !== fileId
                    ? (<PlayCircleFilledWhiteOutlinedIcon/>)
                    : (<PauseCircleOutlineOutlinedIcon/>)
            }

        </IconButton>
    )
}

export default PlayAudioButton;
