import React, {FC} from "react";
import {ListFieldProperties} from "../../../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../../../services/listDataLoader/listLoader/listValues/RelationValue";
import columnDirection from "../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";

// Компонент вывода поля отношения
const RelationCell: FC<ListFieldProperties<RelationValue>> = props => {
    const {schema, configuration, value = {relationCaption: "-"}} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {value.relationCaption}
        </TableCell>
    )
}

// Экспортируем компонент
export default RelationCell