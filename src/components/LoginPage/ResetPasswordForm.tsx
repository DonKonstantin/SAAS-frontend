import React, {FC, FormEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../context/AuthorizationContext";
import Head from "next/head";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

// Свойства компонента
export type ResetPasswordFormProps = WithAuthorization<{
    // Переключение формы "Забыли пароль" на авторизацию
    onToggleForm: { (): void }
}>;

// Компонент вывода формы "Забыли пароль"
const ResetPasswordForm: FC<ResetPasswordFormProps> = props => {
    const {
        onToggleForm,
        onResetPassword,
        isRequestInProgress,
    } = props

    const {t} = useTranslation()

    // State формы
    const [email, setEmail] = useState("")
    const [isValid, setIsValid] = useState(true)

    // Сбрасываем флаг ошибки Email
    useEffect(() => {
        setIsValid(true)
    }, [email])

    // Обработка сброса пароля пользователя
    const onResetPasswordForUser = async () => {
        if (isRequestInProgress) {
            return
        }

        if (0 === email.length) {
            setIsValid(false)

            return
        }

        await onResetPassword(email)
    }

    // Обработка отправки формы "Забыли пароль"
    const onSubmitForm: FormEventHandler<HTMLFormElement> = e => {
        e.stopPropagation()
        e.preventDefault()

        onResetPasswordForUser()
    }

    // Обработка отправки формы "Забыли пароль" с клавиатуры при помощи Enter
    const onSubmitFormFromKeyboard: KeyboardEventHandler<HTMLFormElement> = event => {
        if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey) {
            return
        }

        event.stopPropagation()
        event.preventDefault()

        return onResetPasswordForUser()
    }

    // Обработка перехода на форму авторизации
    const onOpenAuthorization: MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation()
        event.preventDefault()

        onToggleForm()
    }

    const title = `${t(`UI.meta.title.prefix`)}${t(`UI.login.forgot-password.title`)}${t(`UI.meta.title.suffix`)}`
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
                        <Typography color="primary">
                            {t(`UI.login.forgot-password.caption`)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label={t(`UI.login.forgot-password.email`)}
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            placeholder={t(`UI.login.forgot-password.email-placeholder`)}
                            value={email}
                            error={!isValid}
                            helperText={!isValid ? t(`UI.login.forgot-password.email-invalid`) : undefined}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isRequestInProgress}
                        >
                            {t(`UI.login.forgot-password.send`)}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="button"
                            fullWidth
                            variant="text"
                            color="primary"
                            disabled={isRequestInProgress}
                            onClick={onOpenAuthorization}
                        >
                            {t(`UI.login.forgot-password.login`)}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
};

// Экспортируем компонент
export default AuthorizationHoc()(ResetPasswordForm)