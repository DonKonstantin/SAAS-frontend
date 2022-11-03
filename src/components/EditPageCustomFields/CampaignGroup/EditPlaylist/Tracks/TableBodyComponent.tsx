import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import TrackRow from "./TrackRow";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import EmptyRow from "./EmptyRow";

interface Props {
  isEditable: boolean;
  rows: ProjectPlayListFile[] | CampaignPlayListFileType[];
}

/**
 * Компонент тела таблицы треков плэйлиста
 * @param param0
 * @returns
 */
const TableBodyComponent: FC<Props> = ({ rows, isEditable }) => {
  return (
    <TableBody>
      {!!rows.length && rows.map((row) => (
        <TrackRow key={row.id} row={row} isEditable={isEditable} />
      ))}
      {!rows.length && <EmptyRow />}
    </TableBody>
  );
};

export default memo(TableBodyComponent);
