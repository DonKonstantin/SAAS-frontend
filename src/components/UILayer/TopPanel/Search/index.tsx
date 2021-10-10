import React from "react";
import {
    createStyles,
    Divider,
    fade,
    InputBase,
    Paper, Slide,
    Theme,
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchResultsComponent from "./SearchResults";
import {clientServerDetector} from "../../../../services/clientServerDetector";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    searchPaper: {
    },
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
    tooltip: {
        maxWidth: 370,
    },
});

// Свойства компонента
export interface SearchComponentProps {
    classes: {
        tooltip: string
        search: string
        searchIcon: string
        inputRoot: string
        inputInput: string
        searchPaper: string
        searchPaperHeader: string
        searchResultsBlock: string
        searchPaperBase: string
    }
}

// State компонента
interface SearchComponentState {
    isVisible: boolean,
    searchString: string,
}

// Компонент переключения состояния отладки
class SearchComponent extends React.PureComponent<SearchComponentProps, SearchComponentState>{
    ref = React.createRef<HTMLInputElement>();
    searchRef = React.createRef<HTMLInputElement>();
    state = {
        isVisible: false,
        searchString: "",
    };

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: SearchComponentProps) {
        super(props);

        this.handleButtonPressEvent = this.handleButtonPressEvent.bind(this)
    }

    /**
     * Подключаем обработку нажатия быстрых клавиш
     */
    componentDidMount() {
        if (clientServerDetector().isClient()) {
            document.addEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.removeEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "KeyF" && event.ctrlKey:
                if (this.ref.current) {
                    this.ref.current.click()
                }

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Обработка изменения состояния видимости поисковых результатов
     * @param state
     */
    handleChangeVisibility(state: boolean) {
        this.setState({
            ...this.state,
            isVisible: state,
        })
    }

    /**
     * Обработка изменения поля поиска
     * @param value
     */
    handleChangeSearchString(value: string) {
        this.setState({
            ...this.state,
            searchString: value,
        })
    }

    /**
     * Обработка выбора результата поиска
     */
    handleClearSearch() {
        this.setState({
            ...this.state,
            isVisible: false,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <ClickAwayListener onClickAway={() => this.handleChangeVisibility(false)}>
                <div>
                    <Tooltip
                        disableFocusListener
                        classes={{tooltip: this.props.classes.tooltip}}
                        title={(
                            <React.Fragment>
                                Поиск по разделам администрирования. Начните вводить содержание текстового поля любой сущности и поиск найдет ее.
                                <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                <i>Комбинация клавиш: <b>CTRL + F</b></i>
                            </React.Fragment>
                        )}
                    >
                        <div className={this.props.classes.search} onFocus={() => this.handleChangeVisibility(true)}>
                            <div className={this.props.classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                value={this.state.searchString}
                                ref={this.ref}
                                inputRef={this.searchRef}
                                onChange={e => this.handleChangeSearchString(e.target.value)}
                                placeholder="Поиск…"
                                classes={{
                                    root: this.props.classes.inputRoot,
                                    input: this.props.classes.inputInput,
                                }}
                                inputProps={{
                                    'aria-label': 'search',
                                    onKeyDown: e => {
                                        if (e.key === "Escape" && this.searchRef.current) {
                                            this.searchRef.current.blur();
                                            document.getElementsByTagName(`main`)[0].click();

                                            e.stopPropagation();
                                            e.preventDefault()
                                        }
                                    }
                                }}
                            />
                        </div>
                    </Tooltip>
                    <Slide direction={"left"} timeout={500} in={this.state.isVisible}>
                        <div className={`search-results-block`}>
                            <Paper className={this.props.classes.searchPaper}>
                                {this.state.searchString.length == 0 && (
                                    <div className={this.props.classes.searchPaperBase}>
                                        <Typography variant="button" gutterBottom className={this.props.classes.searchPaperHeader}>
                                            Результаты поиска по разделам
                                        </Typography>
                                        <Divider />
                                        <div className={this.props.classes.searchResultsBlock}>
                                            <div>Начните вводить любой текст из полей какой либо сущности для поиска.</div>
                                        </div>
                                    </div>
                                )}
                                {this.state.searchString.length > 0 && (
                                    <SearchResultsComponent
                                        onClearSearch={() => this.handleClearSearch()}
                                        searchString={this.state.searchString}
                                    />
                                )}
                            </Paper>
                        </div>
                    </Slide>
                </div>
            </ClickAwayListener>
        )
    }
}

// Экспортируем компонент с подключенными свойствами
export default withStyles(styles)(SearchComponent)