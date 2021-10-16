import {FC} from "react";
import {useEntityList} from "../../context/EntityListContext";
import {auditTime} from "rxjs";
import {TablePagination} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";

// Компонент пагенации для таблицы
const ListPagePagination: FC = () => {
    const {t} = useTranslation()
    const {data, onChangeOffset, onChangeLimit} = useEntityList(auditTime(100))
    if (!data) {
        return null
    }
    
    const {
        currentData: {
            count = 0,
            parameters: {
                limit,
                offset,
            }
        }
    } = data

    const page = Math.ceil(offset / limit);
    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            classes={{
                spacer: "disable-spacer"
            }}
            count={count}
            rowsPerPage={limit}
            labelRowsPerPage={t(`entity-list.components.pagination.rows-per-page`) as string}
            labelDisplayedRows={({from, to, count, page}) => (
                <Trans
                    i18nKey="entity-list.components.pagination.items-quantity"
                    values={{page: page + 1, from, to, count}}
                >
                    Страница {{page}}: {{from}} - {{to}} из {{count}}
                </Trans>
            )}
            page={page}
            onPageChange={(_, p) => onChangeOffset(limit * p)}
            onRowsPerPageChange={event => onChangeLimit(parseInt(event.target.value, 10))}
        />
    )
}

// Экспортируем компонент
export default ListPagePagination