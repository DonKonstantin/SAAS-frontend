import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import ListRow from "./ListRow";

interface Props {
  rows: ProjectPlayListFile[];
  selected: any[];
  setSelected: (values: any[]) => void;
};

/**
 * Компонент тела таблицы листинга файлов для страницы редактирования плэйлиста
 * @param param0 
 * @returns 
 */
const ListBody: FC<Props> = ({ rows, selected, setSelected }) => {
  return (
    <TableBody>
      {rows.map(row => (
        <ListRow
          key={row.id}
          row={row}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </TableBody>
  );
};

export default memo(ListBody);
