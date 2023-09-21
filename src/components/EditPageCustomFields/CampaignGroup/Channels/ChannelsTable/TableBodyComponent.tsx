import React, { FC } from "react";
import { TableBody } from "@mui/material";
import ChannelRow from "./ChannelRow";
import {CampaignChannels, ProjectChannel} from "services/playerCodeService/interfaces";
import { TableLoader } from "components/TableLoader";

interface Props {
  rows: ProjectChannel[] | CampaignChannels[];
  checkedItems: string[];
  isChannelsLoading: boolean;
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
  isChannelsLoading,
  onChangeCheckedItems,
}) => {
  return (
    <TableBody>
      {isChannelsLoading && (
        <TableLoader colCount={4}/>
      )}

      {!isChannelsLoading && rows.map((row) => (
        <ChannelRow
          key={row.id}
          row={row}
          checkedItems={checkedItems}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      ))}
      {}
    </TableBody>
  );
};

export default TableBodyComponent;
