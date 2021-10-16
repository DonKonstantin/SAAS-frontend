import React, {FC, useEffect, useState} from "react";
import {useEntityList} from "../../../context/EntityListContext";
import {distinctUntilChanged} from "rxjs";
import {Button, Grid, Tooltip} from "@mui/material";
import {listSchemaConfiguration} from "../../../settings/pages";
import FilterField from "./FilterField";
import {useTranslation} from "react-i18next";
import {ListPageConfiguration} from "../../../settings/pages/system/list";

// Компонент вывода фильтра
const Filter: FC = () => {
    const [config, setConfig] = useState<ListPageConfiguration>()
    const {t} = useTranslation()
    const {
        data,
        onResetFilterValues
    } = useEntityList(distinctUntilChanged((previous, current) => previous.data?.schema === current.data?.schema))

    useEffect(() => {
        if (!data) {
            return
        }

        const {schema} = data
        setConfig(listSchemaConfiguration()[schema])
    }, [data?.schema])

    if (!config || !data) {
        return null
    }

    return (
        <Grid container spacing={2}>
            {Object.keys(config.filter || {}).map((key: any) => (
                <Grid item xs={12} key={`${key}-grid`}>
                    <FilterField fieldCode={key} key={key}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Tooltip title={t(`entity-list.components.filter.reset-button.tooltip`) as string}>
                    <Button sx={{mt: 3}} variant={"outlined"} fullWidth onClick={onResetFilterValues}>
                        {t(`entity-list.components.filter.reset-button.caption`)}
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

// Экспортируем компонент
export default React.memo(Filter, () => true)