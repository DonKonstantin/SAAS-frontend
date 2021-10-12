import React, {FC, FormEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../context/AuthorizationContext";
import Head from "next/head";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {Button, Grid, InputAdornment, Link, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

// Свойства компонента
export type LoginFormProps = WithAuthorization<{
    // Переключение формы авторизации на форму "Забыли пароль"
    onToggleForm: { (): void }
}>;

// Компонент вывода формы авторизации
const LoginForm: FC<LoginFormProps> = props => {
    const {
        onToggleForm,
        onAuthorize,
        isRequestInProgress,
    } = props

    const {t} = useTranslation()

    // State формы
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    // Статус валидности авторизации
    const [isAuthValid, setIsAuthValid] = useState(true)
    useEffect(() => {
        setIsAuthValid(true)
    }, [email, pass])

    // Обработка авторизации пользователя
    const onAuthorizeUser = async () => {
        if (isRequestInProgress) {
            return
        }

        const status = await onAuthorize(email, pass)

        setIsAuthValid(status)
    }

    // Обработка отправки формы авторизации
    const onSubmitForm: FormEventHandler<HTMLFormElement> = e => {
        e.stopPropagation()
        e.preventDefault()

        onAuthorizeUser()
    }

    // Обработка отправки формы авторизации с клавиатуры при помощи Enter
    const onSubmitFormFromKeyboard: KeyboardEventHandler<HTMLFormElement> = event => {
        if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey) {
            return
        }

        event.stopPropagation()
        event.preventDefault()

        return onAuthorizeUser()
    }

    // Обработка перехода на форму восстановления пароля
    const onOpenResetForm: MouseEventHandler<HTMLAnchorElement> = event => {
        event.stopPropagation()
        event.preventDefault()

        onToggleForm()
    }

    const title = `${t(`UI.meta.title.prefix`)}${t(`UI.login.auth.title`)}${t(`UI.meta.title.suffix`)}`
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title"/>
            </Head>
            <form
                noValidate
                onSubmit={onSubmitForm}
                onKeyPress={onSubmitFormFromKeyboard}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label={t(`UI.login.auth.email`)}
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            placeholder={t(`UI.login.auth.email-placeholder`)}
                            value={email}
                            error={!isAuthValid}
                            helperText={!isAuthValid ? t(`UI.login.auth.email-invalid`) : undefined}
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            label={t(`UI.login.auth.password`)}
                            variant="standard"
                            placeholder={t(`UI.login.auth.password-placeholder`)}
                            type="password"
                            autoComplete="current-password"
                            value={pass}
                            error={!isAuthValid}
                            helperText={!isAuthValid ? t(`UI.login.auth.password-invalid`) : undefined}
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setPass(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isRequestInProgress}
                        >
                            {t(`UI.login.auth.login`)}
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Link
                            href="#"
                            onClick={onOpenResetForm}
                        >
                            {t(`UI.login.auth.forgot-password`)}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    )
};

// Экспортируем компонент
export default AuthorizationHoc()(LoginForm)