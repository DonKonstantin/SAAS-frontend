import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {createStyles, Tooltip, withStyles} from "@material-ui/core";
import UIUserMenu from "./UserMenu";
import Debug from "../../../containers/UILayer/TopPanel/Debug";
import LanguagesMenu from "../../../containers/UILayer/TopPanel/LangMenu";
import {clientServerDetector} from "../../../services/clientServerDetector";
import SearchContainer from "../../../containers/UILayer/TopPanel/Search";

// Стили верхней панели
const styles = createStyles({
    menuButton: {
        marginRight: 16,
    },
    grow: {
        flexGrow: 1,
    },
    rightButtons: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
    }
});

/**
 * Свойства компонента верхней панели
 */
interface UITopPanelProperties {
    header: string
    isMenuVisible: boolean
    onChangeMenuState: () => void
    classes: {
        menuButton: string
        grow: string
        rightButtons: string
    }
}

/**
 * Компонент верхней панели
 */
class UITopPanel extends React.Component<UITopPanelProperties> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: UITopPanelProperties) {
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
            case event.code === "KeyM" && event.ctrlKey && event.shiftKey:
                this.props.onChangeMenuState();

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Tooltip title={(
                        <React.Fragment>
                            Показать меню
                            <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                            <i>Комбинация клавиш: <b>CTRL + SHIFT + M</b></i>
                        </React.Fragment>
                    )}>
                        <IconButton
                            color="inherit"
                            onClick={() => this.props.onChangeMenuState()}
                            edge="start"
                            className={this.props.classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" noWrap>{this.props.header}</Typography>
                    <div className={this.props.classes.grow} />
                    <div className={this.props.classes.rightButtons}>
                        <SearchContainer />
                        <LanguagesMenu />
                        <Debug />
                        <UIUserMenu />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(UITopPanel)