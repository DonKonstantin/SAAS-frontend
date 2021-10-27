import React, {FC, FormEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../context/AuthorizationContext";
import Head from "next/head";
import {Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {useTranslation} from "react-i18next";
import {PasswordValidator} from "../../services/validation/validators/passwordValidator";
import {notificationsDispatcher} from "../../services/notifications";

// Свойства компонента
export type ChangePasswordFormProps = WithAuthorization<{
    // Токен сброса пароля
    changePasswordToken: string

    // Переключение формы изменения пароля пользователя на авторизацию
    onToggleForm: { (): void }
}>;

// Компонент вывода формы изменения пароля пользователя
const ChangePasswordForm: FC<ChangePasswordFormProps> = props => {
    const {
        changePasswordToken,
        onToggleForm,
        onChangePasswordByResetToken,
        isRequestInProgress,
    } = props

    const {t} = useTranslation()

    // State формы
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    // Валидация паролей
    const [isValid, setIsValid] = useState(true)

    // Сбрасываем флаг ошибки Email
    useEffect(() => {
        setIsValid(true)
    }, [password, passwordConfirm])

    // Обработка сброса пароля пользователя
    const onChangePasswordForUser = async () => {
        if (isRequestInProgress) {
            return
        }

        const validator = PasswordValidator({})
        const validation = await validator.Validate({
            additionData: {id: {password: password, confirm: passwordConfirm}},
            allValues: {},
            primaryKey: "",
            value: ""
        })

        if (!!validation) {
            setIsValid(false)

            notificationsDispatcher().dispatch({
                message: validation,
                type: "warning"
            })

            return
        }

        await onChangePasswordByResetToken(changePasswordToken, password)
    }

    // Обработка отправки формы изменения пароля пользователя
    const onSubmitForm: FormEventHandler<HTMLFormElement> = e => {
        e.stopPropagation()
        e.preventDefault()

        onChangePasswordForUser()
    }

    // Обработка отправки формы изменения пароля пользователя с клавиатуры при помощи Enter
    const onSubmitFormFromKeyboard: KeyboardEventHandler<HTMLFormElement> = event => {
        if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey) {
            return
        }

        event.stopPropagation()
        event.preventDefault()

        return onChangePasswordForUser()
    }

    // Обработка перехода на форму авторизации
    const onOpenAuthorization: MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation()
        event.preventDefault()

        onToggleForm()
    }

    const title = `${t(`UI.meta.title.prefix`)}${t(`UI.login.change-password.title`)}${t(`UI.meta.title.suffix`)}`
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
                            {t(`UI.login.change-password.caption`)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            label={t(`UI.login.change-password.password`)}
                            variant="standard"
                            placeholder={t(`UI.login.change-password.password-placeholder`)}
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            error={!isValid}
                            helperText={!isValid ? t(`UI.login.change-password.password-invalid`) : undefined}
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password-confirm"
                            name="password-confirm"
                            label={t(`UI.login.change-password.password-confirm`)}
                            variant="standard"
                            placeholder={t(`UI.login.change-password.password-confirm-placeholder`)}
                            type="password"
                            autoComplete="new-password"
                            value={passwordConfirm}
                            error={!isValid}
                            helperText={!isValid ? t(`UI.login.change-password.password-confirm-invalid`) : undefined}
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => setPasswordConfirm(e.target.value)}
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
                            {t(`UI.login.change-password.send`)}
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
                            {t(`UI.login.change-password.login`)}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
};

// Экспортируем компонент
export default AuthorizationHoc()(ChangePasswordForm)