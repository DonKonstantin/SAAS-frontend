import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import TrackRow from "./TrackRow";
import { CampaignPlayListFile } from "services/campaignListService/types";

interface Props {
  isEditable: boolean;
  rows: ProjectPlayListFile[] | CampaignPlayListFile[];
};

const TableBodyComponent: FC<Props> = ({ rows, isEditable }) => {
  return (
    <TableBody>
      {rows.map(row => (
        <TrackRow 
          key={row.id}
          row={row}
          isEditable={isEditable}
        />
      ))}
    </TableBody>
  );
};

export default memo(TableBodyComponent);
