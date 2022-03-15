import {FC} from "react";
import {TableHead, TableRow} from "@mui/material";
import {useTranslation} from "react-i18next";
import LogsListTableHeaderCell, {LogsListTableHeaderCellProps} from "./LogsListTableHeaderCell";
import {LogsOrderBy} from "../../../services/systemLogsService/interface";

const HeaderConfig: LogsListTableHeaderCellProps[] = [
    {
        align: 'left',
        sorted: true,
        title: "pages.SystemLogs.list.field.user",
        width: 260,
        field: "user",
        sortField: LogsOrderBy.user
    },
    {
        align: 'left',
        sorted: true,
        title: "pages.SystemLogs.list.field.eventTypeName",
        width: 260,
        field: "eventTypeName",
        sortField: LogsOrderBy.event
    },
    {
        align: 'left',
        sorted: true,
        title: "pages.SystemLogs.list.field.entityName",
        width: 0,
        field: "entityName",
        sortField: LogsOrderBy.entity
    },{
        align: 'left',
        sorted: true,
        title: "pages.SystemLogs.list.field.date",
        width: 145,
        field: "date",
        sortField: LogsOrderBy.date
    }
]

const LogsListTableHeader: FC = props => {
    const {t} = useTranslation();

    return (
        <TableHead>
            <TableRow>
                {
                    HeaderConfig.map(props => (
                        <LogsListTableHeaderCell
                            {...props}
                            key={props.field}
                        />
                    )
                    )
                }
            </TableRow>
        </TableHead>
    )
}

export default LogsListTableHeader
