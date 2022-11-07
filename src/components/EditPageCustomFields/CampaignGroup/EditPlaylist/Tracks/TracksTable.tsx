import { Table, TableContainer } from "@mui/material";
import React, { FC, memo } from "react";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import TableBodyComponent from "./TableBodyComponent";
import TableHeader from "./TableHeader";

interface Props {
  isEditable: boolean;
  rows: ProjectPlayListFile[] | CampaignPlayListFileType[];
  limit: number;
  offset: number;
};

/**
 * Компонент таблицы треков плэйлиста
 * @param props 
 * @returns 
 */
const TracksTable: FC<Props> = props => {
  const {
    isEditable,
    rows,
    limit,
    offset,
  } = props;

  const preparedRows = rows
  .sort((a, b) => {
    const aValue = Number(a.sort);
    const bValue = Number(b.sort);

    return aValue - bValue;
  })
  .slice(offset, offset + limit);
  
  return (
    <TableContainer>
      <Table>
        <TableHeader/>
        <TableBodyComponent
          rows={preparedRows}
          isEditable={isEditable}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(TracksTable);
