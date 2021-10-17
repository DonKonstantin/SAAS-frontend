import {BreadcrumbsStructure} from "./type";
import HomeIcon from '@mui/icons-material/Home';

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
        "/domain": {
            breadcrumb: "pages.domain.list.breadcrumb",
            link: {href: "/domain"}
        },
        "/domain/add": {
            breadcrumb: "pages.domain.add.breadcrumb",
            link: {href: "/domain/add"}
        },
        "/domain/edit/[entityId]": {
            breadcrumb: "pages.domain.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/domain/edit/[entityId]",
                as: `/domain/edit/${entityEditPrimaryKey}`
            })
        },
        "/domain/project": {
            breadcrumb: "pages.project.list.breadcrumb",
            link: {href: "/domain/project"}
        },
        "/domain/project/add": {
            breadcrumb: "pages.project.add.breadcrumb",
            link: {href: "/domain/project/add"}
        },
        "/domain/project/edit/[entityId]": {
            breadcrumb: "pages.project.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/domain/project/edit/[entityId]",
                as: `/domain/project/edit/${entityEditPrimaryKey}`
            })
        },
    }
}