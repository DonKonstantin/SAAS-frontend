import {FC, memo, useMemo, useState} from "react";
import exampleVariablesJSON from "./exampleVariablesJSON";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useTranslation} from "react-i18next";

type Props = {
    onSelect(presetVariables: Record<string, unknown>): void
}

/**
 * Component for choose preset data on notification preview block
 * @param props
 */
const NotificationPresetVariables: FC<Props> = props => {
    const {onSelect} = props;

    const [entity, setEntity] = useState<string | undefined>(undefined);
    const [event, setEvent] = useState<string | undefined>(undefined);
    const {t} = useTranslation();

    const entityList = Object.keys(exampleVariablesJSON);

    const eventList = useMemo(() => {
        if (!entity) {
            return []
        }

        if (!Object.prototype.hasOwnProperty.call(exampleVariablesJSON, entity)) {
            return []
        }

        return Object.keys(exampleVariablesJSON[entity]);
    }, [entity]);

    const handleChange = () => {
        if (!entity || !event) {
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(exampleVariablesJSON, entity)) {
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(exampleVariablesJSON[entity], event)) {
            return;
        }

        onSelect(exampleVariablesJSON[entity][event].variables);
    }

    return (
        <>
            <Typography>
                {t("pages.notifications_template.edit.dialog.preview.presetVariablesHint")}
            </Typography>
            <Grid container spacing={2} alignItems={"center"} sx={{mb: 2, mt: 0.5}}>
                <Grid item lg={5}>
                    <FormControl variant="outlined" fullWidth size={"small"}>
                        <InputLabel id="preset-variables-entity">
                            {t("pages.notification_config.list.fields.entity")}
                        </InputLabel>
                        <Select
                            labelId={"preset-variables-entity"}
                            value={entity}
                            onChange={e => setEntity(e.target.value)}
                            label={t("pages.notification_config.list.fields.entity")}
                        >
                            {
                                entityList.map(entity => (
                                    <MenuItem value={entity}>
                                        {t(`pages.notification_config.list.fields.entity-enum.${entity}`)}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={4}>
                    <FormControl variant="outlined" fullWidth size={"small"}>
                        <InputLabel id="preset-variables-event">
                            {t("pages.notification_config.list.fields.event_type")}
                        </InputLabel>
                        <Select
                            labelId={"preset-variables-event"}
                            value={event}
                            onChange={e => setEvent(e.target.value)}
                            disabled={!entity}
                            label={t("pages.notification_config.list.fields.event_type")}
                        >
                            {
                                eventList.map(event => (
                                    <MenuItem value={event}>
                                        {t(`pages.notification_config.list.fields.event_type-enum.${event}`)}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={3}>
                    <Button
                        onClick={handleChange}
                        fullWidth
                        size={"large"}
                        variant={"outlined"}
                        disabled={!entity && !event}
                    >
                        <ArrowUpwardIcon/>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}


export default memo(NotificationPresetVariables, () => true);
