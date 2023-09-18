import React, {FC} from "react";
import EntityListHoc, {WithEntityListHoc} from "../../../../context/EntityListContext";
import {ListCellsProps} from "../ListBody/ListCells";
import columnDirection from "../helpers/columnDirection";
import {TableCell, Tooltip} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import {useTranslation} from "react-i18next";
import { visuallyHidden } from '@mui/utils';
import {Box} from "@mui/system";

// Свойства компонента
type ListHeaderCellProps = WithEntityListHoc<Omit<ListCellsProps<any>, "value" | "rowValues">>

// Компонент вывода ячейки заголовочной части таблицы
const ListHeaderCellWithOrder: FC<ListHeaderCellProps> = props => {
    const {
        data,
        schema,
        onChangeOrder,
        configuration
    } = props

    const {t} = useTranslation()

    if (!data) {
        return null
    }

    const {currentData: {parameters: {order}}} = data
    const {
        align = columnDirection(schema, configuration),
        width,
        padding,
        field,
        title,
        isSortable,
        dedicatedSortType,
    } = configuration

    const usedOrder = order.find(o => o.by === field)

    // Текст сортировки
    const sortText = `entity-list.components.list.header.order-tooltip.${usedOrder?.direction || "default"}`

    // Обработка изменения сортировки
    const handleChangeOrder = () => {
        const sortedOrders = order.sort((a, b) => a.priority - b.priority)

        // Если сортировка не включена, то добавляем ее
        if (!usedOrder) {
            return onChangeOrder([...sortedOrders, {
                by: field,
                direction: "asc",
                priority: sortedOrders.length + 1
            }])
        }

        // Если сортировка по убыванию, то надо отключить эту сортировку
        if (!!usedOrder && usedOrder.direction === "desc") {
            return onChangeOrder(
                sortedOrders
                    .filter(o => o.by !== field)
                    .map((o, i) => ({...o, priority: i+1}))
            )
        }

        // Меняем направление сортировки
        onChangeOrder(sortedOrders.map(order => {
            if (order.by !== field) {
                return order
            }

            return {...order, direction: "desc"}
        }))
    }

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <Tooltip title={t(sortText) as string}>
                <TableSortLabel
                    active={!!usedOrder}
                    direction={usedOrder?.direction || 'asc'}
                    onClick={handleChangeOrder}
                >
                    {t(title)}
                    {!!usedOrder && (
                        <Box component="span" sx={visuallyHidden}>
                            {t(`entity-list.components.list.header.order.${usedOrder.direction}`)}
                        </Box>
                    )}
                </TableSortLabel>
            </Tooltip>
        </TableCell>
    )
}

// Экспортируем компонент
export default EntityListHoc()(ListHeaderCellWithOrder)