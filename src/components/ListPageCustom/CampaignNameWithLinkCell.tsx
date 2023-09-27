import React, { FC, MouseEventHandler, useRef } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { Box, TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import { useEntityList } from "context/EntityListContext";
import { listSchemaConfiguration } from "settings/pages";
import { useRouter } from "next/router";

/**
 * Компонент ячейки названия кампании со ссылкой на редактирование
 * @param props
 * @returns
 */
const CampaignNameWithLinkCell: FC<ListFieldProperties<SimpleValues>> = ({
  value,
}) => {
  const { data } = useEntityList();

  const { push } = useRouter();

  const config = useRef(listSchemaConfiguration()['campaign']);

  if (!data || !config.current) {
    return null;
  }

  const { editPageUrl } = config.current;

  const {
    currentData: { rows },
  } = data;

  const row = rows.find((r) => r.columnValues.name.value === value.value);

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!row) {
      return
    }

    const url = editPageUrl(row.primaryKeyValue);

    return push(url.href, url.as);
  };

  return (
    <TableCell className="list-table-cell" sx={{ textAlign: 'left' }}>
      <Box sx={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={onClickHandler}>
        {row?.columnValues.name.value}
      </Box>
    </TableCell>
  );
};

export default CampaignNameWithLinkCell;
