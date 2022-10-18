import React, { FC, memo } from "react";
import { Table, TableContainer } from "@mui/material";
import ListHeader, { SortDirection } from "./ListHeader";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import ListBody from "./ListBody";

interface Props {
  rows: ProjectPlayListFile[];
  selected: any[];
  direction: SortDirection;
  setSelected: (values: any[]) => void;
  setDirection: (values: SortDirection) => void;
}

/**
 * Компонент листинга файлов для страницы редактирования плэйлиста
 * @param props 
 * @returns 
 */
const List: FC<Props> = (props) => {
  return (
    <TableContainer>
      <Table>
        <ListHeader {...props}/>
        <ListBody {...props} />
      </Table>
    </TableContainer>
  );
};

export default memo(List);
