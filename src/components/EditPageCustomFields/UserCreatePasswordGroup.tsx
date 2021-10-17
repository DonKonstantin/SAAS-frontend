import React, {FC} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useTranslation} from "react-i18next";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Divider, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";

// Компонент вывода группы создания пароля
const UserCreatePasswordGroup: FC<EditFormGroupProperties> = ({config}) => {
    const {isVisible = () => true, sizes = {xs: 12}} = config
    const {t} = useTranslation()
    const {entityData, validation, onChangeAdditionData, onChangeFieldValue} = useEntityEdit(distinctUntilChanged())
    if (!entityData) {
        return null
    }

    const {values, additionData} = entityData
    if (!isVisible(values)) {
        return null
    }

    const {password, confirm} = additionData['id'] as { password: string, confirm: string }

    return (
        <Grid item {...sizes}>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', p: 3, pt: 2}}>
                    <Box sx={{p: 1.5, pl: 2, pt: 0}}>
                        <Typography color="primary">{t(`entity-edit.fields.user-create-password.title`)}</Typography>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} sx={{mt: 0}}>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label={t(`entity-edit.fields.user-create-password.password`)}
                                variant="standard"
                                placeholder={t(`entity-edit.fields.user-create-password.password-placeholder`)}
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                error={!!validation['id']}
                                helperText={!!validation['id'] ? t(validation['id']) : undefined}
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
                                    onChangeFieldValue('id', () => "")
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
                                label={t(`entity-edit.fields.user-create-password.password-confirm`)}
                                variant="standard"
                                placeholder={t(`entity-edit.fields.user-create-password.password-confirm-placeholder`)}
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
                                    onChangeFieldValue('id', () => "")
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
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

// Экспортируем компонент
export default UserCreatePasswordGroup