import React, {FC, useEffect, useState} from "react";
import {useEntityEdit} from "../../context/EntityEditContext";
import LoadingBlocker from "../LoadingBlocker";
import {Grid} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import {Box} from "@mui/system";
import Group from "./Group";
import {EditPageConfiguration} from "../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../settings/pages";
import {distinctUntilChanged} from "rxjs";
import ActionButtons from "./ActionButtons";

// Компонент страницы редактирования
const EditPage: FC = () => {
    const [config, setConfig] = useState<EditPageConfiguration>()
    const {entityData} = useEntityEdit(distinctUntilChanged(
        (previous, current) => {
            const prev = previous?.entityData ? 1 : 2
            const next = current?.entityData ? 1 : 2

            return prev === next
        }
    ))

    useEffect(() => {
        if (!entityData) {
            return
        }

        const {schema} = entityData
        const conf = editSchemaConfiguration()[schema]
        if (!conf) {
            return
        }

        setConfig(conf as any)
    }, [entityData])

    if (!entityData || !config) {
        return <LoadingBlocker/>
    }

    return (
        <>
            <Box sx={{pb: 3}}>
                <Breadcrumbs/>
            </Box>
            <Box sx={{width: '100%', pb: 12}}>
                <Grid container spacing={3}>
                    {config.groups.map((group, i) => (
                        <Group config={group} key={i}/>
                    ))}
                </Grid>
            </Box>
            <ActionButtons />
        </>
    )
}

// Экспортируем компонент
export default EditPage