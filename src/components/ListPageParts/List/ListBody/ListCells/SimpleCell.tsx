import React, {FC} from "react";
import {ListFieldProperties} from "../../../../../services/listDataLoader/listLoader/types";
import {SimpleValues} from "../../../../../services/listDataLoader/listLoader/listValues/SimpleValues";
import columnDirection from "../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";
import convertSimpleValueToString from "../../helpers/convertSimpleValueToString";

// Компонент вывода простой ячейки
const SimpleCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {convertSimpleValueToString(schema, configuration, value)}
        </TableCell>
    )
}

// Экспортируем компонент
export default SimpleCell