import {FC,} from "react";
import {TableBody} from "@mui/material";
import {useSystemLogsEntity} from "../SystemLogsEntityContext";
import LogsListTableItem from "./LogsListTableItem";

const LogsListTableBody: FC = () => {
    const {entityItems} = useSystemLogsEntity();

    return (
        <TableBody>
            {
                entityItems.map((item, index) => (
                    <LogsListTableItem
                        {...item}
                        key={`${item.date}-${index}`}
                    />
                ))
            }
        </TableBody>
    )
}

export default LogsListTableBody
