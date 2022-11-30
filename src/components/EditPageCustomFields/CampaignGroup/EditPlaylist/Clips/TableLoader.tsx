import React, { FC, memo } from "react";
import { TableRow, TableCell, LinearProgress } from "@mui/material";

/**
 * Компонент прогресса загрузки выгруженных файлов
 * @returns 
 */
const TableLoader: FC = () => {
  return (
    <TableRow sx={{ width: "100%" }}>
      <TableCell colSpan={4} sx={{ p: 0 }}>
        <LinearProgress />
      </TableCell>
    </TableRow>
  );
};

export default memo(TableLoader);
