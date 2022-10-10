import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { Typography, TableCell } from "@mui/material";
import { distinctUntilChanged } from "rxjs";
import { useEntityList } from "context/EntityListContext";
import { isEqual } from "lodash";

/**
 * Компонет ячейки статуса загрузки для листинга плееров
 * @param param0 
 * @returns 
 */
const PlayerUploadingStatus: FC<ListFieldProperties<SimpleValues>> = ({
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

  const campaigns = additionData.campaigns.filter((data) => data.id === playerId)[0].campaigns;

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      sx={{ width: width }}
      align={align}
    >
      <Typography variant="caption">
        {campaigns.reduce((acc: number, item) => acc + item.uploadingStatus, 0).toFixed(2)}%
      </Typography>
    </TableCell>
  );
};

export default memo(PlayerUploadingStatus);
