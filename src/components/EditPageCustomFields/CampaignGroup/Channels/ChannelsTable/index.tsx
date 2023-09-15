import { Table, TableContainer } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import { SortType } from "../types";
import TableBodyComponent from "./TableBodyComponent";
import TableHeader from "./TableHeader";

interface Props {
  rows: ProjectChannel[];
  checkedItems: string[];
  isChannelsLoading: boolean;
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
  isChannelsLoading,
  onChangeCheckedItems,
}) => {
  const [sort, setSort] = useState<SortType>({
    column: "name",
    direction: "asc",
  });

  const [sortedRows, setSortedRows] = useState<ProjectChannel[]>([]);

  useEffect(() => {
    let localRows: ProjectChannel[] = [];

    if (sort.column === "name") {
      localRows = rows.sort((a, b) => {
        const aValue = a.name;
        const bValue = b.name;

        return bValue.localeCompare(aValue);
      });
    }

    if (sort.column === "isActive") {
      localRows = rows.sort((a, b) => {
        const aValue = a.is_active;
        const bValue = b.is_active;

        return aValue === bValue ? 0 : aValue ? -1 : 1;
      });
    }

    if (sort.column === "playersCount") {
      localRows = rows.sort((a, b) => {
        const aValue = a.players?.length!;
        const bValue = b.players?.length!;

        return aValue - bValue;
      });
    }

    setSortedRows(sort.direction === "asc" ? localRows.reverse() : localRows);
  }, [rows, sort, setSortedRows]);

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  return (
    <TableContainer>
      <Table>
        <TableHeader
          sort={sort}
          setSort={setSort}
          checkedItems={checkedItems}
          rows={sortedRows}
          onChangeCheckedItems={onChangeCheckedItems}
        />
        
        <TableBodyComponent
          checkedItems={checkedItems}
          rows={sortedRows}
          isChannelsLoading={isChannelsLoading}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(ChannelsTable);
