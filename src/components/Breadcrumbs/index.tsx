import React from "react";
import {WithRouterProps} from "next/dist/client/with-router";
import {withRouter} from "next/router";
import {Icons, IconsCollection} from "./icons";
import {withStyles} from "@mui/styles";
import {Breadcrumbs, Chip, emphasize, Theme} from "@mui/material";

// Стилизованный компонент хлебной крошки
const StyledBreadcrumb = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
        marginBottom: 3,
        marginTop: 3,
    },
}))(Chip) as typeof Chip;

// Тип, описывающий ссылку на страницу
export type PageUrl = {href: string, as?: string}

// Интерфейс хлебной крошки
export interface Breadcrumb {
    icon?: keyof IconsCollection
    title: string
    link?: PageUrl
}

// Свойства компонента
interface BreadcrumbsProps extends WithRouterProps {
    items: Breadcrumb[]
}

/**
 * Компонент вывода хлебных крошек
 */
class BreadcrumbsComponent extends React.Component<BreadcrumbsProps> {
    /**
     * Обработка перехода по ссылке из хлебной крошки
     * @param url
     */
    redirect(url: PageUrl) {
        this.props.router.push(url.href, url.as)
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {this.props.items.map((breadcrumb, i) => {
                    const Icon = breadcrumb.icon && Icons[breadcrumb.icon] ? Icons[breadcrumb.icon] : undefined
                    return (
                        <StyledBreadcrumb
                            key={`breadcrumb-${i}`}
                            component="a"
                            href={breadcrumb.link ? (breadcrumb.link?.as || breadcrumb.link.href) : `#`}
                            label={breadcrumb.title}
                            icon={Icon && (<Icon fontSize="small" />)}
                            onClick={(event: any) => {
                                event.preventDefault()
                                event.stopPropagation()

                                if (!breadcrumb.link || i + 1 === this.props.items.length) return

                                this.redirect(breadcrumb.link)
                            }}
                        />
                    )
                })}
            </Breadcrumbs>
        );
    }
}

// Подключаем Next router к компоненту
export default withRouter(BreadcrumbsComponent)