import { TableCell, TableHead } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { ReportTableHeaderCellType } from "components/ProjectReports/types";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { TableRowType } from ".";

interface Props {
  cells: ReportTableHeaderCellType[];
  rows: TableRowType[];
  checkedItems: string[];
  onChangeCheckedItems: (values: string[]) => void;
}

const TableHeader: FC<Props> = ({ cells, rows, checkedItems, onChangeCheckedItems }) => {
  const { t } = useTranslation();

  const {  } = useProjectReportPageContext();

  const isAllItemsSelected = rows.length === checkedItems.length;

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState = () => {
    onChangeCheckedItems(rows.length === checkedItems.length
        ? []
        : rows.map(row => row.primaryKey)
    )
  }

  return (
    <TableHead>
      <CheckBoxCell
        isHeader={true}
        indeterminate={!isAllItemsSelected && checkedItems.length > 0}
        checked={isAllItemsSelected && rows.length > 0}
        onChange={onToggleItemCheckedState}
      />
      {cells.map(cell => (
        <TableCell key={cell.title}>
          {t(cell.title)}
        </TableCell>
      ))}
    </TableHead>
  );
};

export default memo(TableHeader);
