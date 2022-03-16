import React, {FC} from "react";
import {useSystemLogsFilterEntity} from "../SystemLogsEntityContext";
import {Button, Grid, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {SystemLogsFilterConfiguration} from "../systemLogsFilterConfiguration";
import SystemLogsFilterField from "./SystemLogsFilterField";

const SystemLogsFilter: FC = () => {
    const {resetFilter} = useSystemLogsFilterEntity();
    const {t} = useTranslation();

    return (
        <Grid container spacing={2}>
            {Object.keys(SystemLogsFilterConfiguration || {}).map((key: any) => (
                <Grid item xs={12} key={`${key}-grid`}>
                    <SystemLogsFilterField fieldCode={key} key={key}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Tooltip title={t(`pages.SystemLogs.filter.button.resetFilter.tooltip`) as string}>
                    <Button sx={{mt: 3}} variant={"outlined"} fullWidth onClick={resetFilter}>
                        {t(`pages.SystemLogs.filter.button.resetFilter.text`)}
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    )

}

export default SystemLogsFilter;
