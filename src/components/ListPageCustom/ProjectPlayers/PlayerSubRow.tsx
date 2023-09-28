import { TableCell, TableRow } from "@mui/material";
import React, { FC, memo } from "react";
import { PlayerChannel } from "services/playerList/interfaces";

interface Props {
  row: PlayerChannel;
};

/**
 * Компонент подстроки для строки плеера листинга плееров
 * @param param0
 * @returns
 */
const PlayerSubRow: FC<Props> = ({ row }) => {
  const percent: string = Intl.NumberFormat(
    undefined,
    {
      style: 'percent',
      maximumFractionDigits: 2,
    },
  ).format(row.uploadingStatus / 100);

  return (
    <TableRow sx={{ height: '55px' }}>
      <TableCell width={48}/>

      <TableCell>{row.channel.name}</TableCell>

      <TableCell sx={{ textAlign: "right", pr: 10 }}>{percent}</TableCell>
    </TableRow>
  );
};

export default memo(PlayerSubRow);
