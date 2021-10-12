import React from "react";
import {Schemas} from "../../../../settings/schema";
import {OrderParameter} from "../../../../services/listDataLoader/listLoader/interfaces";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import columnDirection from "../helpers/columnDirection";
import {Theme} from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import {ListFieldConfiguration, ListResponse} from "../../../../services/listDataLoader/listLoader/types";
import {Checkbox, CheckboxProps, Tooltip} from "@mui/material";
import {blue} from "@mui/material/colors";
import {ListPageConfiguration} from "../../../../settings/pages/system/list";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = createStyles({
    columnRoot: {
        '&:hover': {
            color: `#d6dcfb!important`,
            transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        '&:focus': {
            color: `#d6dcfb!important`,
            transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }
    },
    activeColumn: {
        color: `#d6dcfb!important`,
        transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

// Стилизованный компонент ячейки заголовочной части
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

// Стилизованный checkbox для header таблицы сущностей
const ColoredCheckbox = withStyles({
    root: {
        color: blue[200],
        '&$checked': {
            color: blue[200],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// Свойства заголовочной части таблицы
export interface ListHeaderProps {
    response: ListResponse<keyof Schemas>
    configuration: ListPageConfiguration<keyof Schemas>
    checkedItems: any[]
    hasEditAccess: boolean
    onChangeOrder: {(orders: OrderParameter<any>[]): void}
    onSelectAll: {(): void}
    onUnselectAll: {(): void}
    classes: {
        columnRoot: string
        activeColumn: string
        visuallyHidden: string
    }
}

// State для заголовочной части страницы
type Orders<T extends keyof Schemas> = {[P in keyof Schemas[T]['fields']]?: "asc" | "desc" | undefined}
export interface ListHeaderState {
    orders: Orders<any>
}

// Компонент вывода заголовочной части таблицы сущностей
class ListHeader extends React.Component<ListHeaderProps, ListHeaderState> {
    /**
     * Коснтруктор компонента
     * @param props
     */
    constructor(props: ListHeaderProps) {
        super(props);
        const orders: Orders<any> = {};
        this.props.response.parameters.order
            .sort((a: OrderParameter<any>, b: OrderParameter<any>): number => {
                return a.priority - b.priority
            })
            .map(item => {
                orders[item.by] = item.direction
            });

        this.state = {
            orders: orders
        }
    }

    /**
     * Загружаем изначальные параметры сортировки
     */
    componentDidMount() {
        const orders: Orders<any> = {};
        this.props.response.parameters.order
            .sort((a: OrderParameter<any>, b: OrderParameter<any>): number => {
                return a.priority - b.priority
            })
            .map(item => {
                orders[item.by] = item.direction
            });

        if (JSON.stringify(this.state.orders) != JSON.stringify(orders)) {
            this.setState({
                orders: orders
            })
        }
    }

    /**
     * Если изменились параметры сортировки и они отличаются от предыдщуих, то обновляем их в State
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: Readonly<ListHeaderProps>, prevState: Readonly<ListHeaderState>) {
        const currentOrders = this.props.response.parameters.order.sort((a: OrderParameter<any>, b: OrderParameter<any>): number => a.priority - b.priority);
        const currentOrder = JSON.stringify(currentOrders);
        const prevOrder = JSON.stringify(prevProps.response.parameters.order.sort((a: OrderParameter<any>, b: OrderParameter<any>): number => a.priority - b.priority));

        if (prevOrder !== currentOrder) {
            const orders: Orders<any> = {};
            currentOrders.map(item => {orders[item.by] = item.direction});

            this.setState({
                orders: orders
            })
        }

        const prevOrders = JSON.stringify(prevState.orders);
        const currentOrdersFromState = JSON.stringify(this.state.orders);

        if (prevOrders !== currentOrdersFromState) {
            const orderParams: OrderParameter<any>[] = [];
            Object.keys(this.state.orders).map((field, i) => {
                // @ts-ignore
                const direction: "asc" | "desc" = this.state.orders[field];
                if (!direction) return;

                orderParams.push({
                    by: field,
                    direction: direction,
                    priority: i + 1
                })
            });

            if (JSON.stringify(orderParams) !== currentOrder) {
                this.props.onChangeOrder(orderParams)
            }
        }
    }

    /**
     * Изменение параметров сортировки
     * @param field
     */
    onChangeSort<T extends keyof Schemas>(field: keyof Schemas[T]['fields']) {
        let targetState: "asc" | "desc" | undefined = "asc";
        if (this.state.orders[field]) {
            switch (this.state.orders[field]) {
                case "asc":
                    targetState = "desc";
                    break;
                case "desc":
                    targetState = undefined
            }
        }

        let orders = JSON.parse(JSON.stringify(this.state.orders));
        if (!targetState) {
            let {[field]: _, ...newOrders} = this.state.orders;
            orders = {...newOrders}
        } else {
            orders[field] = targetState
        }

        this.setState({
            ...this.state,
            orders: orders
        })
    }

    /**
     * Рендеринг ячейки заголовков с сортировкой
     * @param field
     */
    renderHeaderWithSorting(field: ListFieldConfiguration<any, any>) {
        let sortText = "Сортировка по возрастанию";
        switch (this.state.orders[field.field]) {
            case "desc":
                sortText = "Отключить сортировку";
                break;
            case "asc":
                sortText = "Сортировка по убыванию"
        }

        return (
            <Tooltip title={sortText}>
                <TableSortLabel
                    active={!!this.state.orders[field.field]}
                    direction={this.state.orders[field.field] ? this.state.orders[field.field] : 'asc'}
                    onClick={() => this.onChangeSort(field.field)}
                    classes={{active: this.props.classes.activeColumn, root: this.props.classes.columnRoot, icon: this.props.classes.activeColumn}}
                >
                    {field.title}
                    {this.state.orders[field.field] ? (
                        <span className={this.props.classes.visuallyHidden}>
                          {this.state.orders[field.field] === 'desc' ? 'сортировка по убыванию' : 'сортировка по возрастанию'}
                        </span>
                    ) : null}
                </TableSortLabel>
            </Tooltip>
        )
    }

    /**
     * Рендеринг ячейки заголовков без сортировки
     * @param field
     */
    renderHeaderWithoutSorting(field: ListFieldConfiguration<any, any>) {
        return (<React.Fragment>{field.title}</React.Fragment>)
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const schemaConfig = (new Schemas())[this.props.configuration.schema];
        const listConfig = this.props.configuration;
        const Actions = listConfig.listFields.actions;
        const isAllChecked = this.props.checkedItems.length > 0 && this.props.checkedItems.length === this.props.response.rows.length;
        const checkboxTitle = !isAllChecked ? `Выбрать все элементы` : `Снять выделение`;
        const drawCheckbox = !this.props.configuration?.disableMultiChoose;
        const actionsColumn = !!Actions || (
            this.props.hasEditAccess && (schemaConfig.isChangeable || schemaConfig.isDeletable)
        );

        return (
            <TableHead>
                <TableRow>
                    {drawCheckbox && (
                        <StyledTableCell padding="checkbox">
                            <Tooltip title={checkboxTitle}>
                                <div>
                                    <ColoredCheckbox
                                        indeterminate={this.props.checkedItems.length > 0 && this.props.checkedItems.length < this.props.response.rows.length}
                                        checked={isAllChecked}
                                        onChange={event => {
                                            if (!event.target.checked) {
                                                this.props.onUnselectAll()
                                            } else {
                                                this.props.onSelectAll()
                                            }
                                        }}
                                    />
                                </div>
                            </Tooltip>
                        </StyledTableCell>
                    )}
                    {Object.values(this.props.response.parameters.listConfiguration.fields).map(
                        (field: ListFieldConfiguration<any, any>, i: number) => {
                            let direction = columnDirection(this.props.response.parameters.schema, field);
                            direction = field.align ? field.align : direction;
                            const canSort = ["Simple"].indexOf(field.fieldType.type) !== -1;
                            const styles = field.width ? {width: field.width} : {};

                            if (!field.isEnabled || field.fieldType.type === "Hidden") {
                                return null
                            }

                            return (
                                <StyledTableCell
                                    key={`table-column-${i}`}
                                    align={direction}
                                    style={styles}
                                    sortDirection={this.state.orders[field.field] ? this.state.orders[field.field] : false}
                                >
                                    {canSort && this.renderHeaderWithSorting(field)}
                                    {!canSort && this.renderHeaderWithoutSorting(field)}
                                </StyledTableCell>
                            )
                        }
                    )}
                    {actionsColumn && (
                        <StyledTableCell align={"right"} style={{width: 120}}>Действия</StyledTableCell>
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

// Экспортируем компонент с подключенными стилями
export default withStyles(styles)(ListHeader)