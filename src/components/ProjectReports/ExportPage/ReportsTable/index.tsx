import { Table } from "@mui/material";
import { ReportTableHeaderCellType } from "components/ProjectReports/types";
import React, { FC, memo, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export interface TableRowType {
  primaryKey: string;
  cells: any[];
}

interface Props {
  headers: ReportTableHeaderCellType[];
  rows: TableRowType[];
  onSelect(selected: string[]) : void
};

/**
 * 
 * @param param0 
 * @returns 
 */
const ReportsTable: FC<Props> = ({ headers, rows, onSelect }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const selectHandler = (items: string[]) => {
    setSelected(items);
    onSelect(items);
  };

  return (
    <Table>
      <TableHeader cells={headers} checkedItems={selected} rows={rows} onChangeCheckedItems={selectHandler}/>
      <TableBody rows={rows} checkedItems={selected} onChangeCheckedItems={selectHandler}/>
    </Table>
  );
};

export default memo(ReportsTable);
