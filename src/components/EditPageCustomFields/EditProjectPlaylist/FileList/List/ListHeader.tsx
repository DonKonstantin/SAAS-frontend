import React, { FC, memo } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  direction: "desc" | "asc" | undefined;
}

const ListHeader: FC<Props> = ({ direction }) => {
  const { t } = useTranslation();

  const sortText = `entity-list.components.list.header.order-tooltip.${
    direction || "default"
  }`;

  const handleChangeOrder = () => {};

  return (
    <TableHead>
      <TableRow>
        <TableCell className="list-table-cell">
          <Tooltip title={t(sortText) as string}>
            <TableSortLabel
              active={true}
              direction={direction || "asc"}
              onClick={handleChangeOrder}
            >
              {t("project-playlists.edit.list.header.track-name")}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
        <TableCell className="list-table-cell" width={160}>
          {t("project-playlists.edit.list.header.track-name")}
        </TableCell>
        <TableCell className="list-table-cell" width={60} />
        <TableCell className="list-table-cell" width={150} />
        <TableCell className="list-table-cell" />
        <TableCell className="list-table-cell" width={130} />
      </TableRow>
    </TableHead>
  );
};

export default memo(ListHeader);
