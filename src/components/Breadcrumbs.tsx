import * as React from "react";
import {FC, useRef} from "react";
import {emphasize, styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {breadcrumbs} from "../settings/breadcrumbs";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {Breadcrumbs as BreadcrumbsComp} from "@mui/material";
import {Breadcrumb} from "../settings/breadcrumbs/type";
import {withPageProps} from "../layouts/PagePropsProvider";

// Стилизованный компонент хлебной крошки
const StyledBreadcrumb = styled(Chip)(({theme}) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}) as typeof Chip;

// Компонент вывода одиночной хлебной крошки
const BreadcrumbItem: FC<Breadcrumb> = props => {
    const router = useRouter()
    const {t} = useTranslation()

    const {link, breadcrumb, icon: IconComponent} = props
    const linkData = typeof link === "function"
        ? link(props)
        : link

    return (
        <StyledBreadcrumb
            component="a"
            href={linkData?.href || "#"}
            label={t(breadcrumb) as string}
            icon={!IconComponent ? undefined : (
                <IconComponent fontSize={"small"}/>
            )}
            onClick={event => {
                event.preventDefault()
                event.stopPropagation()

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

    const homeCrumb = breadcrumbsList.current["/"]
    if (!homeCrumb) {
        return null
    }

    const pathNames = router.pathname.split('/').filter((x) => x);
    return (
        <BreadcrumbsComp aria-label="breadcrumb">
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