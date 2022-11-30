import { TableCell } from "@mui/material";
import columnDirection from "components/ListPageParts/List/helpers/columnDirection";
import { useEntityList } from "context/EntityListContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";

/**
 * Компонент ячейки названия проекта для листинга плэйлистов
 * @param props 
 * @returns 
 */
const PlaylistCampaignsCell: FC<ListFieldProperties<SimpleValues>> = props => {
  const {schema, value, configuration} = props;

  const { t } = useTranslation();

  const {
      align = columnDirection(schema, configuration),
      width,
      padding
  } = configuration;

  const {data} = useEntityList();

  if (!data) {
    return null
  }

  const {currentData: {additionData}} = data;

  if (!additionData) {
    return null
  }

  const campaigns = additionData.playlistCampaigns?.find(project => project.id === value.value).campaigns;
  
  const campaignsString = campaigns.map(c => c.name).join(", ");

  return (
    <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
      {!campaignsString ? t('project-playlists.list.no-campaigns') : campaignsString}
    </TableCell>
  );
};

export default memo(PlaylistCampaignsCell);
