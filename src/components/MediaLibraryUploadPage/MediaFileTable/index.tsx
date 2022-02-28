import {FC} from "react";
import {Table, TableContainer} from "@mui/material";
import MediaFileTableHeader from "./MediaFileTableHeader";
import MediaFileTableBody from "./MediaFileTableBody";

/**
 * Component for show file to upload on server
 */
const MediaFileTable: FC = () => {
        return (
            <TableContainer>
                <Table>
                    <MediaFileTableHeader/>
                    <MediaFileTableBody/>
                </Table>
            </TableContainer>
        )
}

export default MediaFileTable
