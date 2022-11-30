import { Table, TableContainer } from "@mui/material";
import React, { FC, memo } from "react";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import { SortType } from "../types";
import TableBodyComponent from "./TableBodyComponent";
import TableHeader from "./TableHeader";

interface Props {
  rows: ProjectChannel[];
  checkedItems: string[];
  sort: SortType;
  limit: number;
  offset: number;
  setSort: (sort: SortType) => void;
  onChangeCheckedItems: (checkedItems: string[]) => void;
}

/**
 * Коипонент таблицы на странице редактирования кампании
 * @param param0 
 * @returns 
 */
const ChannelsTable: FC<Props> = ({
  rows,
  checkedItems,
  sort,
  limit,
  offset,
  setSort,
  onChangeCheckedItems,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader
          sort={sort}
          setSort={setSort}
          checkedItems={checkedItems}
          rows={rows.slice(offset, offset + limit)}
          onChangeCheckedItems={onChangeCheckedItems}
        />
        <TableBodyComponent
          checkedItems={checkedItems}
          rows={rows.slice(offset, offset + limit)}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(ChannelsTable);
