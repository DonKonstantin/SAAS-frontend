import React from "react";
import {createStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LoginForm from "../LoginForm";

/**
 * Стили формы авторизации
 * @param theme
 */
const styles = createStyles({
    page: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
    },
})

/**
 * Свойства страницы авторизации
 */
interface LoginPageProps {
    classes: {
        page: string
    }
}

/**
 * Контейнер вывода страницы авторизации
 */
class LoginPage extends React.Component<LoginPageProps> {
    render() {
        return (
            <Grid container className={this.props.classes.page} spacing={0}>
                <Grid item xs={3}>
                    <LoginForm/>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LoginPage)