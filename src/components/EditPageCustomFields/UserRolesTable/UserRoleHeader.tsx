import React, {FC} from "react";
import {Checkbox, MenuItem, TableCell, TableRow, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

// Параметры фильтрации ролей
export type UserRoleHeaderFilter = {
    name: string
    object: string
    level: string
}

// Свойства компонента
type UserRoleHeaderProps = {
    filter: UserRoleHeaderFilter
    onChangeFilter: { (callback: { (filter: UserRoleHeaderFilter): UserRoleHeaderFilter }): void }

    selectedItems: string[]
    allItems: string[]
    onChangeSelected: { (selectedItems: string[]): void }
}

// Компонент заголовочной части таблицы ролей
const UserRoleHeader: FC<UserRoleHeaderProps> = props => {
    const {
        filter,
        onChangeFilter,
        selectedItems,
        allItems,
        onChangeSelected,
    } = props

    const {t} = useTranslation()

    // Обработчик выбора элементов через чекбокс
    const handleSelectItems = () => {
        if (allItems.length === selectedItems.length) {
            return onChangeSelected([])
        }

        return onChangeSelected([...allItems])
    }

    return (
        <TableRow>
            <TableCell className="list-table-cell" padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={allItems.length === selectedItems.length && allItems.length > 0}
                    indeterminate={allItems.length !== selectedItems.length && selectedItems.length > 0}
                    onChange={handleSelectItems}
                />
            </TableCell>
            <TableCell className="list-table-cell" padding="none" sx={{pt: 1, pl: 1, pb: 1, width: "calc(55% - 48px)"}}>
                <TextField
                    label={t(`entity-edit.fields.user-roles-group.header.name`)}
                    variant="standard"
                    value={filter.name}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder={t(`entity-edit.fields.user-roles-group.header.name-placeholder`)}
                    onChange={event => {
                        event.preventDefault()
                        event.stopPropagation()

                        onChangeFilter(data => ({
                            ...data,
                            name: event.target.value
                        }))
                    }}
                />
            </TableCell>
            <TableCell className="list-table-cell" padding="none" sx={{pt: 1, pl: 1, pb: 1, width: "25%"}}>
                <TextField
                    label={t(`entity-edit.fields.user-roles-group.header.object`)}
                    variant="standard"
                    value={filter.object}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder={t(`entity-edit.fields.user-roles-group.header.object-placeholder`)}
                    onChange={event => {
                        event.preventDefault()
                        event.stopPropagation()

                        onChangeFilter(data => ({
                            ...data,
                            object: event.target.value
                        }))
                    }}
                />
            </TableCell>
            <TableCell className="list-table-cell" padding="none" sx={{p: 1, width: "20%"}}>
                <TextField
                    label={t(`entity-edit.fields.user-roles-group.header.level.caption`)}
                    variant="standard"
                    value={filter.level}
                    fullWidth
                    select
                    onChange={event => {
                        event.preventDefault()
                        event.stopPropagation()

                        onChangeFilter(data => ({
                            ...data,
                            level: event.target.value
                        }))
                    }}
                >
                    <MenuItem value="">{t(`entity-edit.fields.user-roles-group.header.level.no-value`)}</MenuItem>
                    <MenuItem value="realm">{t(`entity-edit.fields.user-roles-group.header.level.realm`)}</MenuItem>
                    <MenuItem value="domain">{t(`entity-edit.fields.user-roles-group.header.level.domain`)}</MenuItem>
                    <MenuItem value="project">{t(`entity-edit.fields.user-roles-group.header.level.project`)}</MenuItem>
                </TextField>
            </TableCell>
        </TableRow>
    )
}

// Экспортируем компонент
export default UserRoleHeader