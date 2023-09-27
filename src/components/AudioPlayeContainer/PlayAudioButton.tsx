import React, { FC } from "react";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { IconButton } from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { distinctUntilKeyChanged } from "rxjs";

type Props = {
  fileName: string;
  isProject: boolean;
  songName?: string;
};

/**
 * Ячейка таблицы с кнопкой воспроизведения клипа
 * @param props
 * @returns
 */
const PlayAudioButton: FC<Props> = props => {
  const { fileName, isProject, songName } = props;

  const { toggleSongPlay, currentPlaySongId } = useAudioPlayer(distinctUntilKeyChanged("currentPlaySongId"));

  return (
    <IconButton
      onClick={() => toggleSongPlay(fileName, isProject, songName)}
    >
      {
        currentPlaySongId !== fileName
          ? (<PlayCircleFilledWhiteOutlinedIcon />)
          : (<PauseCircleOutlineOutlinedIcon />)
      }
    </IconButton>
  )
}

export default PlayAudioButton;
