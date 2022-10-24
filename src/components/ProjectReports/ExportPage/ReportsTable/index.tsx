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
};

/**
 * 
 * @param param0 
 * @returns 
 */
const ReportsTable: FC<Props> = ({ headers, rows }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Table>
      <TableHeader cells={headers} checkedItems={selected} rows={rows} onChangeCheckedItems={setSelected}/>
      <TableBody rows={rows} checkedItems={selected} onChangeCheckedItems={setSelected}/>
    </Table>
  );
};

export default memo(ReportsTable);
