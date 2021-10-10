import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";
import TableCell from "@material-ui/core/TableCell";

/**
 * Компонент вывода локализованного поля
 */
export class LocalizedFieldCell extends React.Component<ListFieldProperties<RelationValue[]>> {
    render() {
        const secondaryLang = this.props.languages.find(lang => lang.id === this.props.secondaryLangId)
        if (!secondaryLang) {
            return null
        }

        let direction: 'inherit' | 'left' | 'center' | 'right' | 'justify' = "left"
        if (secondaryLang.is_right_text_align) {
            direction = "right"
        }

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

                if (direction === "right") {
                    drawMessage = `(${primary}) ${secondary}`
                } else {
                    drawMessage = `${secondary} (${primary})`
                }
                break;
        }

        direction = this.props.configuration.align ? this.props.configuration.align : direction
        const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {}
        return (
            <TableCell padding={this.props.configuration.padding} style={styles} align={direction}>
                {drawMessage}
            </TableCell>
        )
    }
}