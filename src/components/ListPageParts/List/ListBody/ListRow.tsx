import {ListFieldRow} from "../../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../../settings/schema";
import {FC, useRef} from "react";
import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {listSchemaConfiguration} from "../../../../settings/pages";
import CheckBoxCell from "../CheckBoxCell";
import ListCells from "./ListCells";

// Свойства компонента
export type ListRowProps<T extends keyof Schemas = keyof Schemas> = WithEntityListHoc<{
    row: ListFieldRow<T>

    checkedItems: any[]
    onChangeCheckedItems: {(callback: {(items: any[]): any[]}): void}
}>

// Компонент вывода строки
const ListRow: FC<ListRowProps> = props => {
    const {
        data,
        row,
        checkedItems,
        onChangeCheckedItems,
    } = props

    if (!data) {
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
    const configuration = useRef(listSchemaConfiguration()[schema])
    if (!configuration.current) {
        return null
    }

    const {
        disableMultiChoose = false,
        listFields,
    } = configuration.current
    const {actions: ActionsComponent} = listFields

    // Переключение состояния чекбокса выбора элемента
    const onToggleItemCheckedState = () => {
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
                    onChange={onToggleItemCheckedState}
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
                    />
                )
            })}
            {!!ActionsComponent && (
                <ActionsComponent item={row} />
            )}
        </>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListRow)