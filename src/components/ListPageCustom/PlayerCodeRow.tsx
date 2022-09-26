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
import { IconButton, TableCell, Collapse, TableRow, Table } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const PlayerCodeRow: FC<ListRowProps> = (props) => {
  const { data, row, checkedItems, onChangeCheckedItems } = props;

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

  if (!data || !config) {
    return null;
  }

  const {
    schema,
    currentData: {
      parameters: {
        listConfiguration: { fields },
      },
    },
  } = data;

  const { disableMultiChoose = false, listFields } = config;

  const { actions: ActionsComponent } = listFields;

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

  console.log(row, "Fields");

  return (
    <Fragment>
      <TableRow>
        <CheckBoxCell
          checked={checkedItems.includes(row.primaryKeyValue)}
          onClick={onToggleItemCheckedState}
        />
        <TableCell
          sx={{
            width: fields.code.width,
            display: "flex",
            alignItems: "center",
          }}
        >
          {row.columnValues.code.value}
          <IconButton onClick={openHandler}>
            <ArrowDropUpIcon
              sx={{ transform: `rotate(${open ? 180 : 0}deg)` }}
            />
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <ListPageEditDeleteButtons item={row} />
      </TableRow>
      <Collapse in={open}>
        <TableRow>
          <Table>
            
          </Table>
        </TableRow>
      </Collapse>
    </Fragment>
  );
};

export default memo(PlayerCodeRow);
