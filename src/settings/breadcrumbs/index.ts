import {BreadcrumbsStructure} from "./type";
import HomeIcon from '@mui/icons-material/Home';
import {getCurrentState} from "../../context/AuthorizationContext";

// Коллекция всех страниц хлебных крошек
export const breadcrumbs: { (): BreadcrumbsStructure } = () => {
    return {
        "/": {
            breadcrumb: "pages.main.breadcrumb",
            icon: HomeIcon,
            link: {href: "/"}
        },
        "/users": {
            breadcrumb: "pages.users.list.breadcrumb",
            link: {href: "/users"}
        },
        "/users/add": {
            breadcrumb: "pages.users.add.breadcrumb",
            link: {href: "/roles/add"}
        },
        "/users/edit/[entityId]": {
            breadcrumb: "pages.users.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/users/edit/[entityId]",
                as: `/users/edit/${entityEditPrimaryKey}`
            })
        },
        "/permission-category": {
            breadcrumb: "pages.permission_category.list.breadcrumb",
            link: {href: "/permission-category"}
        },
        "/permission-category/add": {
            breadcrumb: "pages.permission_category.add.breadcrumb",
            link: {href: "/permission-category/add"}
        },
        "/permission-category/edit/[entityId]": {
            breadcrumb: "pages.permission_category.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/permission-category/edit/[entityId]",
                as: `/permission-category/edit/${entityEditPrimaryKey}`
            })
        },
        "/permission": {
            breadcrumb: "pages.permission.list.breadcrumb",
            link: {href: "/permission"}
        },
        "/permission/add": {
            breadcrumb: "pages.permission.add.breadcrumb",
            link: {href: "/permission/add"}
        },
        "/permission/edit/[entityId]": {
            breadcrumb: "pages.permission.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/permission/edit/[entityId]",
                as: `/permission/edit/${entityEditPrimaryKey}`
            })
        },
        "/roles": {
            breadcrumb: "pages.role.list.breadcrumb",
            link: {href: "/roles"}
        },
        "/roles/add": {
            breadcrumb: "pages.role.add.breadcrumb",
            link: {href: "/roles/add"}
        },
        "/roles/edit/[entityId]": {
            breadcrumb: "pages.role.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/roles/edit/[entityId]",
                as: `/roles/edit/${entityEditPrimaryKey}`
            })
        },
        "/domain": {
            breadcrumb: "pages.domain.list.breadcrumb",
            link: {href: "/domain"}
        },
        "/domain/add": {
            breadcrumb: "pages.domain.add.breadcrumb",
            link: {href: "/domain/add"}
        },
        "/domain/[domainId]": {
            breadcrumb: () => {
                const {domain, domains} = getCurrentState()
                const currentDomain = domains.find(d => d.id === domain)

                return currentDomain?.name || "Unknown"
            },
            color: "success",
        },
        "/domain/[domainId]/edit": {
            breadcrumb: "pages.domain.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/domain/[domainId]/edit",
                as: `/domain/${entityEditPrimaryKey}/edit`
            })
        },
        "/domain/[domainId]/project": {
            breadcrumb: "pages.project.list.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project",
                    as: `/domain/${domain}/project`,
                }
            }
        },
        "/domain/[domainId]/project/add": {
            breadcrumb: "pages.project.add.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/add",
                    as: `/domain/${domain}/project/add`,
                }
            }
        },
        "/domain/[domainId]/project/[projectId]": {
            breadcrumb: () => {
                const {project, projects} = getCurrentState()
                const currentProject = projects.find(p => p.id === project)

                return currentProject?.name || "Unknown"
            },
            color: "warning",
        },
        "/domain/[domainId]/project/[projectId]/edit": {
            breadcrumb: "pages.project.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/edit",
                    as: `/domain/${domain}/project/${entityEditPrimaryKey}/edit`,
                }
            }
        },
    }
}