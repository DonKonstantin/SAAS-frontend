import React, { FC, memo } from "react";
import { ListHeaderCellType } from "./types";
import { useTranslation } from "react-i18next";
import { TableCell, Tooltip, Box } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from '@mui/utils';

/**
 * Ячейка заголовка таблицы с сортировкой по колонке
 * @param props
 * @returns
 */
const ListHeaderCellWithOrder: FC<ListHeaderCellType> = (props) => {
  const {
    align,
    sx,
    title,
    sorted,
    name,
    setSort,
  } = props;

  const { t } = useTranslation();

  // Текст сортировки
  const sortText = `entity-list.components.list.header.order-tooltip.${sorted || "default"}`;

  const handleChangeOrder = () => {
    if (!sorted) {
      setSort({
        column: name,
        direction: 'asc',
      });
    }

    setSort({
      column: name,
      direction: sorted === 'asc' ? 'desc' : 'asc',
    });
  };


  return (
    <TableCell className="list-table-cell" sx={sx} align={align}>
      <Tooltip title={t(sortText) as string}>
        <TableSortLabel
          active={!!sorted}
          direction={sorted || 'asc'}
          onClick={handleChangeOrder}
        >
          {t(title)}

          {!!sorted && (
            <Box component="span" sx={visuallyHidden}>
              {t(`entity-list.components.list.header.order.${sorted}`)}
            </Box>
          )}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default memo(ListHeaderCellWithOrder);
