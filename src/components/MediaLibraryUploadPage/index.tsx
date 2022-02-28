import React, {FC, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import {Box} from "@mui/system";
import MediaUploadArea from "./MediaUploadArea";
import {useMediaLibraryUpload} from "./MediaFilesUploadContext";
import {distinctUntilChanged} from "rxjs";
import MediaFileEditDialog from "../MediaFileEditDialog";
import MediaFileTable from "./MediaFileTable";
import {useEditMediaFilesModal} from "../MediaFileEditDialog/MediaFileEditDialogContext";

const MediaLibraryUploadPage: FC = props => {
    const {initMediaFilesUploadContext} = useMediaLibraryUpload(distinctUntilChanged(() => true))
    const {initEditFileForm} = useEditMediaFilesModal(distinctUntilChanged(() => true));

    useEffect(() => initMediaFilesUploadContext(), []);
    useEffect(() => initEditFileForm(), []);

    return (
        <>
            <Box sx={{pb: 3}}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item sx={{flex: "1 1 0"}}>
                        <Breadcrumbs/>
                    </Grid>
                </Grid>
            </Box>
            <Paper sx={{p: "20px 40px"}}>
                <MediaUploadArea/>
                <MediaFileTable/>
            </Paper>
            <MediaFileEditDialog/>
        </>
    )
}

export default MediaLibraryUploadPage;
