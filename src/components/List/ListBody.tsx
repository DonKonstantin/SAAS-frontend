import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";

interface Props {
  checkedItems: any[];
  rows: any[];
  rowCellsComponent: FC<any>;
  onChangeCheckedItems: (items: any[]) => void;
};

/**
 * Компонент тела кастомного листинга
 * @param props
 * @returns
 */
const ListBody: FC<Props> = (props) => {
  const {
    rows,
    checkedItems,
    rowCellsComponent: RowCellsComponent,
    onChangeCheckedItems,
  } = props;

  return (
    <TableBody>
      {rows.map((row, index) => (
        <RowCellsComponent
          row={row}
          key={row.id + index}
          checkedItems={checkedItems}
          setChecked={onChangeCheckedItems}
        />
      ))}
    </TableBody>
  );
};

export default memo(ListBody);
