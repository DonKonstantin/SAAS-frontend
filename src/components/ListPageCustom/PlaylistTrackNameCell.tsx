import { TableCell } from "@mui/material";
import columnDirection from "components/ListPageParts/List/helpers/columnDirection";
import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";

/**
 * Компонент ячейки названия проекта для листинга плэйлистов
 * @param props 
 * @returns 
 */
const PlaylistTrackNameCell: FC<ListFieldProperties<SimpleValues>> = props => {
  const {schema, value, configuration} = props;

  const {
      align = columnDirection(schema, configuration),
      width,
      padding
  } = configuration;

  return (
    <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
      sss {value.value}
    </TableCell>
  );
};

export default memo(PlaylistTrackNameCell);
