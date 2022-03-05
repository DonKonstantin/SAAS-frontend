import {FC} from "react";
import {Button, Stack} from "@mui/material";
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

    if (isChecked) {
        return (
            <Stack spacing={2} flexWrap={"wrap"} direction="row" justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={() => downloadPlaylist()} disabled={isError}>{t("Выгрузить")}</Button>
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
