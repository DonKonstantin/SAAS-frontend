import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import TrackRow from "./TrackRow";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import EmptyRow from "./EmptyRow";

interface Props {
  isEditable: boolean;
  rows: ProjectPlayListFile[] | CampaignPlayListFileType[];
  isProject: boolean;
}

/**
 * Компонент тела таблицы треков плэйлиста
 * @param param0
 * @returns
 */
const TableBodyComponent: FC<Props> = ({ rows, ...props }) => {
  return (
    <TableBody>
      {!!rows.length && rows.map((row) => (
        <TrackRow key={row.id} row={row} {...props} />
      ))}
      {!rows.length && <EmptyRow />}
    </TableBody>
  );
};

export default memo(TableBodyComponent);
