import React, { FC, memo } from "react";
import { TableBody } from "@mui/material";
import ChannelRow from "./ChannelRow";
import { ProjectChannel } from "services/playerCodeService/interfaces";

interface Props {
  rows: ProjectChannel[];
  checkedItems: string[];
  onChangeCheckedItems: (checkedItems: string[]) => void;
}

/**
 * Коипонент тела таблицы на странице редактирования кампании
 * @param param0 
 * @returns 
 */
const TableBodyComponent: FC<Props> = ({
  rows,
  checkedItems,
  onChangeCheckedItems,
}) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <ChannelRow
          key={row.id}
          row={row}
          checkedItems={checkedItems}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      ))}
    </TableBody>
  );
};

export default memo(TableBodyComponent);
