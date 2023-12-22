import React, { FC } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import TableCell from "@mui/material/TableCell";
import type { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import columnDirection from "components/ListPageParts/List/helpers/columnDirection";

/**
 * Компонент ячейки активности кампании
 * @param props
 * @returns
 */
const CampaignIsActiveCell: FC<ListFieldProperties<SimpleValues>> = props => {
  const { schema, configuration, value } = props;
  
  const {
    align = columnDirection(schema, configuration),
    width,
    padding
  } = configuration;

  const { t } = useTranslation();

  const status = value.value;

  return (
    <TableCell className="list-table-cell" padding={padding} style={{ width: width }} align={align}>
      <span className={clsx("custom-active-cell", { active: !!status })}>
        {t(
          `pages.users.list.fields.active-status.${
            !!value.value ? "active" : "inactive"
          }`
        )}
      </span>
    </TableCell>
  );
};

export default CampaignIsActiveCell;
