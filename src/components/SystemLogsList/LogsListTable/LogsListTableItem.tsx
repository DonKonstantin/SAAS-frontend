import {FC} from "react";
import {LogItem} from "../../../services/systemLogsService/interface";
import {TableCell, TableRow, Tooltip} from "@mui/material";
import dayjs from "dayjs";

type Props = {

} & LogItem

const LogsListTableItem: FC<Props> = props => {
    const {
        user,
        eventTypeName,
        entityName,
        date
    } = props;

    return (
        <TableRow sx={{height: '55px'}}>
            <TableCell width={200}>
                {user.firstName} {user.lastName}
            </TableCell>
            <TableCell width={200}>
                {eventTypeName}
            </TableCell>
            <TableCell  sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: 150}}>
                <Tooltip title={entityName}>
                    <span>
                    {entityName}
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell width={145}>
                {dayjs(date).format(`DD.MM.YY HH:mm`)}
            </TableCell>
        </TableRow>
    )
}

export default LogsListTableItem
