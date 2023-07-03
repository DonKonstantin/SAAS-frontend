import {TableCell, TableRow} from "@mui/material";
import React, {FC, memo} from "react";
import {PlayerWithoutRelations} from "services/playerCodeService/interfaces";
import dayjs from "dayjs";
import {listSchemaConfiguration} from "settings/pages";
import CustomActiveCell from "../CustomActiveCell";

require("dayjs/locale/ru");

interface Props {
    row: PlayerWithoutRelations;
}

/**
 * Подстрока для кастомной строки листинга плееров
 * @param param0
 * @returns
 */
const PlayerCodeSubRow: FC<Props> = ({row}) => {
    const relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);
    dayjs.locale("ru");

    //@ts-ignore
    const lastUpdate = dayjs(row.last_update).fromNow();

    const nameWidth = listSchemaConfiguration()["project_channel"]?.listFields.fields["name"]!.width as unknown as number

    return (
        <TableRow sx={{height: '55px'}}>
            <TableCell width={48}/>
            <TableCell
                       width={nameWidth}

            >{row.name}</TableCell>
            <CustomActiveCell
                schema="project_channel"
                value={{
                    value: row.is_active,
                }}

                rowValues={[]}
                configuration={
                    listSchemaConfiguration()["project_channel"]?.listFields.fields[
                        "is_active"
                        ]!
                }
                primaryKeyValue={"1"}
            />
            <TableCell sx={{textAlign: "right"}}>{lastUpdate}</TableCell>
        </TableRow>
    );
};

export default memo(PlayerCodeSubRow);
