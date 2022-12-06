import { Table } from "@mui/material";
import { TableLoader } from "components/TableLoader";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import { xor } from "lodash";
import React, { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

/**
 * Компонент таблицы доступных отчетов
 * @param param0
 * @returns
 */
const ReportsTable: FC<{ multiselected: boolean }> = ({ multiselected }) => {
  const { t } = useTranslation();

  const {
    tableRows,
    tableHeaders,
    selected,
    sortDirection,
    sortedColumnIndex,
    loadReportsList,
    errors,
    setSortDirection,
    setSortedColumnIndex,
    setSelected,
    setRows,
    cleareError,
  } = useProjectReportPageContext(
    distinctUntilChanged(
      (prev, curr) =>
        !xor(prev.tableRows, curr.tableRows).length &&
        !xor(prev.tableHeaders, curr.tableHeaders).length &&
        !xor(prev.selected, curr.selected).length &&
        prev.sortDirection === curr.sortDirection &&
        prev.sortedColumnIndex === curr.sortedColumnIndex &&
        prev.loadReportsList === curr.loadReportsList &&
        prev.errors === curr.errors
    )
  );

  useEffect(() => {
    if (!errors) {
      return
    }

    notificationsDispatcher().dispatch({
      type: 'error',
      message: t(errors),
    });

    cleareError();
  }, [errors]);

  return (
    <Table>
      <TableHeader
        cells={tableHeaders}
        checkedItems={selected}
        rows={tableRows}
        multiselected={multiselected}
        sortDirection={sortDirection}
        sortedColumnIndex={sortedColumnIndex}
        setSortDirection={setSortDirection}
        setSortedColumnIndex={setSortedColumnIndex}
        setRows={setRows}
        onChangeCheckedItems={setSelected}
      />
      {loadReportsList && <TableLoader colCount={tableHeaders.length + 1} />}
      {!loadReportsList && (
        <TableBody
          rows={tableRows}
          checkedItems={selected}
          multiselected={multiselected}
          onChangeCheckedItems={setSelected}
        />
      )}
    </Table>
  );
};

export default memo(ReportsTable);
