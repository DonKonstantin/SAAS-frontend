import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";
import TableCell from "@mui/material/TableCell";

/**
 * Компонент вывода локализованного поля
 */
export class LocalizedFieldCell extends React.Component<ListFieldProperties<RelationValue[]>> {
    render() {
        let direction: 'inherit' | 'left' | 'center' | 'right' | 'justify' = "left"

        const secondaryMessage = this.props.value.find(val => val.relationFieldValues.lang_id === this.props.secondaryLangId)
        const primaryMessage = this.props.value.find(val => val.relationFieldValues.lang_id === this.props.mainLangId)

        let drawMessage = ""
        switch (true) {
            case !secondaryMessage && !primaryMessage:
                drawMessage = "-"
                break;
            case !primaryMessage:
                drawMessage = `${secondaryMessage?.relationFieldValues.message}`
                break;
            case !secondaryMessage:
                drawMessage = `${primaryMessage?.relationFieldValues.message}`
                break;
            case !!secondaryMessage && !!primaryMessage:
                const primary = `${primaryMessage?.relationFieldValues.message}`
                const secondary = `${secondaryMessage?.relationFieldValues.message}`

                drawMessage = `${secondary} (${primary})`
                break;
        }

        direction = this.props.configuration.align ? this.props.configuration.align : direction
        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {}
        return (
            <TableCell style={styles} align={direction}>
                {drawMessage}
            </TableCell>
        )
    }
}