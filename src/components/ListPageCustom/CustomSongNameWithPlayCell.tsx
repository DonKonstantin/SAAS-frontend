import React, { FC } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import PlayAudioButton from "../AudioPlayeContainer/PlayAudioButton";

/**
 * Компонент вывода простой ячейки
 * @param props
 * @returns
 */
const CustomSongNameWithPlayCell: FC<ListFieldProperties<SimpleValues>> = props => {
  const { schema, configuration, value, rowValues } = props;

  const {
    align = columnDirection(schema, configuration),
    width,
    padding
  } = configuration;

  if (value === undefined) {
    return <></>
  }

  return (
    <TableCell className="list-table-cell" padding={padding} style={{ width: width }} align={align}>
      <PlayAudioButton
        fileName={value.value}
        songName={rowValues.title.value}
        isProject={false}
      />
    </TableCell>
  )
}

// Экспортируем компонент
export default CustomSongNameWithPlayCell
