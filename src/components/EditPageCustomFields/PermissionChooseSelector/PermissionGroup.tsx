import {FC, useState} from "react";
import {PermissionCategoryData} from "../../../services/loaders/allPermissionCategories/LoaderQuery";
import {PermissionData} from "../../../services/loaders/allPermissions/LoaderQuery";
import {IconButton, TableCell, TableRow} from "@mui/material";
import PermissionItem from "./PermissionItem";
import FolderIcon from '@mui/icons-material/Folder';

// Свойства компонента
type PermissionGroupProps = {
    group: PermissionCategoryData
    permissions: PermissionData[]
    selected: string[]
    onChangeSelected: { (callback: { (items: string[]): string[] }): void }
}

// Компонент вывода группы разрешений
const PermissionGroup: FC<PermissionGroupProps> = props => {
    const {
        group,
        permissions,
        selected,
        onChangeSelected,
    } = props

    const [visible, setVisible] = useState(false)
    const permissionsToDisplay = permissions
        .filter(p => p.category_id === group.id)

    if (0 === permissionsToDisplay.length) {
        return null
    }

    // Обработка переключения выбранных элементов
    const handleToggleItem = (item: string) => {
        onChangeSelected(selected => {
            if (selected.includes(item)) {
                return selected.filter(s => s !== item)
            }

            return [...selected, item]
        })
    }

    // Обработка переключения состояния видимости дочернего списка
    const handleToggleVisibility = () => {
        setVisible(s => !s)
    }

    return (
        <>
            <TableRow
                hover
                onClick={handleToggleVisibility}
                role="checkbox"
                aria-checked={visible}
                selected={visible}
            >
                <TableCell className="list-table-cell" padding="checkbox">
                    <IconButton color={visible ? "primary" : "default"}>
                        <FolderIcon/>
                    </IconButton>
                </TableCell>
                <TableCell colSpan={2} sx={{pl: 1}} className="list-table-cell">
                    {group.name}
                </TableCell>
            </TableRow>
            {visible && (
                <>
                    {permissionsToDisplay.map((permission, i) => (
                        <PermissionItem
                            key={permission.id}
                            permission={permission}
                            isSelected={selected.includes(permission.id)}
                            onChange={() => handleToggleItem(permission.id)}
                            isLast={i === (permissionsToDisplay.length - 1)}
                        />
                    ))}
                </>
            )}
        </>
    )
}

// Экспортируем компонент
export default PermissionGroup