import React from "react";
import {Schemas} from "../../../../settings/schema";
import TablePagination from "@material-ui/core/TablePagination";
import {ListResponse} from "../../../../services/listDataLoader/listLoader/types";
import {Button, Grid} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {clientServerDetector} from "../../../../services/clientServerDetector";

// Свойства подвала таблицы
export interface ListFooterProps {
    isLoading: boolean
    hasEditAccess: boolean
    checkedItems: any[]
    response: ListResponse<keyof Schemas>
    onChangeOffset: {(offset: number): void}
    onChangeLimit: {(limit: number): void}
    onDeleteItems: {(items: any[]): void}
}

// Компонент вывода подвала таблицы
export class ListFooter extends React.Component<ListFooterProps> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ListFooterProps) {
        super(props);

        this.handleButtonPressEvent = this.handleButtonPressEvent.bind(this)
    }

    /**
     * Подключаем обработку нажатия быстрых клавиш
     */
    componentDidMount() {
        if (clientServerDetector().isClient()) {
            document.addEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.removeEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        const page = Math.ceil(this.props.response.parameters.offset / this.props.response.parameters.limit);
        const pagesQuantity = Math.ceil((this.props.response.count || 0) / this.props.response.parameters.limit);

        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "ArrowRight" && event.shiftKey && !this.props.isLoading && pagesQuantity > (page + 1):
                this.handleChangePage(page + 1);

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "ArrowLeft" && event.shiftKey && !this.props.isLoading && page !== 0 && pagesQuantity !== 1:
                this.handleChangePage(page - 1);

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Обработка изменения страницы
     * @param page
     */
    handleChangePage(page: number) {
        this.props.onChangeOffset(page * this.props.response.parameters.limit)
    }

    /**
     * Обработка изменения количества элементов на странице
     * @param limit
     */
    handleChangeLimit(limit: number) {
        this.props.onChangeLimit(limit)
    }

    getElementsText(quantity: number): string {
        while (quantity > 10) {
            quantity = quantity - 10
        }

        switch (true) {
            case quantity === 1:
                return `${quantity} элемент`;
            case [2, 3, 4].indexOf(quantity) !== -1:
                return `${quantity} элемента`;
            default:
                return `${quantity} элементов`
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const schema = (new Schemas())[this.props.response.parameters.schema];
        const isDeletable = this.props.hasEditAccess && schema.isDeletable;
        const page = Math.ceil(this.props.response.parameters.offset / this.props.response.parameters.limit);

        return (
            <Grid container alignItems={"center"}>
                <Grid item xl={6} lg={5} xs={12} style={{padding: "11px 0"}}>
                    {this.props.checkedItems.length > 0 && (
                        <Grid container alignItems={"center"} spacing={2}>
                            <Grid item>
                                Выбрано: {this.getElementsText(this.props.checkedItems.length)}.
                            </Grid>
                            <Grid item>
                                <Grid container alignItems={"center"} spacing={1}>
                                    {isDeletable && (
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => this.props.onDeleteItems(this.props.checkedItems)}
                                            >
                                                Удалить ({this.props.checkedItems.length})
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xl={6} lg={7} xs={12}>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50]}
                        component="div"
                        count={this.props.response.count || 0}
                        rowsPerPage={this.props.response.parameters.limit}
                        nextIconButtonText={`Следующая страница [shift + 🠚]`}
                        backIconButtonText={`Предыдущая страница [shift + 🠘]`}
                        labelRowsPerPage={"Элементов:"}
                        className={`list-items-table-pagination`}
                        labelDisplayedRows={paginationInfo => `${paginationInfo.from} - ${paginationInfo.to} из ${paginationInfo.count}`}
                        page={page}
                        onChangePage={(_, p) => this.handleChangePage(p)}
                        onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChangeLimit(parseInt(event.target.value, 10))}
                    />
                </Grid>
            </Grid>
        )
    }
}