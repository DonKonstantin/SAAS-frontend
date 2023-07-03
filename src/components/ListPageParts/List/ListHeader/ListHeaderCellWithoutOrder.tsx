import React, {FC} from "react";
import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {ListCellsProps} from "../ListBody/ListCells";
import columnDirection from "../helpers/columnDirection";
import {TableCell} from "@mui/material";
import {useTranslation} from "react-i18next";

// Свойства компонента
type ListHeaderCellProps = WithEntityListHoc<Omit<ListCellsProps<any>, "value" | "rowValues">>

// Компонент вывода ячейки заголовочной части таблицы без сортировки
const ListHeaderCellWithoutOrder: FC<ListHeaderCellProps> = props => {
    const {
        schema,
        configuration
    } = props

    const {t} = useTranslation()
    const {
        align = columnDirection(schema, configuration),
        width,
        padding,
        title,
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {t(title)}
        </TableCell>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListHeaderCellWithoutOrder)