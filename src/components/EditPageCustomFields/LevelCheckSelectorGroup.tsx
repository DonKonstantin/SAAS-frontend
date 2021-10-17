import React, {FC} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Grid, Paper} from "@mui/material";
import {Box} from "@mui/system";

// Компонент вывода группы для редактирования уровней доступа
const LevelCheckSelectorGroup: FC<EditFormGroupProperties> = ({config}) => {
    const {fields, isVisible = () => true, sizes = {xs: 12}} = config
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
                    {fields.map(({field, component: Component}) => (
                        <Component key={field} fieldCode={field} />
                    ))}
                </Paper>
            </Box>
        </Grid>
    )
}

// Экспортируем компонент
export default LevelCheckSelectorGroup