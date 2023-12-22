import React, { FC } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import type { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import { useTranslation } from "react-i18next";

/**
 * Is campaign last version cell component
 */
const CampaignLastVersionField: FC<ListFieldProperties<SimpleValues>> = props => {
  const { schema, configuration, value } = props;

  const {
    align = columnDirection(schema, configuration),
    width,
    padding
  } = configuration;

  const { t } = useTranslation();

  return (
    <TableCell className="list-table-cell" padding={padding} style={{ width: width }} align={align}>
      <Box sx={{ textAlign: align }}>
        {t(`pages.campaign.list.last-version.${value.value ? "yes" : "no"}`)}
      </Box>
    </TableCell>
  );
};

export default CampaignLastVersionField;