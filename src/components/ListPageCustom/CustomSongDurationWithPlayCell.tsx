import React, {FC} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";

const num = (val) => {
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
}

let timeFormat = (ms: number) => {
    let sec = ms / 1000;
    let hours = sec / 3600 % 24;
    let minutes = sec / 60 % 60;
    let seconds = sec % 60;

    if (hours >= 1) {
        return num(hours) + ":" + num(minutes) + ":" + num(seconds);
    }

    return num(minutes) + ":" + num(seconds);
}

// Компонент вывода простой ячейки
const CustomSongDurationWithPlayCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;

    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration;

    const duration = timeFormat(value.value * 1000);

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {duration}
        </TableCell>
    )
}

// Экспортируем компонент
export default CustomSongDurationWithPlayCell
