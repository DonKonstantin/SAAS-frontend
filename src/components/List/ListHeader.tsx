import React, { FC, memo } from "react";
import { TableHead, TableRow } from "@mui/material";
import CheckBoxCell from "./CheckBoxCell";
import { ListHeaderCellType } from "./types";
import ListHeaderCell from "./ListHeaderCell";

interface Props {
  checkedItems: any[];
  rows: any[];
  headerCells: ListHeaderCellType[];
  onChangeCheckedItems: (items: any[]) => void;
};

/**
 * Компонент заголовочной части кастомного листинга
 * @param props
 * @returns
 */
const ListHeader: FC<Props> = (props) => {
  const {
    checkedItems,
    rows,
    headerCells,
    onChangeCheckedItems,
  } = props;

  const rowsCount: number = rows.length;

  const isAllItemsSelected: boolean = rowsCount === checkedItems.length;

  const isIndeterminate: boolean = !isAllItemsSelected && checkedItems.length > 0;

  const isChecked: boolean = isAllItemsSelected && rowsCount > 0;

  const onToggleItemCheckedState = () => {
    if (isChecked) {
      onChangeCheckedItems([]);

      return
    }

    onChangeCheckedItems(rows);
  };

  return (
    <TableHead>
      <TableRow>
        <CheckBoxCell
          isHeader={true}
          indeterminate={isIndeterminate}
          checked={isChecked}
          onChange={onToggleItemCheckedState}
        />

        {headerCells.map(field => {
          return (
            <ListHeaderCell
              key={`row-component-cell-${field.name}`}
              {...field}
            />
          )
        })}
      </TableRow>
    </TableHead>
  );
};

export default memo(ListHeader);
