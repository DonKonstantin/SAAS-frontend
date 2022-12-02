import React, { FC, memo } from "react";
import { TableRow, TableCell, Box, LinearProgress } from "@mui/material";

interface Props {
  colCount: number;
}

/**
 * Компонент лоадера для таблицы доступных отчетов
 * @param param0
 * @returns
 */
const TableLoader: FC<Props> = ({ colCount }) => {
  return (
    <TableRow>
      <TableCell colSpan={colCount} sx={{ p: 0 }}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default memo(TableLoader);
