import {Collapse, Table, TableCell, TableRow} from "@mui/material";
import React, {FC} from "react";
import {useOpenRows} from "./OpenDetailStream$";
import PlayerCodeSubRow from "./PlayerCodeSubRow";

type Props = {
    item: any
}

const ProjectChannelPlayers: FC<Props> = ({ item}) => {
    const openRows = useOpenRows();

    const open = openRows.includes(item.primaryKeyValue)
    const players = item.columnValues.players?.value

    if (!players) {
        return null
    }

    return (
        <TableRow>
            <TableCell sx={{ p: 0, border: 0 }} colSpan={5}>
                <Collapse in={open}>
                    <Table>
                        {players.map((subRow) => (
                            <PlayerCodeSubRow row={subRow} key={subRow.id} />
                        ))}
                    </Table>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default ProjectChannelPlayers;