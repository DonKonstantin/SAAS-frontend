import React from 'react';
import clsx from 'clsx';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent, {SnackbarContentProps} from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {VariantType} from 'notistack';
import {SvgIconProps} from "@material-ui/core/SvgIcon";

// Доступные для вывода типы иконок
type IconVariants = {[T in VariantType]: React.ComponentType<SvgIconProps>}
export const iconVariants: IconVariants = {
    default: InfoIcon,
    error: HighlightOffIcon,
    info: InfoIcon,
    success: CheckCircleOutlineIcon,
    warning: WarningIcon,
};

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
    default: {

    },
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
        width: `calc(100% - ${2 * theme.spacing(1)}px)`,
        maxWidth: `calc(100% - ${2 * theme.spacing(1)}px)`,
        minWidth: `calc(100% - ${2 * theme.spacing(1)}px)`,
    },
}));

// Параметры компонента
export interface UISnackbarProperties extends SnackbarContentProps {
    className?: string;
    message?: string;
    onClose: {(): void} | null;
    iconVariant: VariantType;
    classes: IconStyleClasses;
}

// Компонент вывода уведомления в стиле Material UI
class Snackbar extends React.Component<UISnackbarProperties> {
    render() {
        const classes = this.props.classes;
        const { className, message, onClose, iconVariant, classes: _, ...other } = this.props;
        const Icon = iconVariants[iconVariant];
        const action = typeof onClose === "function" ? (
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={() => onClose ? onClose() : null}
                className={classes.closeButton}
            >
                <CloseIcon className={classes.icon} />
            </IconButton>
        ) : null;

        return (
            <SnackbarContent
                className={clsx(classes[iconVariant], className, classes.snackbar)}
                classes={{message: classes.messageWrapper}}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    action,
                ]}
                {...other}
            />
        )
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(iconStyles)(Snackbar)