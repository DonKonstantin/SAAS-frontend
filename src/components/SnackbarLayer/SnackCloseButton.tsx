import React from "react";
import {SnackbarProvider} from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Theme} from "@mui/material";
import {createStyles, withStyles} from "@mui/styles";
import {amber, green} from "@mui/material/colors";

// Описание классов стилей иконок
export interface IconStyleClasses {
    success: string
    default: string
    error: string
    info: string
    warning: string
    icon: string
    closeButton: string
    iconVariant: string
    message: string
    messageWrapper: string
    snackbar: string
}

// Стили сообщений
export const iconStyles = createStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    default: {},
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    closeButton: {
        padding: 8,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'normal',
    },
    messageWrapper: {
        maxWidth: `calc(100% - 53px)`,
    },
    snackbar: {
        margin: theme.spacing(1),
        marginBottom: 0,
        width: `calc(100% - ${theme.spacing(2)})`,
        maxWidth: `calc(100% - ${theme.spacing(2)})`,
        minWidth: `calc(100% - ${theme.spacing(2)})`,
    },
}));

/**
 * Интерфейс свойств компонента кнопки закрытия уведомления
 */
export interface SnackCloseButtonProps {
    snackbarRef: React.RefObject<SnackbarProvider>
    key: any
    classes: IconStyleClasses
}

/**
 * Компонент вывода кнопки закрытия уведомления
 */
class SnackCloseButton extends React.Component<SnackCloseButtonProps> {
    /**
     * Рендеринг кнопки закрытия
     */
    render() {
        return (
            <IconButton
                key={`close-${this.props.key}`}
                aria-label="Закрыть"
                color="inherit"
                onClick={() => {
                    if (this.props.snackbarRef.current !== null) {
                        this.props.snackbarRef.current.closeSnackbar(this.props.key);
                    }
                }}
                className={this.props.classes.closeButton}
            >
                <CloseIcon className={this.props.classes.icon}/>
            </IconButton>
        )
    }
}

// Подключаем стили для кнопки и экспортируем ее
export default withStyles(iconStyles)(SnackCloseButton)