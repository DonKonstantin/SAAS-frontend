import React, { FC, memo } from "react";
import { TablePagination } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

interface Props {
  offset: number;
  limit: number;
  count: number;
  onChangeOffset: (value: number) => void;
  onChangeLimit: (value: number) => void;
}

// Компонент пагенации для таблицы
const ListPagination: FC<Props> = ({
  offset,
  limit,
  count,
  onChangeOffset,
  onChangeLimit,
}) => {
  const { t } = useTranslation();

  const page = Math.ceil(offset / limit);

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      classes={{
        spacer: "disable-spacer",
      }}
      count={count}
      rowsPerPage={limit}
      labelRowsPerPage={
        t(`entity-list.components.pagination.rows-per-page`) as string
      }
      labelDisplayedRows={({ from, to, count, page }) => (
        <Trans
          i18nKey="entity-list.components.pagination.items-quantity"
          values={{ page: page + 1, from, to, count }}
        >
          Страница {{ page }}: {{ from }} - {{ to }} из {{ count }}
        </Trans>
      )}
      page={page}
      onPageChange={(_, p) => onChangeOffset(limit * p)}
      onRowsPerPageChange={(event) =>
        onChangeLimit(parseInt(event.target.value, 10))
      }
    />
  );
};

// Экспортируем компонент
export default memo(ListPagination);
