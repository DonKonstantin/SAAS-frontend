import { TablePagination } from "@mui/material";
import React, { FC, memo } from "react";
import { Trans, useTranslation } from "react-i18next";

interface Props {
  count: number;
  limit: number;
  offset: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
}

/**
 * Компонент пагинации листинга канадов на странице редактирования кампании
 * @param param0 
 * @returns 
 */
const Pagination: FC<Props> = ({
  count,
  limit,
  offset,
  setLimit,
  setOffset,
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
      onPageChange={(_, p) => setOffset(limit * p)}
      onRowsPerPageChange={(event) =>
        setLimit(parseInt(event.target.value, 10))
      }
    />
  );
};

export default memo(Pagination);
