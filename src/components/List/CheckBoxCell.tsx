import React, { FC } from "react";
import { Checkbox, TableCell, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";

interface CheckBoxCellProps {
  isHeader?: boolean;
  checked: boolean;
  indeterminate?: boolean;
  tooltipOnCheck?: string;
  tooltipOnUncheck?: string;
  tooltipOnDisabled?: string;
  disabled?: boolean;
  onChange?: SwitchBaseProps["onChange"];
  onClick?: SwitchBaseProps["onClick"];
}

/**
 * Компонент вывода колонки с чекбоксом
 * @param props
 * @returns
 */
const CheckBoxCell: FC<CheckBoxCellProps> = (props) => {
  const { t } = useTranslation();

  const {
    isHeader = false,
    checked,
    tooltipOnCheck,
    tooltipOnUncheck,
    tooltipOnDisabled,
    disabled = false,
    onChange,
    onClick,
    indeterminate,
  } = props;

  const tooltip = `entity-list.components.list.${
    isHeader ? "checkbox-header" : "checkbox"
  }.${checked ? "checked" : "not-checked"}`;

  const customTooltip = checked ? tooltipOnUncheck : tooltipOnCheck;

  const disabledTooltip: string | undefined = disabled ? tooltipOnDisabled : undefined;

  return (
    <TableCell className="list-table-cell" padding="checkbox">
      <Tooltip title={t(disabledTooltip ?? customTooltip ?? tooltip) as string}>
        <div>
          <Checkbox
            color="primary"
            checked={checked}
            onChange={onChange}
            onClick={onClick}
            indeterminate={indeterminate}
            data-testid="rowCheckbox"
            disabled={disabled}
          />
        </div>
      </Tooltip>
    </TableCell>
  );
};

export default CheckBoxCell;
