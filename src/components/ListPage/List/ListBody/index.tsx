import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {ListResponse} from "../../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../../settings/schema";
import ListRow, {FirstCellProps} from "./ListRow";
import {ListPageConfiguration} from "../../../../settings/pages/system/list";

// Свойства тела таблицы
export interface ListBodyProps {
    response: ListResponse<keyof Schemas>
    configuration: ListPageConfiguration<keyof Schemas>
    firstCell?: React.ComponentType<FirstCellProps>
    hasEditAccess: boolean
    dense: boolean
    mainLangId: string
    secondaryLangId: string
    checkedItems: any[]
    onCheckItem: {(item: any): void}
    onUncheckItem: {(item: any): void}
    onEditItem: {(item: any): void}
    onDeleteItems: {(items: any[]): void}
    onChangeResponse: {(response: ListResponse<keyof Schemas>): void}
}

// Компонент вывода тела страницы листинга сущностей
export class ListBody extends React.Component<ListBodyProps> {
    /**
     * Рендеринг компонента
     */
    render() {
        let colSpan = Object.values(this.props.response.parameters.listConfiguration.fields).length;
        if (this.props.hasEditAccess) {
            colSpan++
        }

        if (this.props.response.parameters.listConfiguration.actions) {
            colSpan++
        }

        if (this.props.firstCell) {
            colSpan++
        }

        if (!this.props.configuration.disableMultiChoose) {
            colSpan++
        }

        const rowsQuantity = this.props.response.rows.length;
        return (
            <TableBody className={`entity-list-table-body`}>
                {this.props.response.rows.map((row, i) => {
                    return (
                        <ListRow
                            key={`row-component-${i}`}
                            hasEditAccess={this.props.hasEditAccess}
                            configuration={this.props.configuration}
                            response={this.props.response}
                            isLastRow={(rowsQuantity - 1) === i}
                            row={row}
                            firstCell={this.props.firstCell}
                            dense={this.props.dense}
                            checkedItems={this.props.checkedItems}
                            onCheckItem={this.props.onCheckItem}
                            onUncheckItem={this.props.onUncheckItem}
                            onEditItem={this.props.onEditItem}
                            onDeleteItems={this.props.onDeleteItems}
                            mainLangId={this.props.mainLangId}
                            secondaryLangId={this.props.secondaryLangId}
                            onChangeResponse={this.props.onChangeResponse}
                        />
                    )
                })}
                {this.props.response.rows.length === 0 && (
                    <TableRow>
                        <TableCell
                            colSpan={colSpan}
                            align={"center"}
                        >Нет данных для отображения</TableCell>
                    </TableRow>
                )}
            </TableBody>
        )
    }
}