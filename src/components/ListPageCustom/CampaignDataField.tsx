import React, { FC } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import dayjs from "dayjs";

// Компонент вывода простой ячейки
const CampaignDataField: FC<ListFieldProperties<SimpleValues>> = props => {
  const { schema, configuration, value } = props;
  const {
    align = columnDirection(schema, configuration),
    width,
    padding
  } = configuration

  return (
    <TableCell className="list-table-cell" padding={padding} style={{ width: width }} align={align}>
      {dayjs(value.value).format("DD.MM.YYYY")}
    </TableCell>
  )
}

// Экспортируем компонент
export default CampaignDataField