import React from "react";
import {createStyles, IconButton, Tooltip, withStyles} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';
import {AccountCircle} from "@material-ui/icons";
import UIUserCard from "../../../../containers/UILayer/TopPanel/UserMenu/Card";

// Стили компонента
const styles = createStyles({
    dropdown: {
        right: "-345px",
        position: "fixed",
        top: "85px",
        transition: "0.5s right"
    },
    dropdownVisible: {
        right: "20px",
    },
});

/**
 * Свойства компонента верхней панели
 */
interface UIUserMenuProperties {
    classes: {
        dropdown: string
        dropdownVisible: string
    },
}

/**
 * State текущего компонента
 */
interface UIUserMenuState {
    isVisible: boolean
}

/**
 * Компонент верхней панели
 */
class UIUserMenu extends React.PureComponent<UIUserMenuProperties, UIUserMenuState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: UIUserMenuProperties) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    /**
     * Скрытие всплывающего меню
     */
    private hide() {
        this.setState({
            ...this.state,
            isVisible: false,
        })
    }

    /**
     * Переключение отображения всплывающего меню
     */
    private toggleVisibility() {
        this.setState({
            ...this.state,
            isVisible: !this.state.isVisible,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <ClickAwayListener onClickAway={() => this.hide()}>
                <Tooltip title={this.state.isVisible ? `` : `Показать профиль пользователя`}>
                    <div>
                        <IconButton
                            aria-label="Профиль пользователя"
                            onClick={() => this.toggleVisibility()}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <div className={clsx(this.props.classes.dropdown, {
                            [this.props.classes.dropdownVisible]: this.state.isVisible,
                        })}>
                            <UIUserCard />
                        </div>
                    </div>
                </Tooltip>
            </ClickAwayListener>
        );
    }
}

export default withStyles(styles)(UIUserMenu)