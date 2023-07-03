import React, {FC} from "react";
import {ListFieldProperties} from "../../../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../../../services/listDataLoader/listLoader/listValues/RelationValue";
import columnDirection from "../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";

// Компонент вывода поля отношения (множественного)
const MultipleRelation: FC<ListFieldProperties<RelationValue[]>> = props => {
    const {schema, configuration, value = [{relationCaption: "-"}]} = props;
    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            {value.map((val, i) => (
                <React.Fragment key={`cell-val-${i}`}>
                    {i !== 0 && (<br/>)}
                    {val.relationCaption}
                </React.Fragment>
            ))}
        </TableCell>
    )
}

// Экспортируем компонент
export default MultipleRelation