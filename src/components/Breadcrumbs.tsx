import * as React from "react";
import {FC, useRef} from "react";
import {styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {breadcrumbs} from "../settings/breadcrumbs";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {Breadcrumbs as BreadcrumbsComp} from "@mui/material";
import {Breadcrumb} from "../settings/breadcrumbs/type";
import {withPageProps} from "../layouts/PagePropsProvider";
import {useAuthorization} from "../context/AuthorizationContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Стилизованный компонент хлебной крошки
const StyledBreadcrumb = styled(Chip)(({theme}) => {
    return {
        height: theme.spacing(3),
        fontWeight: theme.typography.fontWeightRegular,
    };
}) as typeof Chip;

// Компонент вывода одиночной хлебной крошки
const BreadcrumbItem: FC<Breadcrumb> = props => {
    const router = useRouter()
    const {t} = useTranslation()

    const {link, breadcrumb, icon: IconComponent, color = "default"} = props
    const linkData = typeof link === "function"
        ? link(props)
        : link

    const title = typeof breadcrumb === "function" ? breadcrumb() : breadcrumb
    return (
        <StyledBreadcrumb
            component="a"
            href={linkData?.href || "#"}
            label={t(title) as string}
            icon={!IconComponent ? undefined : (
                <IconComponent fontSize={"small"}/>
            )}
            color={color}
            onClick={event => {
                event.preventDefault()
                event.stopPropagation()

                if (!linkData) {
                    return
                }

                return router.push(linkData.href, linkData.as)
            }}
        />
    )
}

// Подключаем к компоненту свойства страницы из контекста
const BreadcrumbItemWithPageProps = withPageProps(BreadcrumbItem)

// Компонент вывода хлебных крошек
const Breadcrumbs: FC = () => {
    const breadcrumbsList = useRef(breadcrumbs())
    const router = useRouter()
    const {} = useAuthorization()

    const homeCrumb = breadcrumbsList.current["/"]
    if (!homeCrumb) {
        return null
    }

    const pathNames = router.pathname.split('/').filter((x) => x);
    return (
        <BreadcrumbsComp
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <BreadcrumbItem {...homeCrumb} />
            {pathNames.map((_, index) => {
                const to = `/${pathNames.slice(0, index + 1).join('/')}`
                const breadcrumb = breadcrumbsList.current[to]
                if (!breadcrumb) {
                    return null
                }

                return <BreadcrumbItemWithPageProps key={index} {...breadcrumb} />
            })}
        </BreadcrumbsComp>
    )
}

// Экспортируем компонент
export default Breadcrumbs