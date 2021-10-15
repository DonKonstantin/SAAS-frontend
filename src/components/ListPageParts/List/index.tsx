import {FC} from "react";
import {Table, TableContainer} from "@mui/material";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";

// Свойства компонента
type ListProps = {
    checkedItems: any[]
    onChangeCheckedItems: { (callback: { (items: any[]): any[] }): void }
}

// Компонент вывода таблицы листинга
const List: FC<ListProps> = props => {
    return (
        <TableContainer>
            <Table>
                <ListHeader {...props} />
                <ListBody {...props} />
            </Table>
        </TableContainer>
    )
}

// Экспортируем компонент
export default List