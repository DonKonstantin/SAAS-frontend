import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { Typography, TableCell } from "@mui/material";
import { distinctUntilKeyChanged } from "rxjs";
import { useEntityList } from "context/EntityListContext";

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

  const { data } = useEntityList(distinctUntilKeyChanged("data"));

  if (!data) {
    return null
  }

  const { currentData: { additionData } } = data;

  const playerId = rowValues.id.value;

  const campaigns = additionData.campaigns.filter((data) => data.id === playerId)[0].campaigns;

  const campaignsUploadingStatusSammary: number = campaigns
    .reduce((acc: number, item) => acc + item.uploadingStatus, 0);

  const percent = !campaignsUploadingStatusSammary || !campaigns.length
    ? 0
    : campaignsUploadingStatusSammary / campaigns.length;

  const percentString: string = Intl.NumberFormat(
    undefined,
    {
      style: 'percent',
      maximumFractionDigits: 2,
    },
  ).format(percent / 100);

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      sx={{ width: width }}
      align={align}
    >
      <Typography variant="caption">
        {percentString}
      </Typography>
    </TableCell>
  );
};

export default memo(PlayerUploadingStatus);
