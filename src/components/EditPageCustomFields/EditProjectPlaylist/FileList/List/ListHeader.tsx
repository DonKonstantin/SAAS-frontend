import React, { FC, memo } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";

export type SortDirection = "desc" | "asc";

interface Props {
  direction: SortDirection;
  rows: ProjectPlayListFile[];
  selected: any[];
  setSelected: (values: any[]) => void;
  setDirection: (direction: SortDirection) => void;
}

/**
 * Компонент заголовка списка файлов на странице редактирования плэйлиста
 * @param param0 
 * @returns 
 */
const ListHeader: FC<Props> = ({ direction, selected, rows, setSelected, setDirection }) => {
  const { t } = useTranslation();

  const allPrimaryKeys = rows.map((r) => r.id);

  const isAllItemsSelected = allPrimaryKeys.length === selected.length;

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState = () => {
    setSelected(isAllItemsSelected ? [] : allPrimaryKeys);
  };

  const handleChangeOrder = () => {
    setDirection(direction === 'desc' ? 'asc' : 'desc');
  };

  return (
    <TableHead>
      <TableRow>
        <CheckBoxCell
          isHeader={true}
          indeterminate={!isAllItemsSelected && selected.length > 0}
          checked={isAllItemsSelected && allPrimaryKeys.length > 0}
          onChange={onToggleItemCheckedState}
        />
        <TableCell className="list-table-cell" sx={{minWidth: 160, fontSize: 12}}>
          <Tooltip title={t(`project-playlists.edit.list.sort.${direction}`) as string}>
            <TableSortLabel
              active={true}
              direction={direction}
              onClick={handleChangeOrder}
            >
              {t("project-playlists.edit.list.header.track-name")}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
        <TableCell className="list-table-cell" width={60} />
        <TableCell className="list-table-cell" width={'100%'}/>
        <TableCell className="list-table-cell" width={130} />
      </TableRow>
    </TableHead>
  );
};

export default memo(ListHeader);
