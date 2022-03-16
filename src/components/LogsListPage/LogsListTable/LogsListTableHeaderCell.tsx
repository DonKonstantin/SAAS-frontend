import React, {FC} from "react";
import {TableCell, Tooltip} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import {Box} from "@mui/system";
import {visuallyHidden} from "@mui/utils";
import {useTranslation} from "react-i18next";
import {useSystemLogsEntity} from "../SystemLogsEntityContext";
import {AlignRow} from "../../../services/listDataLoader/listLoader/types";
import {LogItem, LogsOrderBy} from "../../../services/systemLogsService/interface";

export type LogsListTableHeaderCellProps = {
    width: number,
    align: AlignRow,
    title: string,
    sorted: boolean,
    sortField: LogsOrderBy,
    field: keyof LogItem
}

type Props = {
} & LogsListTableHeaderCellProps

const LogsListTableHeaderCell: FC<Props> = props => {
    const {t} = useTranslation();
    const {direction, orderBy, setSortField} = useSystemLogsEntity();
    const {align, width, title, sortField} = props;

    const handleChangeOrder = () => {
        setSortField(sortField);
    }

    const usedOrder = sortField === orderBy;
    const sortText = `entity-list.components.list.header.order-tooltip.${direction || "default"}`

    return (
        <TableCell className="list-table-cell" style={{width: width}} align={align}>
            <Tooltip title={t(sortText) as string}>
                <TableSortLabel
                    active={usedOrder}
                    direction={direction || 'asc'}
                    onClick={handleChangeOrder}
                >
                    {t(title)}
                    {usedOrder && (
                        <Box component="span" sx={visuallyHidden}>
                            {t(`entity-list.components.list.header.order.${direction}`)}
                        </Box>
                    )}
                </TableSortLabel>
            </Tooltip>
        </TableCell>
    )
}

export default LogsListTableHeaderCell;
