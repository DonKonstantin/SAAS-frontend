import * as React from "react";
import {createStyles, Theme, withStyles} from "@material-ui/core";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        maxWidth: "100%",
    },
});

// Свойства компонента
interface UIContentProperties {
    children: React.ReactNode
    classes: {
        toolbar: string
        content: string
    }
}

/**
 * Material UI обертка над контентной частью страницы
 */
class UIContent extends React.Component<UIContentProperties> {
    render() {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                {this.props.children}
            </main>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(UIContent)
