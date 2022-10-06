import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { Typography, TableCell } from "@mui/material";
import { distinctUntilChanged } from "rxjs";
import { useEntityList } from "context/EntityListContext";
import { isEqual } from "lodash";

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

  const channel = additionData.filter((data) => data.id === playerId)[0];

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      sx={{ width: width }}
      align={align}
    >
      <Typography variant="caption">{channel.campaigns.channel.name}</Typography>
    </TableCell>
  );
};

export default memo(PlayerChannelCell);
