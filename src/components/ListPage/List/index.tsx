import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ListHeader from "./ListHeader";
import {ListResponse} from "../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../settings/schema";
import {OrderParameter} from "../../../services/listDataLoader/listLoader/interfaces";
import {ListBody} from "./ListBody";
import {ListFooter} from "./ListFooter";
import LoadingBlocker from "../../LoadingBlocker";
import clsx from "clsx";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = createStyles({
    root: {
        width: '100%',
        position: 'relative'
    },
    table: {
        width: '100%',
    },
});

// Свойства страницы листинга сущностей
export interface ListProps {
    response: ListResponse<keyof Schemas>
    configuration: ListPageConfiguration<keyof Schemas>
    isLoading: boolean
    hasEditAccess: boolean
    mainLangId: string
    secondaryLangId: string
    dense: boolean
    checkedItems: any[]
    classes: {
        root: string,
        table: string,
    }

    onChangeOrder: {(orders: OrderParameter<any>[]): void}
    onChangeOffset: {(offset: number): void}
    onChangeLimit: {(limit: number): void}
    onSelectAll: {(): void}
    onUnselectAll: {(): void}
    onCheckItem: {(item: any): void}
    onUncheckItem: {(item: any): void}
    onEditItem: {(item: any): void}
    onDeleteItems: {(items: any[]): void}
    onChangeResponse: {(response: ListResponse<keyof Schemas>): void}
}

// Компонент вывода таблицы сущностей
class ListComponent extends React.Component<ListProps> {
    render() {
        return (
            <div className={clsx(this.props.classes.root, `entity-list-table`)}>
                <LoadingBlocker isVisible={this.props.isLoading} isBlockContent={true} style={"linear"} />
                <TableContainer component={Paper}>
                    <Table className={this.props.classes.table} size={this.props.dense ? 'small' : 'medium'}>
                        <ListHeader
                            hasEditAccess={this.props.hasEditAccess}
                            configuration={this.props.configuration}
                            response={this.props.response}
                            onChangeOrder={this.props.onChangeOrder}
                            checkedItems={this.props.checkedItems}
                            onSelectAll={this.props.onSelectAll}
                            onUnselectAll={this.props.onUnselectAll}
                        />
                        <ListBody
                            hasEditAccess={this.props.hasEditAccess}
                            configuration={this.props.configuration}
                            response={this.props.response}
                            checkedItems={this.props.checkedItems}
                            onCheckItem={this.props.onCheckItem}
                            onUncheckItem={this.props.onUncheckItem}
                            onEditItem={this.props.onEditItem}
                            onDeleteItems={this.props.onDeleteItems}
                            mainLangId={this.props.mainLangId}
                            secondaryLangId={this.props.secondaryLangId}
                            dense={this.props.dense}
                            onChangeResponse={this.props.onChangeResponse}
                        />
                    </Table>
                </TableContainer>
                <ListFooter
                    hasEditAccess={this.props.hasEditAccess}
                    isLoading={this.props.isLoading}
                    response={this.props.response}
                    checkedItems={this.props.checkedItems}
                    onChangeOffset={this.props.onChangeOffset}
                    onChangeLimit={this.props.onChangeLimit}
                    onDeleteItems={this.props.onDeleteItems}
                />
            </div>
        )
    }
}

// Экспортируем компонент таблицы
export default withStyles(styles)(ListComponent)