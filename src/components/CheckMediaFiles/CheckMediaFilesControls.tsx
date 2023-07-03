import {FC, useState} from "react";
import {Button, FormControlLabel, Stack, Switch, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useCheckMediaFilesContext} from "./CheckMediaFilesContext";

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
                <Tooltip title={t(`Добавить файлы дублей в плейлист`) as string}>
                <FormControlLabel
                    label={"С дублями"}
                    control={
                        <Switch
                            checked={allowedDoubles}
                            onChange={event => setAllowedDoubles(event.target.checked)}
                        />

                    }
                />
                </Tooltip>
                <Tooltip title={t(`Скачать файл плейлиста в формате m3u`) as string}>
                    <Button
                        variant={"outlined"}
                        onClick={() => downloadPlaylist(allowedDoubles)}
                            disabled={isError}
                    >
                        {t("Выгрузить")}
                    </Button>
                </Tooltip>
                <Tooltip title={t(`Вернуться к редактированию списка`) as string} placement={"bottom-end"}>
                    <Button variant={"outlined"} color="warning" onClick={() => resetCheck()}>{t("Сбросить")}</Button>
                </Tooltip>
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
