import { TableCell, TableRow } from "@mui/material";
import React, { FC, memo } from "react";
import { PlayerWithoutRelations } from "services/playerCodeService/interfaces";
import dayjs from "dayjs";
import CustomActiveCell from "./CustomActiveCell";
import { listSchemaConfiguration } from "settings/pages";
require("dayjs/locale/ru");

interface Props {
  row: PlayerWithoutRelations;
}

/**
 * Подстрока для кастомной строки листинга плееров
 * @param param0
 * @returns
 */
const PlayerCodeSubRow: FC<Props> = ({ row }) => {
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  dayjs.locale("ru");

  //@ts-ignore
  const lastUpdate = dayjs(row.last_update).fromNow();

  return (
    <TableRow>
      <TableCell sx={{ pl: 8 }}>{row.name}</TableCell>
      <CustomActiveCell
        schema="player_code"
        value={{
          value: row.is_active,
        }}

        rowValues={[]}
        configuration={
          listSchemaConfiguration()["player_code"]?.listFields.fields[
            "is_active"
          ]!
        }
        primaryKeyValue={"1"}
      />
      <TableCell sx={{ textAlign: "right" }}>{lastUpdate}</TableCell>
    </TableRow>
  );
};

export default memo(PlayerCodeSubRow);
