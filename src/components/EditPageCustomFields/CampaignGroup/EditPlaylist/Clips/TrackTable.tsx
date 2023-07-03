import React, { FC, memo, useState } from "react";
import { Table, TableContainer } from "@mui/material";
import TableHeader from "./TableHeader";
import TableBodyComponent from "./TableBodyComponent";
import { CampaignPlayListFileType } from "services/campaignListService/types";

interface Props {
  selected: string[];
  rows: CampaignPlayListFileType[];
  setSelected: (selected: string[]) => void;
}

export type TableColumnSortType = "asc" | "desc";

/**
 * Компонент таблицы загруженных треков
 * @param param0
 * @returns
 */
const TrackTable: FC<Props> = ({ rows, selected, setSelected }) => {
  const [sort, setSort] = useState<TableColumnSortType>("asc");

  return (
    <TableContainer>
      <Table>
        <TableHeader
          selected={selected}
          setSelected={setSelected}
          rows={rows}
          sort={sort}
          setSort={setSort}
        />
        <TableBodyComponent
          rows={rows}
          selected={selected}
          setSelected={setSelected}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(TrackTable);
