import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@material-ui/core/TableCell";
import {EnumValue} from "../../../../../../services/listDataLoader/listLoader/listValues/EnumValue";

/**
 * Компонент вывода простого поля
 */
export class EnumCell extends React.Component<ListFieldProperties<EnumValue>> {
    render() {
        let direction = columnDirection(this.props.schema, this.props.configuration)

        direction = this.props.configuration.align ? this.props.configuration.align : direction
        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {}

        const currentValue = this.props.value.value
            ? (this.props.value.variants[this.props.value.value] ? this.props.value.variants[this.props.value.value] : `-`)
            : `-`

        return (
            <TableCell padding={this.props.configuration.padding} style={styles} align={direction}>
                {currentValue}
            </TableCell>
        )
    }
}