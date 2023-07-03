import React, { FC } from "react";
import { Checkbox, TableCell, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";

// Свойства компонента
type CheckBoxCellProps = {
  isHeader?: boolean;
  checked: boolean;
  indeterminate?: boolean;
  tooltipOnCheck?: string;
  tooltipOnUncheck?: string;
  onChange?: SwitchBaseProps["onChange"];
  onClick?: SwitchBaseProps["onClick"];
};

// Компонент вывода колонки с чекбоксом
const CheckBoxCell: FC<CheckBoxCellProps> = (props) => {
  const { t } = useTranslation();
  const {
    isHeader = false,
    checked,
    tooltipOnCheck,
    tooltipOnUncheck,
    onChange,
    onClick,
    indeterminate,
  } = props;

  const tooltip = `entity-list.components.list.${
    isHeader ? "checkbox-header" : "checkbox"
  }.${checked ? "checked" : "not-checked"}`;

  const customTooltip = checked ? tooltipOnUncheck : tooltipOnCheck;

  return (
    <TableCell className="list-table-cell" padding="checkbox">
      <Tooltip title={t(customTooltip ?? tooltip) as string}>
        <Checkbox
          color="primary"
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          indeterminate={indeterminate}
          data-testid="rowCheckbox"
        />
      </Tooltip>
    </TableCell>
  );
};

// Экспортируем компонент
export default CheckBoxCell;
