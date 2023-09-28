import { IconButton, TableCell, Tooltip } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React, { FC } from "react";
import { ListFieldProperties } from "../../../services/listDataLoader/listLoader/types";
import { SimpleValues } from "../../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { setOpenRows, useOpenRows } from "./openSubrowContext";
import { useEntityList } from "context/EntityListContext";
import { PlayerDetails } from "services/playerList/interfaces";

/**
 * Компонент ячейки названия плеера с кнопкой открытия подстрок для листинга плееров на странице проекта
 * @param props
 * @returns
 */
const NameWithToggleCell: FC<ListFieldProperties<SimpleValues>> = (props) => {
  const { value, configuration, rowValues } = props;

  const { data } = useEntityList();

  if (!data) {
    return null;
  }

  const { currentData: { additionData } } = data;

  const rowId: string = rowValues.id.value;

  const campaigns: PlayerDetails[] = additionData.campaigns
    .filter((item: PlayerDetails) => item.id === rowId)[0].campaigns;

  const { padding, width, align } = configuration;

  const openRows = useOpenRows();

  const open = openRows.includes(rowId);

  const hasSubRows = campaigns.length === 0;

  const toggleHandler = () => {
    if (open) {
      setOpenRows(openRows.filter(id => id !== rowId));

      return;
    }

    setOpenRows([...openRows, rowId]);
  }

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      style={{ width }}
      align={align}
    >
      {value.value}

      <Tooltip title="">
        <IconButton onClick={toggleHandler} disabled={hasSubRows} sx={{ marginY: '-9px' }}>
          <ArrowDropUpIcon
            sx={{ transform: `rotate(${open ? 180 : 0}deg)` }}
          />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
}

export default NameWithToggleCell