import React, {FC} from "react";
import {Checkbox, TableCell, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";

// Свойства компонента
type CheckBoxCellProps = {
    isHeader?: boolean
    checked: boolean
    indeterminate?: boolean
    onChange: {(): void}
}

// Компонент вывода колонки с чекбоксом
const CheckBoxCell: FC<CheckBoxCellProps> = props => {
    const {t} = useTranslation()
    const {
        isHeader = false,
        checked,
        onChange,
        indeterminate,
    } = props

    const tooltip = `entity-list.components.list.${isHeader ? "checkbox-header" : "checkbox"}.${checked ? "checked" : "not-checked"}`
    return (
        <TableCell className="list-table-cell" padding="checkbox">
            <Tooltip title={t(tooltip) as string}>
                <Checkbox
                    color="primary"
                    checked={checked}
                    onChange={onChange}
                    indeterminate={indeterminate}
                />
            </Tooltip>
        </TableCell>
    )
}

// Экспортируем компонент
export default React.memo(CheckBoxCell, (prevProps, nextProps) => {
    return prevProps.checked === nextProps.checked
})

