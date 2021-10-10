import React from "react";
import {Schemas} from "../../../../../../settings/schema";
import {SearchResultEntity} from "../../../../../../settings/search/system/types";
import {Avatar, createStyles, Theme, Tooltip, withStyles} from "@material-ui/core";
import {blue} from '@material-ui/core/colors';
import {WithRouterProps} from "next/dist/client/with-router";
import {withRouter} from "next/router";
import clsx from "clsx";
import {SearchResponseItem} from "../../../../../../services/primarySearchService/interfaces";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    searchItem: {
        padding: theme.spacing(1.5),
    },
    avatar: {
        backgroundColor: blue[600],
    },
    avatarBlock: {
        paddingRight: theme.spacing(1.5),
    },
});

// Свойства компонента группы поисковой выдачи
export interface SearchResultItemComponentProps extends WithRouterProps {
    config: SearchResultEntity<keyof Schemas>
    item: SearchResponseItem
    onClearSearch: {(): void}
    classes: {
        searchItem: string
        avatar: string
        avatarBlock: string
    }
}

/**
 * Компонент вывода группы поисковой выдачи
 */
class SearchResultItemComponent extends React.Component<SearchResultItemComponentProps>{
    /**
     * Обработка перехода на страницу редактирования сущности
     * @param primaryKey
     */
    handleClick(primaryKey: any) {
        const link = this.props.config.editPageUrlGenerator(primaryKey);

        this.props.router.push(link.href, link.as);
        this.props.onClearSearch()
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const Component = this.props.config.resultDrawComponent;
        const Icon = this.props.config.icon;
        const color = this.props.config.color ? {backgroundColor: this.props.config.color} : {};

        return (
            <Tooltip title={`Перейти к редактированию`}>
                <div
                    className={clsx(this.props.classes.searchItem, `search-list-card`)}
                    onClick={() => this.handleClick(this.props.item.searchProps.primaryKey)}
                >
                    <div className={this.props.classes.avatarBlock}>
                        <Avatar className={this.props.classes.avatar} style={color}>
                            <Icon/>
                        </Avatar>
                    </div>
                    <div>
                        <div>{this.props.config.entityTitle}</div>
                        <div><Component {...this.props.item.searchProps} /></div>
                    </div>
                </div>
            </Tooltip>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(withRouter(SearchResultItemComponent))