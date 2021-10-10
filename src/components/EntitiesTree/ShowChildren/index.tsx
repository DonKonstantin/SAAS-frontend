import React from "react";
import {ListFieldProperties} from "../../../services/listDataLoader/listLoader/types";
import {RelationValue} from "../../../services/listDataLoader/listLoader/listValues/RelationValue";
import {IconButton, TableCell, Tooltip} from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import DescriptionIcon from '@material-ui/icons/Description';

/**
 * Компонент вывода ячейки вывода дочерних сущностей для древовидного представления
 */
export class EntitiesTreeShowChildrenCell extends React.Component<ListFieldProperties<RelationValue[]>> {

    /**
     * Переключение состояния видимости дочерних элементов
     */
    handleToggleOpenState() {
        const isOpen = this.props.additionProps.rowState?.isOpen || false;
        this.props.additionProps.onSetRowState({
            isOpen: !isOpen,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const isOpen = this.props.additionProps.rowState?.isOpen || false;
        const Icon = isOpen ? FolderOpenIcon : FolderIcon;

        return (
            <TableCell padding={"checkbox"} align={"center"} style={{width: 52, lineHeight: 0}}>
                {this.props.value.length === 0 && (
                    <DescriptionIcon color={"disabled"} />
                )}
                {this.props.value.length !== 0 && (
                    <Tooltip title={`${isOpen ? `Скрыть` : `Показать`} дочерние элементы`}>
                        <IconButton color="primary" component="span" onClick={() => this.handleToggleOpenState()}>
                            <Icon />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        )
    }
}