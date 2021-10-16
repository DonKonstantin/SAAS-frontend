import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {FC, useEffect, useState} from "react";
import {listSchemaConfiguration} from "../../../../settings/pages";
import CheckBoxCell from "../CheckBoxCell";
import ListHeaderCell from "./ListHeaderCell";
import {TableCell, TableHead, TableRow} from "@mui/material";
import {ListPageConfiguration} from "../../../../settings/pages/system/list";

// Свойства компонента
type ListHeaderProps = WithEntityListHoc<{
    checkedItems: any[]
    onChangeCheckedItems: { (callback: { (items: any[]): any[] }): void }
}>

// Компонент вывода заголовочной части таблицы листинга
const ListHeader: FC<ListHeaderProps> = props => {
    const {
        data,
        checkedItems,
        onChangeCheckedItems,
    } = props

    const [configuration, setConfig] = useState<ListPageConfiguration>()
    useEffect(() => {
        if (!data) {
            return
        }

        const {schema} = data
        setConfig(listSchemaConfiguration()[schema])
    }, [data?.schema])

    if (!data || !configuration) {
        return null
    }

    const {
        schema,
        currentData: {
            parameters: {
                listConfiguration: {
                    fields,
                }
            },
            rows,
        }
    } = data

    const {
        disableMultiChoose = false,
        listFields,
    } = configuration
    const {actions: ActionsComponent} = listFields

    const allPrimaryKeys = rows.map(r => r.primaryKeyValue)
    const isAllItemsSelected = allPrimaryKeys.length === checkedItems.length

    // Переключение состояния чекбокса выбора элемента
    const onToggleItemCheckedState = () => {
        onChangeCheckedItems(items => allPrimaryKeys.length === items.length
            ? []
            : allPrimaryKeys
        )
    }

    return (
        <TableHead>
            <TableRow>
                {!disableMultiChoose && (
                    <CheckBoxCell
                        isHeader={true}
                        indeterminate={!isAllItemsSelected && checkedItems.length > 0}
                        checked={isAllItemsSelected}
                        onChange={onToggleItemCheckedState}
                    />
                )}
                {Object.values(fields).map(field => {
                    return (
                        <ListHeaderCell
                            key={`row-component-cell-${field.field}`}
                            schema={schema}
                            fieldType={field.fieldType.type}
                            configuration={field}
                        />
                    )
                })}
                {!!ActionsComponent && (
                    <TableCell className="list-table-cell"/>
                )}
            </TableRow>
        </TableHead>
    )
}

export default EntityListHoc()(ListHeader)