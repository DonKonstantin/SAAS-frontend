import React, { FC, memo } from "react";
import { ListHeaderCellType } from "./types";
import { TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Ячейка заголовка таблицы без сортировки
 * @param props
 * @returns
 */
const ListHeaderCellWithoutOrder: FC<ListHeaderCellType> = (props) => {
  const {
    align,
    sx,
    title,
  } = props;

  const { t } = useTranslation();

  return (
    <TableCell sx={sx} className="list-table-cell" align={align}>
      {t(title)}
    </TableCell>
  );
};

export default memo(ListHeaderCellWithoutOrder);
