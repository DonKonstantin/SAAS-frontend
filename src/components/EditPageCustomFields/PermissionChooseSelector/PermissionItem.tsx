import {FC} from "react";
import {PermissionData} from "../../../services/loaders/allPermissions/LoaderQuery";
import {Checkbox, TableCell, TableRow} from "@mui/material";
import clsx from "clsx";

// Свойства компонента
type PermissionItemProps = {
    permission: PermissionData
    isSelected: boolean
    isLast: boolean
    onChange: {(): void}
}

// Компонент вывода строки таблицы с правом доступа
const PermissionItem: FC<PermissionItemProps> = props => {
    const {
        permission,
        isSelected,
        isLast,
        onChange
    } = props
    return (
        <TableRow
            hover
            onClick={onChange}
            role="checkbox"
        >
            <TableCell
                className={clsx(
                    "permission-choose-tree-item",
                    {"list-table-cell": isLast},
                    {"inner": !isLast}
                )}
                padding="none"
            />
            <TableCell className="list-table-cell" padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isSelected}
                />
            </TableCell>
            <TableCell className="list-table-cell" sx={{pl: 1}}>
                {permission.name}
            </TableCell>
        </TableRow>
    )
}

// Экспортируем компонент
export default PermissionItem