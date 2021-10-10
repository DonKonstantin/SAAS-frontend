import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@material-ui/core/TableCell";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";

/**
 * Компонент вывода поля отношения
 */
export class RelationCell extends React.Component<ListFieldProperties<RelationValue>> {
    render() {
        let direction = columnDirection(this.props.schema, this.props.configuration)
        direction = this.props.configuration.align ? this.props.configuration.align : direction

        if (!this.props.value) {
            return (
                <TableCell padding={this.props.configuration.padding} align={direction}>
                    -
                </TableCell>
            )
        }

        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {}
        return (
            <TableCell padding={this.props.configuration.padding} style={styles} align={direction}>
                {!!this.props.value && this.props.value.relationCaption}
                {!this.props.value && (
                    <React.Fragment>-</React.Fragment>
                )}
            </TableCell>
        )
    }
}