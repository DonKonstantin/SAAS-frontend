import React, { FC, memo } from "react";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { TableCell, TableRow, IconButton } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilChanged } from "rxjs";

interface Props {
  selected: string[];
  row: CampaignPlayListFileType;
  setSelected: (selected: string[]) => void;
}

/**
 * Компонент строки для таблицы загруженных треков
 * @param param0
 * @returns
 */
const ClipsTableRow: FC<Props> = ({ row, selected, setSelected }) => {
  const { removeLoadedFile } = useCampaignPlaylistEditContext(
    distinctUntilChanged(() => true)
  );

  const isChecked = selected.includes(row.file_id!);

  const onToggleItemCheckedState = () => {
    if (!!isChecked) {
      setSelected(selected.filter((i) => i !== row.file_id));

      return;
    }

    setSelected([...selected, row.file_id!]);
  };

  const onDeleteTrackHandler = () => {
    removeLoadedFile([row.file_id]);
  };

  return (
    <TableRow>
      <CheckBoxCell checked={isChecked} onClick={onToggleItemCheckedState} />
      <TableCell>{row.file.title}</TableCell>
      <TableCell>
        <PlayAudioButton
          fileName={row.file.file_name}
          songName={row.file.title}
        />
      </TableCell>
      <TableCell>
        <IconButton sx={{ p: 0 }} onClick={onDeleteTrackHandler}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default memo(ClipsTableRow);
