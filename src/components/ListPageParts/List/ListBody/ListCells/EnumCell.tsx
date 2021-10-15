import React, {FC} from "react";
import {ListFieldProperties} from "../../../../../services/listDataLoader/listLoader/types";
import {EnumValue} from "../../../../../services/listDataLoader/listLoader/listValues/EnumValue";
import columnDirection from "../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";

// Компонент вывода простого поля
const EnumCell: FC<ListFieldProperties<EnumValue>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    const renderValue = value && value.value && value.variants[value.value] ? value.variants[value.value] : "-"
    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {renderValue}
        </TableCell>
    )
}

// Экспортируем компонент
export default EnumCell