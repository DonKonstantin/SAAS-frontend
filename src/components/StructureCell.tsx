import React, {FC} from "react";
import {SimpleValues} from "../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../services/listDataLoader/listLoader/types";
import columnDirection from "./ListPageParts/List/helpers/columnDirection";
import {useEntityList} from "../context/EntityListContext";
import {DomainData, ProjectData} from "../services/loaders/domainsAndProjects/LoaderQuery";

// Компонент вывода простой ячейки
const StructureCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    const {data} = useEntityList()
    if (!data) {
        return null
    }

    const {currentData: {additionData}} = data
    const domains = additionData.domains as DomainData[]
    const projects = additionData.projects as ProjectData[]

    const domain = domains.find(d => d.id === `${value.value}`)
    const project = projects.find(d => d.id === `${value.value}`)

    let objectName = "-"
    if (!!domain) {
        objectName = domain.name
    }

    if (!!project) {
        objectName = project.name
    }

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {objectName}
        </TableCell>
    )
}

// Экспортируем компонент
export default StructureCell