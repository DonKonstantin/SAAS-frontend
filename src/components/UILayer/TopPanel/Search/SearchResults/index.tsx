import React from "react";
import {v4} from "uuid";
import {primarySearchService} from "../../../../../services/primarySearchService";
import {searchConfig} from "../../../../../settings/search";
import {SearchResponseItem} from "../../../../../services/primarySearchService/interfaces";
import SearchResultItemComponent from "./SearchResultItem";
import {createStyles, Divider, Theme, Typography, withStyles} from "@material-ui/core";
import { Scrollbars } from 'react-custom-scrollbars';

// Стили компонента
const styles = (theme: Theme) => createStyles({
    searchPaperBase: {
        padding: theme.spacing(3),
    },
    searchPaperHeader: {
        paddingBottom: theme.spacing(0.5),
        display: "block",
        margin: 0,
    },
    searchResultsBlock: {
        paddingTop: theme.spacing(2),
    },
});

// Свойства компонента
export interface SearchResultsProps {
    searchString: string
    onClearSearch: {(): void}
    classes: {
        searchPaperBase: string
        searchPaperHeader: string
        searchResultsBlock: string
    }
}

// State компонента
interface ComponentState {
    lastSearchId: string,
    searchResults: SearchResponseItem[],
}

// Компонент таблицы результатов поиска
class SearchResultsComponent extends React.PureComponent<SearchResultsProps, ComponentState>{
    searchConfig = searchConfig();

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: SearchResultsProps) {
        super(props);
        this.state = {
            lastSearchId: "",
            searchResults: [],
        }
    }

    /**
     * Обновляем конфигурацию при подключении компонента
     */
    componentDidMount() {
        this.searchConfig = searchConfig();

        this.handleReloadSearch()
    }

    /**
     * Обрабатываем изменение поисковой фразы
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<SearchResultsProps>) {
        if (prevProps.searchString === this.props.searchString) {
            return
        }

        this.handleReloadSearch()
    }

    componentWillUnmount() {
        this.setState({
            ...this.state,
            lastSearchId: "-1",
        })
    }

    /**
     * Перезагрузка поисковых данных
     */
    handleReloadSearch() {
        if (this.state.lastSearchId === "-1") {
            return
        }

        if (this.props.searchString === "") {
            this.setState({
                ...this.state,
                lastSearchId: "",
                searchResults: [],
            });
            return
        }

        const lastSearchId = v4();
        this.setState({
            ...this.state,
            lastSearchId: lastSearchId
        });

        primarySearchService()
            .Search(lastSearchId, this.props.searchString)
            .then(data => {
                if (data.id !== this.state.lastSearchId) {
                    return
                }

                this.setState({
                    ...this.state,
                    lastSearchId: "",
                    searchResults: data.data,
                })
            })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <React.Fragment>
                {this.state.searchResults.length > 0 && (
                    <div className={`search-results`}>
                        <Scrollbars
                            style={{width: "100%"}}
                            autoHeight
                            autoHeightMin={0}
                            autoHeightMax={"50vh"}
                        >
                            {this.state.searchResults.map((item, i) => {
                                const config = this.searchConfig.find(conf => conf.entityCode === item.entityType);
                                if (!config) {
                                    return null
                                }

                                return (
                                    <React.Fragment key={`search-result-item-fragment-${i}`}>
                                        <SearchResultItemComponent
                                            key={`search-result-item-${i}`}
                                            config={config}
                                            onClearSearch={this.props.onClearSearch}
                                            item={item}
                                        />
                                        {i !== this.state.searchResults.length - 1 && (
                                            <Divider key={`search-result-item-divider-${i}`} />
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </Scrollbars>
                    </div>
                )}
                {this.state.searchResults.length === 0 && (
                    <div className={this.props.classes.searchPaperBase}>
                        <Typography variant="button" gutterBottom className={this.props.classes.searchPaperHeader}>
                            Результаты поиска по разделам
                        </Typography>
                        <Divider />
                        <div className={this.props.classes.searchResultsBlock}>
                            <div>Ничего не найдено.</div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(SearchResultsComponent)