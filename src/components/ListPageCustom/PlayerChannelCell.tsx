import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { Typography, TableCell } from "@mui/material";
import { distinctUntilChanged } from "rxjs";
import { useEntityList } from "context/EntityListContext";
import {isEqual, uniqBy} from "lodash";
import {PlayerDetails} from "../../services/playerList/interfaces";

/**
 * Компонет ячейки имени канала для листинга плееров
 * @param param0 
 * @returns 
 */
const PlayerChannelCell: FC<ListFieldProperties<SimpleValues>> = ({
  configuration,
  rowValues,
}) => {
  const { padding, width, align } = configuration;

  //@ts-ignore
  const { data: { currentData: { additionData } } } = useEntityList(
    distinctUntilChanged((previous, current) =>
      isEqual(previous.data, current.data)
    )
  );

  const playerId = rowValues.id.value;
  
  const campaigns = uniqBy(additionData.campaigns.filter((data) => data.id === playerId)[0]?.campaigns || [], 'channel.name') as unknown as PlayerDetails["campaigns"];

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      sx={{ width: width }}
      align={align}
    >
      <Typography variant="caption">{campaigns.map(item => item.channel.name).join(", ")}</Typography>
    </TableCell>
  );
};

export default memo(PlayerChannelCell);
