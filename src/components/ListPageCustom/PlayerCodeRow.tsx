import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { ListRowProps } from "components/ListPageParts/List/ListBody/ListRow";
import React, {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { listSchemaConfiguration } from "settings/pages";
import { ListPageConfiguration } from "settings/pages/system/list";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import {
  IconButton,
  TableCell,
  Collapse,
  TableRow,
  Table,
  Tooltip,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useEntityList } from "context/EntityListContext";
import { PlayerWithoutRelations } from "services/playerCodeService/interfaces";
import PlayerCodeSubRow from "./PlayerCodeSubRow";
import CustomActiveCell from "./CustomActiveCell";

/**
 * Кастомноая строка для листинга кодов плеера
 * @param props
 * @returns
 */
const PlayerCodeRow: FC<ListRowProps> = (props) => {
  const { data, row, checkedItems, onChangeCheckedItems } = props;

  const contextData = useEntityList();

  const [config, setConfig] = useState<ListPageConfiguration>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    const { schema } = data;
    setConfig(listSchemaConfiguration()[schema]);
  }, [data?.schema]);

  const openHandler = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  if (!data || !config || !contextData) {
    return null;
  }

  const {
    currentData: { additionData },
  } = data;

  const subRowsData: PlayerWithoutRelations[] =
    additionData?.player_code?.filter(
      (item) => item.code === row.primaryKeyValue
    )[0].players || [];

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState: SwitchBaseProps["onClick"] = (event) => {
    event.stopPropagation();

    onChangeCheckedItems((items) => {
      if (items.includes(row.primaryKeyValue)) {
        return items.filter((i) => i !== row.primaryKeyValue);
      }

      return [...items, row.primaryKeyValue];
    });
  };

  return (
    <Fragment>
      <TableRow>
        <CheckBoxCell
          checked={checkedItems.includes(row.primaryKeyValue)}
          onClick={onToggleItemCheckedState}
        />
        <TableCell className="list-table-cell" padding="checkbox">
          {row.columnValues.code.value}
          <Tooltip title="">
            <IconButton onClick={openHandler} disabled={!subRowsData.length}>
              <ArrowDropUpIcon
                sx={{ transform: `rotate(${open ? 180 : 0}deg)` }}
              />
            </IconButton>
          </Tooltip>
        </TableCell>
        <CustomActiveCell
          schema="player_code"
          value={{
            value: row.columnValues.is_active.value,
          }}
          rowValues={[]}
          configuration={
            listSchemaConfiguration()["player_code"]?.listFields.fields[
              "is_active"
            ]!
          }
          primaryKeyValue={""}
        />
        <ListPageEditDeleteButtons item={row} />
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0, border: 0 }} colSpan={4}>
          <Collapse in={open}>
            <Table>
              {subRowsData.map((subRow) => (
                <PlayerCodeSubRow row={subRow} />
              ))}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default memo(PlayerCodeRow);
