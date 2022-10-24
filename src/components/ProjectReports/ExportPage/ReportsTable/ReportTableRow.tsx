import React, { FC, memo } from "react";
import { TableRow, TableCell } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { TableRowType } from ".";

interface Props {
  row: TableRowType;
  checkedItems: string[];
  onChangeCheckedItems: (values: string[]) => void;
}

const ReportTableRow: FC<Props> = ({
  row,
  checkedItems,
  onChangeCheckedItems,
}) => {
  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState: SwitchBaseProps["onClick"] = (event) => {
    event.stopPropagation();

    onChangeCheckedItems(
      checkedItems.includes(row.primaryKey)
        ? checkedItems.filter((i) => i !== row.primaryKey)
        : [...checkedItems, row.primaryKey]
    );
  };

  return (
    <TableRow>
      <CheckBoxCell
        checked={checkedItems.includes(row.primaryKey)}
        onClick={onToggleItemCheckedState}
      />
      {row.cells.map((cell, index) => (
        <TableCell key={`${cell} ${index}`} >{cell}</TableCell>
      ))}
    </TableRow>
  );
};

export default memo(ReportTableRow);
