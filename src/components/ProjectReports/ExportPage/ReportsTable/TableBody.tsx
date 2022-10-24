import React, { FC, memo } from "react";
import { TableRowType } from ".";
import ReportTableRow from "./ReportTableRow";

interface Props {
  rows: TableRowType[];
  checkedItems: string[];
  onChangeCheckedItems: (values: string[]) => void;
};

const TableBody: FC<Props> = ({ rows, checkedItems, onChangeCheckedItems }) => {
  return (
    <>
      {rows.map(row => (
        <ReportTableRow key={row.primaryKey} row={row} checkedItems={checkedItems} onChangeCheckedItems={onChangeCheckedItems} />
      ))}
    </>
  );
};

export default memo(TableBody);
