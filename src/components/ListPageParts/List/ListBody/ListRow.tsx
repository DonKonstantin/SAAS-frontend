import {ListFieldRow} from "../../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../../settings/schema";
import {FC, useEffect, useState} from "react";
import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {listSchemaConfiguration} from "../../../../settings/pages";
import CheckBoxCell from "../CheckBoxCell";
import ListCells from "./ListCells";
import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import {ListPageConfiguration} from "../../../../settings/pages/system/list";
import SimpleCell from "./ListCells/SimpleCell";
import {TableCell} from "@mui/material";

// Свойства компонента
export type ListRowProps<T extends keyof Schemas = keyof Schemas> = WithEntityListHoc<{
    row: ListFieldRow<T>

    checkedItems: any[]
    onChangeCheckedItems: { (callback: { (items: any[]): any[] }): void }
}>

// Компонент вывода строки
const ListRow: FC<ListRowProps> = props => {
    const {
        data,
        row,
        checkedItems,
        onChangeCheckedItems,
    } = props

    const [config, setConfig] = useState<ListPageConfiguration>()
    useEffect(() => {
        if (!data) {
            return
        }

        const {schema} = data
        setConfig(listSchemaConfiguration()[schema])
    }, [data?.schema])

    if (!data || !config) {
        return null
    }

    const {
        schema,
        currentData: {
            parameters: {
                listConfiguration: {
                    fields,
                }
            }
        }
    } = data

    const {
        disableMultiChoose = false,
        listFields,
    } = config
    const {actions: ActionsComponent} = listFields

    // Переключение состояния чекбокса выбора элемента
    const onToggleItemCheckedState: SwitchBaseProps['onClick'] = event => {
        event.stopPropagation()

        onChangeCheckedItems(items => {
            if (items.includes(row.primaryKeyValue)) {
                return items.filter(i => i !== row.primaryKeyValue)
            }

            return [...items, row.primaryKeyValue]
        })
    }

    return (
        <>
            {!disableMultiChoose && (
                <CheckBoxCell
                    checked={checkedItems.includes(row.primaryKeyValue)}
                    onClick={onToggleItemCheckedState}
                />
            )}
            {Object.values(fields).map(field => {
                const value = row.columnValues[field.field]

                const {customComponent: CellComponent} = listFields.fields[field.field].fieldType
                if (CellComponent) {
                    return (
                        <CellComponent
                            key={`row-component-cell-${field.field}`}
                            schema={schema}
                            value={value}
                            configuration={field}
                            rowValues={row.columnValues}
                            primaryKeyValue={row.primaryKeyValue}
                        />
                    )
                }

                return (
                    <ListCells
                        key={`row-component-cell-${field.field}`}
                        schema={schema}
                        value={value}
                        fieldType={field.fieldType.type}
                        configuration={field}
                        rowValues={row.columnValues}
                        primaryKeyValue={row.primaryKeyValue}
                    />
                )
            })}
            {!!ActionsComponent && (
                <ActionsComponent item={row}/>
            )}
        </>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListRow)