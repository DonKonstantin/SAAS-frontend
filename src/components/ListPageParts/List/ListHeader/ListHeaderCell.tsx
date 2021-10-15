import {ListCellsProps} from "../ListBody/ListCells";
import {FC} from "react";
import ListHeaderCellWithoutOrder from "./ListHeaderCellWithoutOrder";
import ListHeaderCellWithOrder from "./ListHeaderCellWithOrder";

// Свойства компонента
type ListHeaderCellProps = Omit<ListCellsProps<any>, "value" | "rowValues">

// Компонент вывода ячейки заголовочной части таблицы
const ListHeaderCell: FC<ListHeaderCellProps> = props => {
    const {configuration: {fieldType: {type}}} = props
    if (type === "Simple") {
        return <ListHeaderCellWithOrder {...props} />
    }

    return <ListHeaderCellWithoutOrder {...props} />
}

// Экспортируем компонент
export default ListHeaderCell