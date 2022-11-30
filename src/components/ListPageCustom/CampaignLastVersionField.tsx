import React, {FC, useEffect, useState} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {Box, TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import {useTranslation} from "react-i18next";
import {useEntityList} from "../../context/EntityListContext";

// Компонент вывода простой ячейки
const CampaignLastVersionField: FC<ListFieldProperties<SimpleValues>> = props => {
  const { schema, configuration, value, rowValues } = props;
  const {
    align = columnDirection(schema, configuration),
    width,
    padding
  } = configuration

  const { t } = useTranslation()

  const { data } = useEntityList()

  if (!data) {
    return null
  }

  const { currentData: { additionData } } = data
  if (!additionData) {
    return null
  }

  const [lastVersion, setLastVersion] = useState<boolean>(false);

  useEffect(() => {
    if (!value.value || !rowValues.id.value || !additionData) {
      return
    }

    const checkForLastVersion = additionData
      .map(channel => channel.channels)
      .flat()
      .filter(channel => channel.campaign_id === rowValues.id.value)
      .every(channel => channel.version === value.value)

    setLastVersion(checkForLastVersion)
  }, [rowValues.id.value, value.value, additionData])

  return (
    <TableCell className="list-table-cell" padding={padding} style={{ width: width }} align={align}>
      <Box sx={{ textAlign: align }}>
        {t(`pages.campaign.list.last-version.${lastVersion ? "yes" : "no"}`)}
      </Box>
    </TableCell>
  )
}

// Экспортируем компонент
export default CampaignLastVersionField