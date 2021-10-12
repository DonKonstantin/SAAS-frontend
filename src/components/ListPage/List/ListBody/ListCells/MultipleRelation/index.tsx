import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@mui/material/TableCell";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";

/**
 * Компонент вывода поля отношения (множественного)
 */
export class MultipleRelationCell extends React.Component<ListFieldProperties<RelationValue[]>> {
    render() {
        let direction = columnDirection(this.props.schema, this.props.configuration)
        direction = this.props.configuration.align ? this.props.configuration.align : direction

        if (!this.props.value) {
            return (
                <TableCell align={direction}>
                    -
                </TableCell>
            )
        }

        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {}
        return (
            <TableCell style={styles} align={direction}>
                {this.props.value.map((val, i) => (
                    <React.Fragment key={`cell-val-${i}`}>
                        {i !== 0 && (<br/>)}
                        {val.relationCaption}
                    </React.Fragment>
                ))}
                {this.props.value.length === 0 && (
                    <React.Fragment>-</React.Fragment>
                )}
            </TableCell>
        )
    }
}