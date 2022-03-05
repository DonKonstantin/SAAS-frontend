import {FC, useState} from "react";
import {Button, FormControlLabel, Stack, Switch} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useCheckMediaFilesContext} from "./CheckMediaFilesContext";
import {CheckBox} from "@mui/icons-material";

const CheckMediaFilesControls: FC = () => {
    const {t} = useTranslation();
    const {
        runCheck,
        downloadPlaylist,
        isChecked,
        resetCheck,
        isError,
    } = useCheckMediaFilesContext();
    const [allowedDoubles, setAllowedDoubles] = useState(false)

    if (isChecked) {
        return (
            <Stack spacing={2} flexWrap={"wrap"} direction="row" justifyContent={"flex-end"}>
                <FormControlLabel
                    label={"С дублями"}
                    value={allowedDoubles}
                    control={
                        <Switch
                            onChange={event => setAllowedDoubles(event.target.checked)}
                        />

                    }
                />
                <Button variant={"outlined"} onClick={() => downloadPlaylist(allowedDoubles)} disabled={isError}>{t("Выгрузить")}</Button>
                <Button variant={"outlined"} onClick={() => resetCheck()}>{t("Сбросить")}</Button>
            </Stack>
        )
    }

    return (
        <Stack spacing={2} flexWrap={"wrap"} direction="row" justifyContent={"flex-end"}>
            <Button variant={"outlined"} onClick={() => runCheck()}>{t("Проверить")}</Button>
        </Stack>
    )
}

export default CheckMediaFilesControls;
