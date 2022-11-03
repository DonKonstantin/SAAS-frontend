import React, { FC, memo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Копонент пустой строки для таблицы треков рлэйлиста
 * @returns
 */
const EmptyRow: FC = () => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell colSpan={4} sx={{ textAlign: "center", opacity: 0.5 }}>
        {t("edit-campaign-playlist.table.empty-track-row")}
      </TableCell>
    </TableRow>
  );
};

export default memo(EmptyRow);
