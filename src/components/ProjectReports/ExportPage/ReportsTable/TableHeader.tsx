import { TableCell, TableHead, TableSortLabel } from "@mui/material";
import { SortDirection } from "components/EditPageCustomFields/EditProjectPlaylist/FileList/List/ListHeader";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import {
  ReportTableHeaderCellType,
  TableRowType,
} from "components/ProjectReports/types";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  cells: ReportTableHeaderCellType[];
  rows: TableRowType[];
  checkedItems: string[];
  multiselected: boolean;
  sortDirection: SortDirection;
  sortedColumnIndex: number | undefined;
  setSortDirection: (direction: SortDirection) => void;
  setSortedColumnIndex: (index: number) => void;
  onChangeCheckedItems: (values: string[]) => void;
  setRows: (rows: TableRowType[]) => void;
}

/**
 * Компонент заголовка таблицы доступных отчетов
 * @param props
 * @returns
 */
const TableHeader: FC<Props> = (props) => {
  const {
    cells,
    rows,
    checkedItems,
    multiselected,
    sortDirection,
    sortedColumnIndex,
    setSortDirection,
    setSortedColumnIndex,
    onChangeCheckedItems,
    setRows,
  } = props;

  const { t } = useTranslation();

  const isAllItemsSelected = rows.length === checkedItems.length;

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState = () => {
    onChangeCheckedItems(
      rows.length === checkedItems.length
        ? []
        : rows.map((row) => row.primaryKey)
    );
  };

  const onSortClickHandler = (index: number) => {
    setSortedColumnIndex(index);

    const direction =
      sortedColumnIndex === index
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSortDirection(direction);

    const sortedRows = rows.sort((a, b) => {
      const aValue: string | boolean | number = a.cells[index];
      const bValue: string | boolean | number = b.cells[index];

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return sortBoolean(aValue, bValue as boolean);
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue as string);
      }

      return Number(aValue) - Number(bValue);
    });

    setRows(direction === "asc" ? sortedRows : sortedRows.reverse());
  };

  const sortBoolean = (a: boolean, b: boolean) => {
    if (a === b) {
      return 0;
    }

    if (!!a) {
      return 1;
    }

    return -1;
  };

  return (
    <TableHead sx={{ borderTop: "1px solid #E0E0E0" }}>
      {multiselected && (
        <CheckBoxCell
          isHeader={true}
          indeterminate={!isAllItemsSelected && checkedItems.length > 0}
          checked={isAllItemsSelected && rows.length > 0}
          onChange={onToggleItemCheckedState}
        />
      )}
      {cells.map((cell, index) => (
        <TableCell key={cell.title} width={cell.width}>
          <TableSortLabel
            active={sortedColumnIndex === index && index !== undefined}
            direction={sortDirection}
            onClick={() => onSortClickHandler(index)}
          >
            {t(cell.title)}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableHead>
  );
};

export default memo(TableHeader);
