import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import {SimpleValues} from "../../../../../../services/listDataLoader/listLoader/listValues/SimpleValues";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";
import convertSimpleValueToString from "../../../helpers/convertSimpleValueToString";

/**
 * Компонент вывода простого поля
 */
export class SimpleCell extends React.Component<ListFieldProperties<SimpleValues>> {
    render() {
        let direction = columnDirection(this.props.schema, this.props.configuration);

        direction = this.props.configuration.align ? this.props.configuration.align : direction;
        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {};
        return (
            <TableCell style={styles} align={direction}>
                {convertSimpleValueToString(this.props.schema, this.props.configuration, this.props.value)}
            </TableCell>
        )
    }
}