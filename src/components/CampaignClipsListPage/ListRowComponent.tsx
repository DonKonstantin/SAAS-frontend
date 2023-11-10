import React, { FC, memo } from "react";
import { TableRow, TableCell, Tooltip, IconButton, Typography } from "@mui/material";
import CheckBoxCell from "../List/CheckBoxCell";
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import useCampaignClipsListPage from "./context/hooks";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { isEqual } from "lodash";

type Props = {
  row: CampaignPlayListFileType;
  checkedItems: CampaignPlayListFileType[];
  setChecked: (checkedItems: CampaignPlayListFileType[]) => void;
};

/**
 * Компонент строки листинга роликов проекта
 * @param props
 * @returns
 */
const ListRowComponent: FC<Props> = (props) => {
  const {
    row,
    checkedItems,
    setChecked,
  } = props;

  const {
    file,
    isFreeProjectFile,
    campaignName,
  } = row;

  const { t } = useTranslation();

  const {
    actions: {
      removeClips,
      downloadClip,
    },
  } = useCampaignClipsListPage();

  if (!file) {
    return null;
  }

  const {
    file_name,
    origin_name,
    title,
    last_change_date,
    creation_date,
  } = file;

  const isChecked: boolean = !!isFreeProjectFile && !!checkedItems.find(item => isEqual(item, row));

  const onToggleItemCheckedState = () => {
    if (isChecked) {
      setChecked(checkedItems.filter(item => !isEqual(item, row)));

      return
    }

    setChecked([...checkedItems, row!]);
  };

  //  Обработчик удаления клипа
  const handleDeleteItems = async () => {
    removeClips([row.file.id!]);
  };

  //  Обработчик загрузки клипа
  const handleDownloadItems = () => {
    downloadClip(file_name, origin_name);
  };

  const removeButtonTooltip: string =
    t(`campaign-clips-list.list.tooltip.delete-tooltip.${isFreeProjectFile ? "removable" : "blocked"}`);

  return (
    <TableRow
      hover
      tabIndex={-1}
      sx={{ height: "56px", tableLayout: 'fixed' }}
      data-testid="listRow"
    >
      <CheckBoxCell
        disabled={!isFreeProjectFile}
        checked={isChecked}
        tooltipOnDisabled={t("campaign-clips-list.list.tooltip.delete-tooltip.blocked")}
        onClick={onToggleItemCheckedState}
      />

      <TableCell sx={{ wordWrap: 'break-word' }}>
        <Tooltip title={origin_name}>
          <Typography noWrap>{origin_name}</Typography>
        </Tooltip>
      </TableCell>

      <TableCell>
        <PlayAudioButton
          fileName={file_name}
          songName={title}
          isProject={true}
        />
      </TableCell>

      <TableCell>
        {dayjs(creation_date || last_change_date).format("DD.MM.YYYY")}
      </TableCell>

      <TableCell sx={{ textAlign: 'center' }}>
        {campaignName || ""}
      </TableCell>

      <TableCell />

      <TableCell sx={{ textAlign: 'right' }}>
        <Tooltip title={t("campaign-clips-list.list.tooltip.download-tooltip")}>
          <IconButton
            size="small"
            sx={{ mr: 2 }}
            onClick={handleDownloadItems}
            data-testid="clipDownloadButton"
            id="clipDownloadButton"
          >
            <CloudDownloadIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={removeButtonTooltip}
        >
          <span>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              disabled={!isFreeProjectFile}
              onClick={handleDeleteItems}
              data-testid="rowDeleteButton"
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default memo(ListRowComponent);
