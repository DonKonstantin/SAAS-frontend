import React, {FC, memo} from "react";
import {SimpleValues} from "services/listDataLoader/listLoader/listValues/SimpleValues";
import {ListFieldProperties} from "services/listDataLoader/listLoader/types";
import {Typography, TableCell} from "@mui/material";
import {PlayerWithoutRelations} from "services/playerCodeService/interfaces";

/**
 * Компонет ячейки имени канала для листинга плееров
 * @param param0
 * @returns
 */
const ActivePlayersProjectChannel: FC<ListFieldProperties<SimpleValues>> = ({
                                                                                configuration,
                                                                                rowValues,
                                                                            }) => {
    const {padding, width, align} = configuration;

    const {players} = rowValues;

    const allPlayers = (players.value as PlayerWithoutRelations[]).length;
    const activePlayers = (players.value as PlayerWithoutRelations[]).filter(({is_active}) => is_active).length

    return (
        <TableCell
            className="list-table-cell"
            padding={padding}
            sx={{width: width}}
            align={align}
        >
            <Typography variant="caption">{activePlayers} ({allPlayers})</Typography>
        </TableCell>
    );
};

export default memo(ActivePlayersProjectChannel);
