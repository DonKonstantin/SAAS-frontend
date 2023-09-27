import React, { FC, memo } from "react";
import {Table, TableContainer} from "@mui/material";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";
import { ListHeaderCellType } from "./types";
import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";

interface Props {
  checkedItems: any[];
  sort: SortType;
  tableRows: any[];
  headerCells: Omit<ListHeaderCellType, "setSort" | "sorted">[];
  rowCellsComponent: FC<any>;
  setSort: (params: SortType) => void;
  onChangeCheckedItems: (items: any[]) => void;
};

/**
 * Компонент кастомного листинга
 * @param props
 * @returns
 */
const List: FC<Props> = (props) => {
  const {
    checkedItems,
    tableRows,
    headerCells,
    sort,
    rowCellsComponent,
    onChangeCheckedItems,
    setSort,
  } = props;

  const headerCellsWithSort: ListHeaderCellType[] = headerCells.map(cell => ({
    ...cell,
    sorted: sort.column === cell.name ? sort.direction : undefined,
    setSort,
  }))

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed' }}>
        <ListHeader
          rows={tableRows}
          checkedItems={checkedItems}
          headerCells={headerCellsWithSort}
          onChangeCheckedItems={onChangeCheckedItems}
        />

        <ListBody
          rows={tableRows}
          checkedItems={checkedItems}
          rowCellsComponent={rowCellsComponent}
          onChangeCheckedItems={onChangeCheckedItems}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(List);
