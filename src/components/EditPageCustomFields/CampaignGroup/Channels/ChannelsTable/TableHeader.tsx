import React, { FC } from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { styled } from "@mui/system";
import { SortType } from "../types";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  rows: ProjectChannel[];
  checkedItems: string[];
  sort: SortType;
  setSort: (sort: SortType) => void;
  onChangeCheckedItems: (checkedItems: string[]) => void;
}

const StyledHeaderCell = styled(TableCell)<{
  cellWidth: string;
  cellAlign: any;
}>(({ cellWidth, cellAlign }) => ({
  textAlign: cellAlign,
  width: cellWidth,
  fontSize: 12,
  color: "#393535",
  flexDirection: "row-reverse",
}));

const headers = [
  {
    column: "name",
    title: "pages.campaign.edit.fields.channels.table.header.name",
    align: "left",
    width: "40%",
  },
  {
    column: "isActive",
    title: "pages.campaign.edit.fields.channels.table.header.status",
    align: "left",
    width: "40%",
  },
  {
    column: "playersCount",
    title: "pages.campaign.edit.fields.channels.table.header.players_count",
    align: "right",
    width: "40%",
  },
];

/**
 * Компонент заголовков таблицы каналов вкладки каналов на странице редактирования кампании
 * @param param0
 * @returns
 */
const TableHeader: FC<Props> = ({
  rows,
  checkedItems,
  sort,
  setSort,
  onChangeCheckedItems,
}) => {
  const { t } = useTranslation();

  const allPrimaryKeys = rows.map((row) => row.id!);

  const isAllItemsSelected = allPrimaryKeys.length === checkedItems.length;

  const onToggleItemCheckedState = (checked: boolean) => {
    checked ? 
      onChangeCheckedItems(allPrimaryKeys)
      :
      onChangeCheckedItems([])
  };

  const onSortClickHandler = (column: string) => {
    const dir =
      sort.column === column
        ? sort.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSort({ column, direction: dir });
  };

  return (
    <TableHead>
      <TableRow>
        <CheckBoxCell
          isHeader={true}
          indeterminate={!isAllItemsSelected && checkedItems.length > 0}
          checked={isAllItemsSelected && allPrimaryKeys.length > 0}
          onChange={(_, checked) => onToggleItemCheckedState(checked)}
        />
        {headers.map((props) => (
          <StyledHeaderCell
            key={props.title}
            cellWidth={props.width}
            cellAlign={props.align}
          >
            <TableSortLabel
              active={sort.column === props.column}
              direction={sort.column === props.column ? sort.direction : "asc"}
              onClick={() => onSortClickHandler(props.column)}
            >
              {t(props.title)}
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
