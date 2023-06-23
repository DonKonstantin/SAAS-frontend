import React, { FC, useEffect, useState } from "react";
import ListRow, { ListRowProps } from "./ListRow";
import EntityListHoc from "../../../../context/EntityListContext";
import { listSchemaConfiguration } from "../../../../settings/pages";
import { TableRow } from "@mui/material";
import { ListPageConfiguration } from "../../../../settings/pages/system/list";

// Компонент вывода контекнера строки со всеми дополнительными компонентами
const ListRowContainer: FC<ListRowProps> = (props) => {
  const { data, row, onChangeCheckedItems } = props;
  const [config, setConfig] = useState<ListPageConfiguration>();
  useEffect(() => {
    if (!data) {
      return;
    }

    const { schema } = data;
    setConfig(listSchemaConfiguration()[schema]);
  }, [data?.schema]);

  if (!data || !config) {
    return null;
  }

  const {
    listFields: { rowBelow: PrevRow, rowHigher: NextRow },
    customRow: CustomRow,
  } = config;

  // Переключение состояния чекбокса выбора элемента
  const onToggleItemCheckedState = () => {
    if (!config.rowSelectAction) {
      return;
    }
    onChangeCheckedItems((items) => {
      if (items.includes(row.primaryKeyValue)) {
        return items.filter((i) => i !== row.primaryKeyValue);
      }

      return [...items, row.primaryKeyValue];
    });
  };

  return (
    <>
      {!!PrevRow && <PrevRow item={row} />}
      {CustomRow ? (
        <CustomRow {...props} />
      ) : (
        <TableRow
          hover
          tabIndex={-1}
          onClick={onToggleItemCheckedState}
          sx={{ height: "55px" }}
          data-testid="listRow"
        >
          <ListRow {...props} />
        </TableRow>
      )}

      {!!NextRow && <NextRow item={row} />}
    </>
  );
};

// Экспортируем компонент
export default EntityListHoc()(ListRowContainer);
