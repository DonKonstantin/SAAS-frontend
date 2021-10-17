import React, {FC} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";

// Компонент вывода простой ячейки
const CustomActiveCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    const {t} = useTranslation()

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <span className={clsx("custom-active-cell", {"active": !!value.value})}>
                {t(`pages.users.list.fields.active-status.${!!value.value ? "active" : "inactive"}`)}
            </span>
        </TableCell>
    )
}

// Экспортируем компонент
export default CustomActiveCell