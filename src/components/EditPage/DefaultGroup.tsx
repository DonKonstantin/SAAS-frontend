import React, {FC} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Grid, Paper, Box} from "@mui/material";

// Компонент вывода группы по умолчанию
const DefaultGroup: FC<EditFormGroupProperties> = ({config}) => {
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
                    <Grid container spacing={2}>
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
export default DefaultGroup