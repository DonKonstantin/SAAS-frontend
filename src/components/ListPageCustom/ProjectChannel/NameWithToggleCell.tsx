import {IconButton, TableCell, Tooltip} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React, {FC} from "react";
import {ListFieldProperties} from "../../../services/listDataLoader/listLoader/types";
import {SimpleValues} from "../../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {setOpenRows, useOpenRows} from "./OpenDetailStream$";


const NameWithToggleCell: FC<ListFieldProperties<SimpleValues>> = ({value, configuration, rowValues}) => {
    const {padding, width, align} = configuration;


    const openRows = useOpenRows();

    const open = openRows.includes(rowValues.id.value);

    const hasSubRows = rowValues.players.value.length === 0

    const toggleHandler = () => {
        if (open) {
            setOpenRows(openRows.filter(id => id !== rowValues.id.value));

            return;
        }

        setOpenRows([...openRows, rowValues.id.value]);
    }

    return (
        <TableCell
            className="list-table-cell"
            padding={padding}
            style={{width}}
            align={align}
        >
            {value.value}
            <Tooltip title="">
                <IconButton onClick={toggleHandler} disabled={hasSubRows} sx={{marginY: '-9px'}}>
                    <ArrowDropUpIcon
                        sx={{transform: `rotate(${open ? 180 : 0}deg)`}}
                    />
                </IconButton>
            </Tooltip>
        </TableCell>
    );
}

export default NameWithToggleCell