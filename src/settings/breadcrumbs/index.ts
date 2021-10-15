import {BreadcrumbsStructure} from "./type";
import HomeIcon from '@mui/icons-material/Home';

// Коллекция всех страниц хлебных крошек
export const breadcrumbs: { (): BreadcrumbsStructure } = () => {
    return {
        "/": {
            title: "pages.main.breadcrumb",
            icon: HomeIcon,
            link: {href: "/"}
        },
        "/users": {
            title: "pages.users.list.breadcrumb",
            link: {href: "/users"}
        },
        "/permission-category": {
            title: "pages.permission_category.list.breadcrumb",
            link: {href: "/permission-category"}
        },
        "/permission": {
            title: "pages.permission.list.breadcrumb",
            link: {href: "/permission"}
        },
        "/roles": {
            title: "pages.role.list.breadcrumb",
            link: {href: "/roles"}
        },
        "/domain": {
            title: "pages.domain.list.breadcrumb",
            link: {href: "/domain"}
        },
        "/project": {
            title: "pages.project.list.breadcrumb",
            link: {href: "/project"}
        },
    }
}