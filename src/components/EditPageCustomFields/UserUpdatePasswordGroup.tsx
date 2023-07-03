import React, {FC, useState} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useTranslation} from "react-i18next";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Button, Divider, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import {PasswordValidator} from "../../services/validation/validators/passwordValidator";
import {setUserPasswordService} from "../../services/setUserPasswordService";
import {notificationsDispatcher} from "../../services/notifications";
import i18n from "i18next";

// Компонент вывода группы изменения пароля
const UserUpdatePasswordGroup: FC<EditFormGroupProperties> = ({config}) => {
    const {isVisible = () => true, sizes = {xs: 12}} = config
    const {t} = useTranslation()
    const [validation, setValidation] = useState<string | undefined>()
    const [inProgress, setInProgress] = useState(false)
    const {entityData, onChangeAdditionData} = useEntityEdit(distinctUntilChanged())
    if (!entityData) {
        return null
    }

    const {values, additionData, primaryKey} = entityData
    if (!isVisible(values)) {
        return null
    }

    const {password, confirm} = additionData['id'] as { password: string, confirm: string }

    // Обработчик изменения пароля
    const handleChangePassword = async () => {
        setInProgress(true)

        const validator = PasswordValidator({})
        const validation = await validator.Validate({
            additionData: additionData,
            allValues: values,
            primaryKey: "",
            value: ""
        })

        if (validation) {
            setInProgress(false)
            setValidation(validation)

            return
        }

        try {
            await setUserPasswordService().SetPassword(`${primaryKey}`,password)

            notificationsDispatcher().dispatch({
                message: i18n.t(`entity-edit.fields.user-update-password.messages.password-changed`),
                type: "info"
            })
        } catch (e) {
            notificationsDispatcher().dispatch({
                message: i18n.t(`entity-edit.fields.user-update-password.messages.password-change-error`),
                type: "warning"
            })
        }

        setInProgress(false)
    }

    return (
        <Grid item {...sizes}>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', p: 3, pt: 2}}>
                    <Box sx={{p: 1.5, pl: 2, pt: 0}}>
                        <Typography color="primary">{t(`entity-edit.fields.user-update-password.title`)}</Typography>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} sx={{mt: 0}}>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label={t(`entity-edit.fields.user-update-password.password`)}
                                variant="standard"
                                placeholder={t(`entity-edit.fields.user-update-password.password-placeholder`)}
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                error={!!validation}
                                helperText={!!validation ? t(validation) : undefined}
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={e => {
                                    setValidation(undefined)
                                    onChangeAdditionData(data => ({
                                        ...data,
                                        id: {
                                            ...data.id,
                                            password: e.target.value,
                                        }
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password-confirm"
                                name="password-confirm"
                                label={t(`entity-edit.fields.user-update-password.password-confirm`)}
                                variant="standard"
                                placeholder={t(`entity-edit.fields.user-update-password.password-confirm-placeholder`)}
                                type="password"
                                autoComplete="new-password"
                                value={confirm}
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={e => {
                                    setValidation(undefined)
                                    onChangeAdditionData(data => ({
                                        ...data,
                                        id: {
                                            ...data.id,
                                            confirm: e.target.value,
                                        }
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                sx={{mt: 1}}
                                disabled={inProgress}
                                onClick={handleChangePassword}
                                variant="outlined"
                            >
                                {t(`entity-edit.fields.user-update-password.set-password`)}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

// Экспортируем компонент
export default UserUpdatePasswordGroup