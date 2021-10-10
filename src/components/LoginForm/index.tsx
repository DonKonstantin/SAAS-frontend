import React, {KeyboardEvent} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';

/**
 * Стили формы авторизации
 * @param theme
 */
const styles = (theme: Theme) => createStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        width: '100%',
        color: `red`,
        textAlign: `center`,
        fontSize: 13,
        fontWeight: "bold",
    },
    header: {
        marginBottom: theme.spacing(1),
    }
})

/**
 * Свойства формы авторизации
 */
export interface LoginFormProps {
    classes: {
        paper: string
        avatar: string
        form: string
        submit: string
        errorMessage: string
        header: string
    }
    isError: boolean
    onSubmit: (email: string, password: string) => void
    onErrorReset: () => void
}

/**
 * State формы авторизации
 */
interface LoginFormState {
    email: string
    password: string
}

/**
 * Компонент формы авторизации
 */
class LoginFormComponent extends React.Component<LoginFormProps, LoginFormState>  {
    button: any

    /**
     * Конструктор компонента
     *
     * @param props
     */
    constructor(props: Readonly<LoginFormProps>) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    /**
     * Обработка изменения e-mail
     * @param email
     */
    onChangeEmail(email: string) {
        this.props.onErrorReset()
        this.setState({
            ...this.state,
            email: email,
        })
    }

    /**
     * Обработка изменения пароля
     * @param password
     */
    onChangePassword(password: string) {
        this.props.onErrorReset()
        this.setState({
            ...this.state,
            password: password,
        })
    }

    /**
     * Отправка формы
     */
    onSubmit() {
        this.props.onErrorReset()
        this.props.onSubmit(this.state.email, this.state.password)
    }

    /**
     * Обработка отправки формы авторизации по нажатии на Enter
     * @param event
     */
    onKeyPress<T>(event: KeyboardEvent<T>) {
        if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey) {
            return
        }

        this.button.click();
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={this.props.classes.header}>
                            Авторизация
                        </Typography>
                        {this.props.isError && (
                            <Grid container className={this.props.classes.errorMessage}>
                                <Grid item xs={12}>
                                    Введены не корректные данные
                                </Grid>
                            </Grid>
                        )}
                        <form
                            className={this.props.classes.form}
                            noValidate
                            onSubmit={e => {
                                e.stopPropagation()
                                e.preventDefault()

                                this.onSubmit()
                            }}
                            onKeyPress={(e) => this.onKeyPress(e)}
                        >
                            <TextField
                                variant="outlined"
                                error={this.props.isError}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.email}
                                onChange={(e) => (this.onChangeEmail(e.target.value))}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                error={this.props.isError}
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={(e) => (this.onChangePassword(e.target.value))}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                                ref={button => this.button = button}
                            >
                                Войти
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LoginFormComponent)