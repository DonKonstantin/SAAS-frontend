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
        <TableRow>
            <TableCell width={260}>
                {user.firstName} {user.lastName}
            </TableCell>
            <TableCell width={260}>
                {eventTypeName}
            </TableCell>
            <TableCell width={300} sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "300px"}}>
                <Tooltip title={entityName}>
                    <span>
                    {entityName}
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell width={145}>
                {dayjs(date).format(`DD.MM.YY hh:mm`)}
            </TableCell>
        </TableRow>
    )
}

export default LogsListTableItem
