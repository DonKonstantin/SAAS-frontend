import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Divider, IconButton, Tooltip, Typography, withStyles} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import UILeftMenu from "../../../containers/UILayer/LeftDrawer/LeftMenu";
import {Scrollbars} from "react-custom-scrollbars";
import AppBar from "@material-ui/core/AppBar";

// Стили левой колонки
const styles = (theme: Theme) => createStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
        padding: `0 ${theme.spacing(0.5)}px`,
    },
    header: {
        flexGrow: 1,
        padding: `0 ${theme.spacing(2)}px`,
    },
    headerIcon: {
        marginLeft: theme.spacing(2),
    }
});

/**
 * Свойства компонента левой панели
 */
interface UILeftDrawerPanelProperties {
    isMenuVisible: boolean
    onChangeMenuState: () => void
    classes: {
        toolbar: string
        header: string
        headerIcon: string
    }
}

/**
 * Компонент левой панели
 */
class UILeftDrawer extends React.Component<UILeftDrawerPanelProperties> {
    render() {
        return (
            <Drawer open={this.props.isMenuVisible} onClose={() => this.props.onChangeMenuState()}>
                <AppBar position={"relative"}>
                    <div className={this.props.classes.toolbar}>
                        <Typography variant={`h6`} className={this.props.classes.header}>
                            Меню
                        </Typography>
                        <Tooltip title={(
                            <React.Fragment>
                                Скрыть меню
                                <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                <i>Комбинация клавиш: <b>CTRL + SHIFT + M</b></i>
                            </React.Fragment>
                        )}>
                            <IconButton color={`inherit`} onClick={() => this.props.onChangeMenuState()}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </AppBar>
                <Divider />
                <Scrollbars style={{width: 280}} height={"100%"}>
                    <UILeftMenu
                        isMenuVisible={this.props.isMenuVisible}
                        onChangeMenuState={this.props.onChangeMenuState}
                    />
                </Scrollbars>
            </Drawer>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(UILeftDrawer)