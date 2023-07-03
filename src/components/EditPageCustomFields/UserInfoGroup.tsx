import React, {FC} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Divider, Grid, Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useTranslation} from "react-i18next";

// Компонент вывода группы личных данных пользователя
const UserInfoGroup: FC<EditFormGroupProperties> = ({config}) => {
    const {fields, isVisible = () => true, sizes = {xs: 12}} = config
    const {t} = useTranslation()
    const {entityData} = useEntityEdit(distinctUntilChanged())
    if (!entityData) {
        return null
    }

    const {values} = entityData
    if (!isVisible(values)) {
        return null
    }

    return (
        <Grid item {...sizes}>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', p: 3, pt: 2}}>
                    <Box sx={{p: 1.5, pl: 2, pt: 0}}>
                        <Typography color="primary">{t(`entity-edit.fields.user-info-group.title`)}</Typography>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} sx={{mt: 0}}>
                        {fields.map(({field, size = {xs: 12}, component: Component}) => (
                            <Grid item {...size} key={`${field}-grid`}>
                                <Component key={field} fieldCode={field} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

// Экспортируем компонент
export default UserInfoGroup