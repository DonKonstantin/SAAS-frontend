import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@material-ui/core/TableCell";
import Link from "../../../../../Link";
import {Authorization} from "../../../../../../reduxStore/stores/Authorization";
import {ReduxStore} from "../../../../../../reduxStore/ReduxStore";
import {connect} from "react-redux";

/**
 * Компонент вывода ячейки отношения со ссылкой на редактирование
 */
export type RelationLinkGenerator = {(primaryKey: string): {href: string, as: string}}
export type TRelationCellWithLinkComponent = {(linkGenerator: RelationLinkGenerator, permission: string, captionGenerator?: {(option: any): string}): React.ComponentType<ListFieldProperties<RelationValue>>}
export const RelationCellWithLinkComponent: TRelationCellWithLinkComponent = (
    linkGenerator: RelationLinkGenerator,
    permission: string,
    captionGenerator: {(option: any): string} = option => {
        return option ? option.relationCaption : "-"
    }
): React.ComponentType<ListFieldProperties<RelationValue>> => {
    interface RelationCellWithLinkProps extends ListFieldProperties<RelationValue> {
        authorization: Authorization
    }

    class RelationCellWithLink extends React.Component<RelationCellWithLinkProps> {
        /**
         * Мапит текущий Redux state в свойства компонента
         *
         * @param store
         * @param globalProperties
         */
        static mapStoreToProperties(
            store: ReduxStore,
            globalProperties: Partial<RelationCellWithLinkProps>
        ): Partial<RelationCellWithLinkProps> {
            return {
                ...globalProperties,
                authorization: store.Authorization,
            }
        }

        /**
         * Рендеринг компонента
         */
        render() {
            let direction = columnDirection(this.props.schema, this.props.configuration);
            direction = this.props.configuration.align ? this.props.configuration.align : direction;

            if (!this.props.value) {
                return (
                    <TableCell padding={this.props.configuration.padding} align={direction}>
                        -
                    </TableCell>
                )
            }

            const hasAccess = (this.props.authorization.user.permissions || []).indexOf(permission) !== -1;
            const link = linkGenerator(this.props.value.relationId);

            const caption = captionGenerator(this.props.value);
            const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {};

            return (
                <TableCell padding={this.props.configuration.padding} style={styles} align={direction}>
                    {hasAccess && (
                        <Link {...link}>{caption}</Link>
                    )}
                    {!hasAccess && (
                        <React.Fragment>
                            {caption}
                        </React.Fragment>
                    )}
                </TableCell>
            )
        }
    }

    // @ts-ignore
    return connect(RelationCellWithLink.mapStoreToProperties)(RelationCellWithLink)
};