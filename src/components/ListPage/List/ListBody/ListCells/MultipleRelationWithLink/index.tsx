import React from "react";
import {ListFieldProperties} from "../../../../../../services/listDataLoader/listLoader/types";
import columnDirection from "../../../helpers/columnDirection";
import TableCell from "@material-ui/core/TableCell";
import Link from "../../../../../Link";
import {Authorization} from "../../../../../../reduxStore/stores/Authorization";
import {ReduxStore} from "../../../../../../reduxStore/ReduxStore";
import {connect} from "react-redux";
import {RelationValue} from "../../../../../../services/listDataLoader/listLoader/listValues/RelationValue";

/**
 * Компонент вывода ячейки отношения со ссылкой на редактирование
 */
export type MultipleRelationLinkGenerator = {(primaryKey: string): {href: string, as: string}}
export type TMultipleRelationCellWithLinkComponent = {(linkGenerator: MultipleRelationLinkGenerator, permission: string): React.ComponentType<ListFieldProperties<RelationValue[]>>}
export const MultipleRelationCellWithLinkComponent: TMultipleRelationCellWithLinkComponent = (
    linkGenerator: MultipleRelationLinkGenerator,
    permission: string
): React.ComponentType<ListFieldProperties<RelationValue[]>> => {
    interface MultipleRelationCellWithLinkProps extends ListFieldProperties<RelationValue[]> {
        authorization: Authorization
    }

    class MultipleRelationCellWithLink extends React.Component<MultipleRelationCellWithLinkProps> {
        /**
         * Мапит текущий Redux state в свойства компонента
         *
         * @param store
         * @param globalProperties
         */
        static mapStoreToProperties(
            store: ReduxStore,
            globalProperties: Partial<MultipleRelationCellWithLinkProps>
        ): Partial<MultipleRelationCellWithLinkProps> {
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
            const styles = this.props.configuration.width ? {width: this.props.configuration.width} : {};
            return (
                <TableCell padding={this.props.configuration.padding} style={styles} align={direction}>
                    {this.props.value.map((val, i) => {
                        if (null === val) {
                            return null
                        }

                        const link = linkGenerator(val.relationId);
                        return (
                            <React.Fragment key={`cell-val-${i}`}>
                                {i !== 0 && (<br/>)}
                                {hasAccess && (
                                    <Link {...link}>{val.relationCaption}</Link>
                                )}
                                {!hasAccess && (
                                    <React.Fragment>
                                        {val.relationCaption}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )
                    })}
                    {this.props.value.length === 0 && (
                        <React.Fragment>-</React.Fragment>
                    )}
                </TableCell>
            )
        }
    }

    // @ts-ignore
    return connect(MultipleRelationCellWithLink.mapStoreToProperties)(MultipleRelationCellWithLink)
};