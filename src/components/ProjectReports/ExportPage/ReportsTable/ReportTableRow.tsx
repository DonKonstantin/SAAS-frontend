import React, { FC, memo } from "react";
import { TableRow, TableCell } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { TableRowType } from "components/ProjectReports/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface Props {
  row: TableRowType;
  checkedItems: string[];
  multiselected: boolean;
  onChangeCheckedItems: (values: string[]) => void;
}

/**
 * Компонент строки таблицы доступных отчетов
 * @param props
 * @returns
 */
const ReportTableRow: FC<Props> = (props) => {
  const { row, checkedItems, multiselected, onChangeCheckedItems } = props;

  const { t } = useTranslation();

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState: SwitchBaseProps["onClick"] = (event) => {
    event.stopPropagation();

    onChangeCheckedItems(
      checkedItems.includes(row.primaryKey)
        ? checkedItems.filter((i) => i !== row.primaryKey)
        : [...checkedItems, row.primaryKey]
    );
  };

  const onRowClickHandler = () => {
    if (multiselected) {
      return;
    }

    if (checkedItems.some((item) => item === row.primaryKey)) {
      onChangeCheckedItems([]);

      return;
    }

    onChangeCheckedItems([row.primaryKey]);
  };

  return (
    <TableRow
      onClick={onRowClickHandler}
      selected={!multiselected && checkedItems[0] === row.primaryKey}
    >
      {multiselected && (
        <CheckBoxCell
          checked={checkedItems.includes(row.primaryKey)}
          onClick={onToggleItemCheckedState}
        />
      )}
      {row.cells.map((cell, index) => (
        <TableCell key={`${cell} ${index}`}>
          {typeof cell === "boolean" ? (
            <span className={clsx("custom-active-cell", { active: cell })}>
              {t(
                `pages.users.list.fields.active-status.${
                  cell ? "active" : "inactive"
                }`
              )}
            </span>
          ) : (
            t(cell)
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default memo(ReportTableRow);
