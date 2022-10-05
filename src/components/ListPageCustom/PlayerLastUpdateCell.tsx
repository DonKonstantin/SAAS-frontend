import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { Typography, TableCell } from "@mui/material";
import dayjs from "dayjs";
require('dayjs/locale/ru');

/**
 * Компонет ячейки времени обновления для листинга плееров
 * @param param0 
 * @returns 
 */
const PlayerLastUpdateCell: FC<ListFieldProperties<SimpleValues>> = ({
  value,
  configuration,
}) => {
  const { padding, width, align } = configuration;

  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);
  dayjs.locale('ru');

  //@ts-ignore
  const lastUpdate = dayjs(value.value).fromNow();

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      sx={{ width: width }}
      align={align}
    >
      <Typography variant="caption">
        {lastUpdate}
      </Typography>
    </TableCell>
  );
};

export default memo(PlayerLastUpdateCell);
