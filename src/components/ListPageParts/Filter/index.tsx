import React, {FC, useRef} from "react";
import {useEntityList} from "../../../context/EntityListContext";
import {distinctUntilChanged} from "rxjs";
import {Button, Grid, Tooltip} from "@mui/material";
import {listSchemaConfiguration} from "../../../settings/pages";
import FilterField from "./FilterField";
import {useTranslation} from "react-i18next";

// Компонент вывода фильтра
const Filter: FC = () => {
    const {t} = useTranslation()
    const {data, onResetFilterValues} = useEntityList(distinctUntilChanged((previous, current) => previous.data?.schema === current.data?.schema))
    if (!data) {
        return null
    }

    const {schema} = data
    const config = useRef(listSchemaConfiguration()[schema])
    if (!config.current) {
        return null
    }

    return (
        <Grid container spacing={2}>
            {Object.keys(config.current?.filter || {}).map((key: any) => (
                <Grid item xs={12} key={`${key}-grid`}>
                    <FilterField fieldCode={key} key={key} />
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