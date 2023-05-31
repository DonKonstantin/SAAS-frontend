import React, { FC, memo } from "react";
import { TableCell, TableRow, IconButton, Stack } from "@mui/material";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilChanged } from "rxjs";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

interface Props {
  row: CampaignPlayListFileType;
  isEditable: boolean;
}

const StyledIconButton = styled(IconButton)({
  padding: 0,
});

/**
 * Компонент строки для таблицы треков плэйлиста
 * @param param0
 * @returns
 */
const TrackRow: FC<Props> = ({ row, isEditable }) => {
  const { moveTrack, removeTrack } =
    useCampaignPlaylistEditContext(distinctUntilChanged(() => true));

  const onDeleteTrackHandler = () => {
    removeTrack(row.file_id);
  };

  return (
    <TableRow>
      <TableCell>
        {isEditable && (
          <Stack direction="row">
            <StyledIconButton onClick={() => moveTrack(row.file_id, "up")}>
              <ArrowUpwardIcon sx={{ width: 16 }}/>
            </StyledIconButton>
            <StyledIconButton onClick={() => moveTrack(row.file_id, "down")}>
              <ArrowDownwardIcon sx={{ width: 16 }}/>
            </StyledIconButton>
          </Stack>
        )}
      </TableCell>
      <TableCell sx={{ fontSize: 13 }}>{row.file.title.length ? row.file.title : row.file.origin_name}</TableCell>
      <TableCell>
        <PlayAudioButton
          fileName={row.file.file_name}
          songName={row.file.title}
          isProject={false}
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
