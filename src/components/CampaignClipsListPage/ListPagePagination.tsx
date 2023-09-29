import React, { FC } from "react";
import { TablePagination } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

interface Props {
  listPage: number;
  limit: number;
  rowsCount: number;
  onChangeListPage: (pageCount: number) => void;
  onChangeLimit: (limit: number) => void;
}

/**
 * Компонент пагенации для листинга роликов проекта
 * @param props
 * @returns
 */
const ListPagePagination: FC<Props> = (props) => {
  const {
    listPage,
    limit,
    rowsCount,
    onChangeListPage,
    onChangeLimit,
  } = props;

  const { t } = useTranslation();

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      classes={{
        spacer: "disable-spacer"
      }}
      count={rowsCount}
      rowsPerPage={limit}
      labelRowsPerPage={t(`entity-list.components.pagination.rows-per-page`) as string}
      labelDisplayedRows={({ from, to, count, page }) => (
        <Trans
          i18nKey="entity-list.components.pagination.items-quantity"
          values={{ page: page + 1, from, to, count }}
        >
          Страница {{ page }}: {{ from }} - {{ to }} из {{ count }}
        </Trans>
      )}
      page={listPage}
      onPageChange={(_, p) => onChangeListPage(p)}
      onRowsPerPageChange={event => onChangeLimit(parseInt(event.target.value, 10))}
    />
  );
};

export default ListPagePagination;