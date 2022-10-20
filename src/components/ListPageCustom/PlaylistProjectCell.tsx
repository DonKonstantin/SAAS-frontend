import { TableCell } from "@mui/material";
import columnDirection from "components/ListPageParts/List/helpers/columnDirection";
import { useEntityList } from "context/EntityListContext";
import React, { FC, memo } from "react";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";

/**
 * Компонент ячейки названия проекта для листинга плэйлистов
 * @param props 
 * @returns 
 */
const PlaylistProjectCell: FC<ListFieldProperties<SimpleValues>> = props => {
  const {schema, value, configuration} = props;

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

  const projectName = additionData.playlistProjects?.find(project => project.id === value.value);

  return (
    <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
      {!projectName ? '' : projectName.name}
    </TableCell>
  );
};

export default memo(PlaylistProjectCell);
