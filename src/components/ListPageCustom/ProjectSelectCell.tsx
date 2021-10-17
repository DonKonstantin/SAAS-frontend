import React, {FC, MouseEventHandler} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import convertSimpleValueToString from "../ListPageParts/List/helpers/convertSimpleValueToString";
import Link from "../Link";
import {useAuthorization} from "../../context/AuthorizationContext";
import {useRouter} from "next/router";

// Компонент вывода простой ячейки
const ProjectSelectCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    const router = useRouter()
    const {setProject} = useAuthorization()
    const handleDomainClick: MouseEventHandler<HTMLAnchorElement> = event => {
        event.preventDefault()
        event.stopPropagation()

        setProject(value.value)

        return router.push("/domain/project/media")
    }

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <Link href="#" onClick={handleDomainClick}>
                {convertSimpleValueToString(schema, configuration, value)}
            </Link>
        </TableCell>
    )
}

// Экспортируем компонент
export default ProjectSelectCell