import {AdditionProps, ListFieldRow, ListResponse} from "../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../settings/schema";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell, withStyles} from "@material-ui/core";
import LoadingBlocker from "../../LoadingBlocker";
import {treeRowLoader} from "../../../services/treeRowLoader";
import {RelationValue} from "../../../services/listDataLoader/listLoader/listValues/RelationValue";
import {ListBody} from "../../ListPage/List/ListBody";
import Table from "@material-ui/core/Table";
import {createStyles} from "@material-ui/core/styles";
import {ChildrenArrow} from "./ChildrenArrow";

// Стили компонента
const styles = createStyles({
    table: {
        width: '100%',
    },
});

// Параметры компонента строки дочерних сущностей
export interface Parameters<T extends keyof Schemas> {
    schema: T
    childrenField: keyof Schemas[T]['fields']
}

// Свойства компонента строки дочерних сущностей
export interface ChildrenRowComponentProps extends AdditionProps<ListFieldRow<keyof Schemas>, any> {
    level: number
    params: Parameters<keyof Schemas>
    classes: {
        table: string
    }
}

// State компонента
interface ChildrenRowComponentState {
    childrenRows: ListResponse<keyof Schemas>
    isLoading: boolean
}

/**
 * Компонент отображения дочерних сущностей для древовидного представления
 */
class ChildrenRowComponent extends React.Component<ChildrenRowComponentProps, ChildrenRowComponentState> {

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ChildrenRowComponentProps) {
        super(props);
        this.state = {
            // @ts-ignore
            childrenRows: {rows: [], additionData: undefined},
            isLoading: false,
        }
    }

    /**
     * Загружаем дочерние строки, если компонент видим при монтировании
     */
    componentDidMount() {
        this.loadRows()
    }

    /**
     * Загружаем дочерние строки, когда компонент стал видимым
     */
    componentDidUpdate() {
        this.loadRows()
    }

    /**
     * Загружаем дочерние строки
     */
    loadRows() {
        const children: RelationValue[] = this.props.item.columnValues[this.props.params.childrenField];
        if (!Array.isArray(children) || children.length === 0) {
            return
        }

        const isVisible = this.props.rowState?.isOpen || false;
        if (!isVisible || this.state.childrenRows.rows.length > 0 || this.state.isLoading) {
            return
        }

        this.setState({
            ...this.state,
            isLoading: true,
        });

        treeRowLoader()
            .LoadRows({
                schema: this.props.params.schema,
                primaryKeyValues: children.map(ch => ch.relationId)
            })
            .then(loaded => {
                if (0 === loaded.rows.length) {
                    return
                }

                this.setState({
                    ...this.state,
                    isLoading: false,
                    childrenRows: loaded
                })
            })
    }

    /**
     * Обработка изменения изначального пула данных строк
     * @param response
     */
    handleChangeResponse(response: ListResponse<keyof Schemas>) {
        this.setState({
            ...this.state,
            childrenRows: response,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const children: string[] = this.props.item.columnValues[this.props.params.childrenField];
        if (!Array.isArray(children) || children.length === 0) {
            return null
        }

        const config = this.props.configuration;
        if (!config) {
            return null
        }

        let colSpan = Object.values(config.listFields.fields).filter(field => field.isEnabled).length;
        if (this.props.hasEditAccess) {
            colSpan++;
        }

        const isNeedFirstColumn = !config.disableMultiChoose && this.props.level == 0;
        const isVisible = this.props.rowState?.isOpen || false;

        if (!isVisible) {
            return null
        }

        const FirstCellComponent = this.props.firstCell;
        return (
            <TableRow className={`entity-list-table-row`}>
                {isNeedFirstColumn && (
                    <TableCell padding={"checkbox"}/>
                )}
                {FirstCellComponent && (
                    <FirstCellComponent isChildrenRow={true} lastRow={this.props.isLastRow} />
                )}
                <TableCell colSpan={colSpan} style={{padding: 0}}>
                    {this.state.childrenRows.rows.length === 0 && (
                        <LoadingBlocker style={"linear"} isBlockContent={false} />
                    )}
                    {this.state.childrenRows.rows.length !== 0 && (
                        <div>
                            <Table
                                className={this.props.classes.table}
                                size={this.props.dense ? 'small' : 'medium'}
                            >
                                <ListBody
                                    hasEditAccess={this.props.hasEditAccess}
                                    configuration={config}
                                    response={this.state.childrenRows}
                                    checkedItems={[]}
                                    firstCell={ChildrenArrow}
                                    onCheckItem={() => {}}
                                    onUncheckItem={() => {}}
                                    onEditItem={this.props.onEditItem}
                                    onDeleteItems={this.props.onDeleteItems}
                                    mainLangId={this.props.mainLangId}
                                    secondaryLangId={this.props.secondaryLangId}
                                    languages={this.props.languages}
                                    dense={this.props.dense}
                                    onChangeResponse={response => this.handleChangeResponse(response)}
                                />
                            </Table>
                        </div>
                    )}
                </TableCell>
            </TableRow>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(ChildrenRowComponent)