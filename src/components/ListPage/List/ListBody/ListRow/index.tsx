import React from "react";
import TableRow from "@mui/material/TableRow";
import {
    AdditionProps, FieldType,
    ListFieldProperties, ListFieldRow,
    ListFieldTypes, ListFieldValueTypes,
    ListResponse
} from "../../../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../../../settings/schema";
import columnDirection from "../../helpers/columnDirection";
import {listCells} from "../ListCells";
import EditIcon from '@mui/icons-material/Edit';
import TableCell from "@mui/material/TableCell";
import {Checkbox, IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ListPageConfiguration} from "../../../../../settings/pages/system/list";
import clsx from "clsx";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = createStyles({
    margin: {
        marginLeft: 2,
        '&::nth-of-type(1)': {
            marginLeft: 0
        }
    },
    row: {
        transition: "background-color 200ms linear",
        backgroundColor: "transparent",
        '&:hover': {
            backgroundColor: "rgba(63, 81, 181, 0.07)",
        }
    }
});

// Свойства первой ячейки
export interface FirstCellProps {
    lastRow: boolean
    isChildrenRow?: boolean
}

// Свойства тела таблицы
export interface ListRowProps {
    response: ListResponse<keyof Schemas>
    configuration: ListPageConfiguration<keyof Schemas>
    mainLangId: string
    secondaryLangId: string
    dense: boolean
    isLastRow: boolean
    firstCell?: React.ComponentType<FirstCellProps>
    checkedItems: any[]
    row: ListFieldRow<any>
    hasEditAccess: boolean
    onCheckItem: {(item: any): void}
    onUncheckItem: {(item: any): void}
    onEditItem: {(item: any): void}
    onDeleteItems: {(items: any[]): void}
    onChangeResponse: {(response: ListResponse<keyof Schemas>): void}
    classes: {
        margin: string
        row: string
    }
}

// Компонент вывода тела страницы листинга сущностей
class ListRow extends React.Component<ListRowProps, any> {
    private listCells: ListFieldTypes;

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ListRowProps) {
        super(props);
        this.listCells = listCells()
    }

    /**
     * Подключаем шаблоны вывода стандартных полей
     */
    componentDidMount() {
        this.listCells = listCells();
        this.handleResetRowsState()
    }

    /**
     * Сбрасываем State, если изменились параметры
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<ListRowProps>) {
        if (JSON.stringify(this.props.row) !== JSON.stringify(prevProps.row)) {
            this.handleResetRowsState()
        }
    }

    /**
     * Блокируем лишние обновления компонента строки
     *
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: Readonly<ListRowProps>, nextState: Readonly<any>): boolean {
        const data = JSON.stringify([
            this.props.row,
            this.props.mainLangId,
            this.props.secondaryLangId,
            this.state,
            this.props.checkedItems.indexOf(this.props.row.primaryKeyValue) !== -1,
            this.props.dense,
            this.props.isLastRow,
        ]);
        const nextData = JSON.stringify([
            nextProps.row,
            nextProps.mainLangId,
            nextProps.secondaryLangId,
            nextState,
            nextProps.checkedItems.indexOf(nextProps.row.primaryKeyValue) !== -1,
            nextProps.dense,
            nextProps.isLastRow,
        ]);

        return data !== nextData;
    }

    /**
     * Сброс состояния строк
     */
    handleResetRowsState() {
        this.setState({})
    }

    /**
     * Обработка изменения состояния строки
     * @param state
     */
    handleChangeRowState(state: any) {
        this.setState({
            ...JSON.parse(JSON.stringify(state)),
        })
    }

    /**
     * Обработка изменения дополнительных данных строки
     * @param additionData
     */
    handleChangeAdditionData(additionData: any) {
        const response: ListResponse<keyof Schemas> = JSON.parse(JSON.stringify(this.props.response));
        response.additionData = additionData;

        this.props.onChangeResponse(response)
    }

    renderRow(additionProps: AdditionProps<any, any>) {
        const schemaConfig = (new Schemas())[this.props.configuration.schema];
        const listConfig = this.props.configuration;
        const Actions = listConfig.listFields.actions;
        const isRowChecked = this.props.checkedItems.indexOf(this.props.row.primaryKeyValue) !== -1;
        const checkboxTitle = !isRowChecked ? `Выбрать элемент` : `Снять выделение`;

        const schema = (new Schemas())[this.props.response.parameters.schema];
        const drawCheckbox = !this.props.configuration?.disableMultiChoose;

        const actionsColumn = !!Actions || (
            this.props.hasEditAccess && (schemaConfig.isChangeable || schemaConfig.isDeletable)
        );

        const FirstCellComponent = this.props.firstCell;

        const isDeletable = this.props.hasEditAccess && schema.isDeletable;
        const isChangeable = this.props.hasEditAccess && schema.isChangeable;
        return (
            <React.Fragment>
                {drawCheckbox && (
                    <TableCell padding="checkbox">
                        <Tooltip title={checkboxTitle}>
                            <div>
                                <Checkbox
                                    color="primary"
                                    checked={isRowChecked}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            this.props.onCheckItem(this.props.row.primaryKeyValue)
                                        } else {
                                            this.props.onUncheckItem(this.props.row.primaryKeyValue)
                                        }
                                    }}
                                />
                            </div>
                        </Tooltip>
                    </TableCell>
                )}
                {FirstCellComponent && (
                    <FirstCellComponent lastRow={this.props.isLastRow} />
                )}
                {Object.values(this.props.response.parameters.listConfiguration.fields).map((field, j) => {
                    const direction = columnDirection(this.props.response.parameters.schema, field);
                    const value = this.props.row.columnValues[field.field];

                    // @ts-ignore
                    const actualConfig: FieldType<keyof ListFieldTypes> = listConfig?.listFields.fields[field.field].fieldType;

                    // @ts-ignore
                    const Component: React.ComponentType<ListFieldProperties<ListFieldValueTypes[keyof ListFieldValueTypes]>> = actualConfig.customComponent ? actualConfig.customComponent : this.listCells[field.fieldType.type];

                    if (!field.isEnabled) {
                        return null
                    }

                    return (
                        <Component
                            key={`row-component-cell-${j}`}
                            align={direction}
                            schema={this.props.response.parameters.schema}
                            value={value}
                            additionProps={additionProps}
                            configuration={field}
                            mainLangId={this.props.mainLangId}
                            secondaryLangId={this.props.secondaryLangId}
                            rowValues={this.props.row.columnValues}
                        >{`${value}`}</Component>
                    )
                })}
                {actionsColumn && (
                    <TableCell align={"right"} style={{width: 120, whiteSpace: "nowrap"}}>
                        {Actions && (
                            <Actions {...additionProps} />
                        )}
                        {isChangeable && (
                            <Tooltip title={`Редактировать элемент`}>
                                <label htmlFor="icon-button-edit" className={this.props.classes.margin}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        aria-label="Редактировать элемент"
                                        component="span"
                                        onClick={() => this.props.onEditItem(this.props.row.primaryKeyValue)}
                                    >
                                        <EditIcon fontSize={`small`} />
                                    </IconButton>
                                </label>
                            </Tooltip>
                        )}
                        {isDeletable && (
                            <Tooltip title={`Удалить элемент`}>
                                <label htmlFor="icon-button-remove" className={this.props.classes.margin}>
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        aria-label="Удалить элемент"
                                        component="span"
                                        onClick={() => this.props.onDeleteItems([this.props.row.primaryKeyValue])}
                                    >
                                        <CloseIcon fontSize={`small`} />
                                    </IconButton>
                                </label>
                            </Tooltip>
                        )}
                    </TableCell>
                )}
            </React.Fragment>
        );
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const listConfig = this.props.configuration;
        const RowHigher = listConfig.listFields.rowHigher;
        const RowBelow = listConfig.listFields.rowBelow;
        const schema = (new Schemas())[this.props.response.parameters.schema];
        const isChangeable = this.props.hasEditAccess && schema.isChangeable;
        const additionProps: AdditionProps<any, any> = {
            configuration: this.props.configuration,
            mainLangId: this.props.mainLangId,
            secondaryLangId: this.props.secondaryLangId,
            item: this.props.row,
            rowState: this.state,
            onSetRowState: (state: any) => this.handleChangeRowState(state),
            additionData: this.props.response.additionData,
            dense: this.props.dense,
            hasEditAccess: this.props.hasEditAccess,
            isLastRow: this.props.isLastRow,
            firstCell: this.props.firstCell,
            onDeleteItems: this.props.onDeleteItems,
            onEditItem: this.props.onEditItem,
            onChangeAdditionData: additionData => this.handleChangeAdditionData(additionData),
        };

        return (
            <React.Fragment>
                {RowHigher && (
                    <RowHigher {...additionProps}/>
                )}
                {isChangeable && (
                    <Tooltip title={`Двойной клик для перехода к редактированию сущности`}>
                        <TableRow
                            className={clsx(this.props.classes.row, `entity-list-table-row`)}
                            onDoubleClick={() => this.props.onEditItem(this.props.row.primaryKeyValue)}
                        >
                            {this.renderRow(additionProps)}
                        </TableRow>
                    </Tooltip>
                )}
                {!isChangeable && (
                    <TableRow>
                        {this.renderRow(additionProps)}
                    </TableRow>
                )}
                {RowBelow && (
                    <RowBelow {...additionProps}/>
                )}
            </React.Fragment>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(ListRow)