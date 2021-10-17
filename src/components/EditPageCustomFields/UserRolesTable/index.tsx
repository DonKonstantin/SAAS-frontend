import {FC, useEffect, useState} from "react";
import {RoleData} from "../../../services/loaders/allRoles/LoaderQuery";
import {DomainData, ProjectData} from "../../../services/loaders/allDomainsAndProjects/LoaderQuery";
import UserRoleHeader, {UserRoleHeaderFilter} from "./UserRoleHeader";
import {Table, TableBody, TableContainer, TableHead} from "@mui/material";
import UserRoleItem from "./UserRoleItem";

// Свойства компонента
type UserRolesTableProps = {
    roles: RoleData[]
    domains: DomainData[]
    projects: ProjectData[]

    selectedItems: string[]
    onChangeSelected: { (callback: {(selectedItems: string[]): string[]}): void }
}

// Компонент вывода таблицы выбора ролей
const UserRolesTable: FC<UserRolesTableProps> = props => {
    const {
        roles,
        domains,
        projects,
        selectedItems,
        onChangeSelected,
    } = props

    const [filter, setFilter] = useState<UserRoleHeaderFilter>({name: "", object: "", level: ""})
    useEffect(() => {
        onChangeSelected(() => [])
    }, [filter])

    const availableStructures = [...domains, ...projects]
        .filter(d => d.name.toLowerCase().indexOf(filter.object.toLowerCase()) !== -1)
        .map(d => d.id)

    const rolesToDisplay = roles
        .filter(r => filter.name.length === 0 || r.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1)
        .filter(r => filter.level.length === 0 || r.level === filter.level)
        .filter(r => filter.object.length === 0 || availableStructures.includes(r.structure_item_id))


    return (
        <TableContainer>
            <Table stickyHeader sx={{tableLayout: "fixed"}}>
                <TableHead>
                    <UserRoleHeader
                        filter={filter}
                        onChangeFilter={setFilter}
                        selectedItems={selectedItems}
                        allItems={rolesToDisplay.map(r => r.id)}
                        onChangeSelected={items => onChangeSelected(() => items)}
                    />
                </TableHead>
                <TableBody>
                    {rolesToDisplay.map(role => (
                        <UserRoleItem
                            key={role.id}
                            role={role}
                            domains={domains}
                            projects={projects}
                            selected={selectedItems.includes(role.id)}
                            onToggle={() => {
                                onChangeSelected(items => {
                                    if (items.includes(role.id)) {
                                        return items.filter(i => i !== role.id)
                                    }

                                    return [...items, role.id]
                                })
                            }}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

// Экспортируем компонент
export default UserRolesTable