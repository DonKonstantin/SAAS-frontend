import React, { FC, memo } from "react";
import { TableCell, TableRow, IconButton, Stack } from "@mui/material";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilChanged } from "rxjs";
import { CampaignPlayListFile } from "services/campaignListService/types";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/system";

interface Props {
  row: ProjectPlayListFile | CampaignPlayListFile;
  isEditable: boolean;
};

const StyledIconButton = styled(IconButton)({
  padding: 0,
});

const TrackRow: FC<Props> = ({ row, isEditable }) => {
  const { moveTrackUp, moveTrackDown, removeTrack } = useCampaignPlaylistEditContext(distinctUntilChanged(() => true));

  const onMoveTrackUpHandler = () => {
    moveTrackUp(row.file_id);
  };

  const onMoveTrackDownHandler = () => {
    moveTrackDown(row.file_id);
  };

  const onDeleteTrackHandler = () => {
    removeTrack(row.file_id);
  };

  return (
    <TableRow>
      <TableCell>
        {isEditable && (
          <Stack direction="row">
            <StyledIconButton onClick={onMoveTrackUpHandler}>
              <ArrowUpwardIcon sx={{width: 16}}/>
            </StyledIconButton>
            <StyledIconButton onClick={onMoveTrackDownHandler}>
              <ArrowDownwardIcon sx={{width: 16}}/>
            </StyledIconButton>
          </Stack>
        )}
      </TableCell>
      <TableCell sx={{ fontSize: 13 }}>
        {row.file.title}
      </TableCell>
      <TableCell>
        <PlayAudioButton
          fileName={row.file.file_name}
          songName={row.file.title}
        />
      </TableCell>
      <TableCell>
        {isEditable && (
          <StyledIconButton onClick={onDeleteTrackHandler}>
            <DeleteIcon/>
          </StyledIconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(TrackRow);
