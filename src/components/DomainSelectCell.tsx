import React, {FC} from "react";
import {SimpleValues} from "../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../services/listDataLoader/listLoader/types";
import columnDirection from "./ListPageParts/List/helpers/columnDirection";
import convertSimpleValueToString from "./ListPageParts/List/helpers/convertSimpleValueToString";
import Link from "./Link";

// Компонент вывода простой ячейки
const DomainSelectCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <Link href="#">{convertSimpleValueToString(schema, configuration, value)}</Link>
        </TableCell>
    )
}

// Экспортируем компонент
export default DomainSelectCell