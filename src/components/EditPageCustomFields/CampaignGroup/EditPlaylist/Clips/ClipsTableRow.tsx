import React, { FC } from "react";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { TableCell, TableRow, IconButton, Tooltip } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilChanged } from "rxjs";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const { file_id, file, isFreeProjectFile } = row;

  const { title, origin_name, file_name } = file;

  const { removeClips } = useCampaignPlaylistEditContext(
    distinctUntilChanged(() => true)
  );

  const isChecked = selected.includes(file_id!);

  const onToggleItemCheckedState = () => {
    if (isChecked) {
      setSelected(selected.filter((i) => i !== file_id));

      return;
    }

    setSelected([...selected, file_id!]);
  };

  const onDeleteTrackHandler = () => {
    removeClips([file_id]);
  };

  const removeTooltipText: string = !!isFreeProjectFile
    ? ""
    : t("edit-campaign-playlist.table.tooltip.remove.single.disable");

  return (
    <TableRow>
      <CheckBoxCell checked={isChecked} onClick={onToggleItemCheckedState} />
      <TableCell>{title.length ? title : origin_name}</TableCell>
      <TableCell>
        <PlayAudioButton
          fileName={file_name}
          songName={title}
          isProject={true}
        />
      </TableCell>
      <TableCell>
        <Tooltip title={removeTooltipText}>
          <div>
            <IconButton sx={{ p: 0 }} onClick={onDeleteTrackHandler} disabled={!isFreeProjectFile}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ClipsTableRow;
