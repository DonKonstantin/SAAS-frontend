import React, { FC, memo } from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";

const TableHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <TableHead sx={{ borderTop: "1px solid #E0E0E0" }}>
      <TableRow>
        <TableCell width={38}/>
        <TableCell width={200} sx={{ color: '#393535', fontWeight: 400, fontSize: 12 }}>
          {t('edit-campaign-playlist.table.header.track-name')}
        </TableCell>
        <TableCell/>
        <TableCell width={38}/>
      </TableRow>
    </TableHead>
  );
};

export default memo(TableHeader);
