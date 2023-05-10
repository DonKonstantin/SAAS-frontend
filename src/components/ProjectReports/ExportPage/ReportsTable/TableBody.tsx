import { TableRowType } from "components/ProjectReports/types";
import React, { FC } from "react";
import ReportTableRow from "./ReportTableRow";

interface Props {
  rows: TableRowType[];
  checkedItems: string[];
  multiselected: boolean;
  onChangeCheckedItems: (values: string[]) => void;
}

/**
 * Компонент тела таблицы доступных отчетов
 * @param props
 * @returns
 */
const TableBody: FC<Props> = (props) => {
  const { rows, checkedItems, multiselected, onChangeCheckedItems } = props;

  return (
    <>
      {rows.map((row) => (
        <ReportTableRow
          key={row.primaryKey}
          row={row}
          checkedItems={checkedItems}
          multiselected={multiselected}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      ))}
    </>
  );
};

export default TableBody;
