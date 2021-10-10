import {FirstCellProps} from "../../../ListPage/List/ListBody/ListRow";
import React from "react";
import {TableCell} from "@material-ui/core";
import clsx from "clsx";

/**
 * Компонент вывода дочерней строки
 */
export class ChildrenArrow extends React.Component<FirstCellProps>{
    render() {
        return (
            <TableCell
                padding={"none"}
                style={{paddingLeft: "calc(52px / 2)", width: 52, border: "none"}}
                className={`tree-item-arrow`}
            >
                <div className={clsx(`tree-item-vertical`, {
                    'is-full': !this.props.lastRow,
                    'disabled': this.props.lastRow && !!this.props.isChildrenRow
                })}/>
                <div className={clsx(`tree-item-horizontal`, {
                    'disabled': !!this.props.isChildrenRow
                })}/>
            </TableCell>
        )
    }
}