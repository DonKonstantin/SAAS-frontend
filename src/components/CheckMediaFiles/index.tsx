import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Divider, Grid, Paper, Typography} from "@mui/material";
import CheckMediaFilesControls from "./CheckMediaFilesControls";
import CheckMediaFilesList from "./CheckMediaFilesList";

const CheckMediaFiles: FC = () => {
    const {t} = useTranslation();

    return (
        <Paper sx={{
            p: 2,
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            border: "1px solid #E5E5E5"
        }}>
            <div>
                <Typography color={"primary"}>{t("Проверка композиций")}</Typography>
                <Divider sx={{mt: 2}}/>
            </div>
            <CheckMediaFilesList/>
            <Grid container alignItems={"center"}>
                <Grid item xs={12}>
                    <Divider sx={{mt: 2, mb: 2}}/>
                </Grid>
                <Grid item xs={12}>
                    <CheckMediaFilesControls/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CheckMediaFiles;
