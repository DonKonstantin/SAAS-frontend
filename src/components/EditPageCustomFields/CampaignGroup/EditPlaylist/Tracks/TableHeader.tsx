import React, { FC, memo } from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

const StyledNameCell = styled(TableCell)({
  width: 200,
  color: "#393535",
  fontWeight: 400,
  fontSize: 12,
});

/**
 * Компонент заголовка таблицы треков плэйлиста
 * @returns
 */
const TableHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <TableHead sx={{ borderTop: "1px solid #E0E0E0" }}>
      <TableRow>
        <TableCell width={38} />
        <StyledNameCell>
          {t("edit-campaign-playlist.table.header.track-name")}
        </StyledNameCell>
        <TableCell />
        <TableCell width={38} />
      </TableRow>
    </TableHead>
  );
};

export default memo(TableHeader);
