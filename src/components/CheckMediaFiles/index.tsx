import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Button, Paper, Typography} from "@mui/material";
import M3uService from "../../services/M3uService/M3uService";

const m3ui = new M3uService();

const CheckMediaFiles: FC = props => {
    const {t} = useTranslation();

    const click =  () => {
        m3ui.createPlaylist(['/home/dmitry/Загрузки/Metallica - The Unforgiven (копия).mp3', "/home/dmitry/Загрузки/sample3.mp3"]);
    }

    return (
        <Paper sx={{p:2}}>
            <Typography color={"primary"}>{t("Проверка композиций")}</Typography>

            <Button onClick={click}>Export in m3u</Button>
        </Paper>
    )
}

export default CheckMediaFiles;
