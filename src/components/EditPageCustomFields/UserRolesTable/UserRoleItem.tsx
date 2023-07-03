import {RoleData} from "../../../services/loaders/allRoles/LoaderQuery";
import {DomainData, ProjectData} from "../../../services/loaders/allDomainsAndProjects/LoaderQuery";
import {FC} from "react";
import {Checkbox, TableCell, TableRow} from "@mui/material";
import {useTranslation} from "react-i18next";

// Свойства компонента
type UserRoleItemProps = {
    role: RoleData
    domains: DomainData[]
    projects: ProjectData[]

    selected: boolean
    onToggle: {(): void}
}

// Компонент вывода строки роли пользователя
const UserRoleItem: FC<UserRoleItemProps> = props => {
    const {
        role,
        domains,
        projects,
        selected,
        onToggle,
    } = props

    const {t} = useTranslation()

    const domain = domains.find(d => d.id === role.structure_item_id)
    const project = projects.find(d => d.id === role.structure_item_id)
    const isHasNoAccess = role.name === t(`pages.users.edit.fields.role-not-found`)

    let objectName = "-"
    switch (true) {
        case !!domain:
            objectName = domain?.name || ""
            break
        case !!project:
            objectName = project?.name || ""
            break
    }

    // Обработка переключения состояния чекбокса выбора роли для обмена
    const handleToggle = () => {
        if (isHasNoAccess) {
            return
        }

        onToggle();
    }

    const tStyle = isHasNoAccess ? {color: `rgba(0, 0, 0, 0.26)`} : {}
    return (
        <TableRow
            hover={!isHasNoAccess}
            onClick={handleToggle}
            role="checkbox"
            aria-checked={selected}
            selected={selected}
        >
            <TableCell className="list-table-cell" padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={selected}
                    disabled={isHasNoAccess}
                />
            </TableCell>
            <TableCell
                className="list-table-cell"
                padding="none"
                style={tStyle}
                sx={{
                    pt: 2,
                    pl: 1,
                    pb: 2,
                    width: "calc(55% - 48px)",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                }}
            >
                {role.name}
            </TableCell>
            <TableCell style={tStyle} className="list-table-cell" sx={{pt: 2, pl: 1, pb: 2, width: "25%"}}>
                {objectName}
            </TableCell>
            <TableCell style={tStyle} className="list-table-cell" padding="none" sx={{p: 1, width: "20%"}}>
                {t(`entity-edit.fields.user-roles-group.header.level.${role.level}`)}
            </TableCell>
        </TableRow>
    )
}

// Экспортируем компонент
export default UserRoleItem