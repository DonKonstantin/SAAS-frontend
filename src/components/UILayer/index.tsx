import React from "react";
import {createStyles, withStyles} from "@material-ui/core";
import {SnackbarProvider, SnackbarProviderProps} from 'notistack';
import SnackCloseButton from "./Snackbar/SnackCloseButton";

// Основный стили компонента UI
const styles = createStyles({
    root: {
        display: 'flex',
    },
});

// Свойства компонента
interface UILayerProps {
    classes: {
        root: string
    }
    children: React.ReactNode
}

/**
 * Компонент вывода основной обертки UI
 */
class UILayer extends React.Component<UILayerProps> {
    render() {
        // Создаем ссылку для связывания компонентов
        const ref = React.createRef<SnackbarProviderProps>()

        // Кнопка закрытия сообщения
        const snackCloseAction = (key: any) => {
            return (
                <SnackCloseButton key={key} ref={ref}/>
            )
        };

        return (
            <div className={this.props.classes.root}>
                <SnackbarProvider
                    ref={ref}
                    maxSnack={5}
                    anchorOrigin={{vertical: `bottom`, horizontal: `left`}}
                    hideIconVariant={false}
                    action={snackCloseAction}
                >
                    {this.props.children}
                </SnackbarProvider>
            </div>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(UILayer)