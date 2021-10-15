import {FC} from "react";
import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {TableBody} from "@mui/material";
import ListRowContainer from "./ListRowContainer";

// Свойства компонента
type ListBodyProps = WithEntityListHoc<{
    checkedItems: any[]
    onChangeCheckedItems: { (callback: { (items: any[]): any[] }): void }
}>

// Компонент вывода тела таблицы
const ListBody: FC<ListBodyProps> = props => {
    const {
        data,
        checkedItems,
        onChangeCheckedItems,
    } = props

    if (!data) {
        return null
    }

    return (
        <TableBody>
            {data.currentData.rows.map(row => (
                <ListRowContainer
                    row={row}
                    key={row.primaryKeyValue}
                    checkedItems={checkedItems}
                    onChangeCheckedItems={onChangeCheckedItems}
                />
            ))}
        </TableBody>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListBody)