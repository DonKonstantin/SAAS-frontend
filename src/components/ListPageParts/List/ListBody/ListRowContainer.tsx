import React, {FC, useRef} from "react";
import ListRow, {ListRowProps} from "./ListRow";
import EntityListHoc from "../../../../context/EntityListContext";
import {listSchemaConfiguration} from "../../../../settings/pages";
import {TableRow} from "@mui/material";

// Компонент вывода контекнера строки со всеми дополнительными компонентами
const ListRowContainer: FC<ListRowProps> = props => {
    const {data, row, onChangeCheckedItems} = props
    if (!data) {
        return null
    }

    const {schema} = data
    const configuration = useRef(listSchemaConfiguration()[schema])
    if (!configuration.current) {
        return null
    }

    const {
        listFields: {
            rowBelow: PrevRow,
            rowHigher: NextRow,
        },
    } = configuration.current

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
            {!!PrevRow && (
                <PrevRow item={row}/>
            )}
            <TableRow
                hover
                tabIndex={-1}
                onClick={onToggleItemCheckedState}
            >
                <ListRow {...props} />
            </TableRow>
            {!!NextRow && (
                <NextRow item={row}/>
            )}
        </>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListRowContainer)