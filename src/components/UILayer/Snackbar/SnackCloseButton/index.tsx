import React from "react";
import {IconStyleClasses, iconStyles} from "../index";
import {SnackbarProviderProps} from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core";

/**
 * Интерфейс свойств компонента кнопки закрытия уведомления
 */
export interface SnackCloseButtonProps {
    ref: React.RefObject<SnackbarProviderProps>
    key: any
    classes: IconStyleClasses
}

/**
 * Компонент вывода кнопки закрытия уведомления
 */
class SnackCloseButton extends React.Component<SnackCloseButtonProps> {
    /**
     * Обработчик закрытия сообщения. Связывается по ссылке с родительским компонентом.
     * @param key
     */
    onClickDismiss = (key: any) => () => {
        if (this.props.ref.current !== null) {
            // @ts-ignore
            this.props.ref.current.closeSnackbar(key);
        }
    }

    /**
     * Рендеринг кнопки закрытия
     */
    render() {
        return (
            <IconButton
                key={`close-${this.props.key}`}
                aria-label="Закрыть"
                color="inherit"
                onClick={() => this.onClickDismiss(this.props.key)}
                className={this.props.classes.closeButton}
            >
                <CloseIcon className={this.props.classes.icon} />
            </IconButton>
        )
    }
}

// Подключаем стили для кнопки и экспортируем ее
export default withStyles(iconStyles)(SnackCloseButton)