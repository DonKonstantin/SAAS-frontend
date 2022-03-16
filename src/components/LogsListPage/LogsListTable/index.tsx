import React, {FC} from "react";
import {Table, TableContainer} from "@mui/material";
import LogsListTableHeader from "./LogsListTableHeader";
import LogsListTableBody from "./LogsListTableBody";

const LogsListTable:FC = () => {
    return (
        <TableContainer>
            <Table>
                <LogsListTableHeader/>
                <LogsListTableBody/>
            </Table>
        </TableContainer>
    )
}

export default LogsListTable
