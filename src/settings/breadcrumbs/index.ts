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
        }
    }
}