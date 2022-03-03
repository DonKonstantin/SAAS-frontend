import React, {FC, useEffect} from "react";
import {Grid, Paper, Stack} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import {Box} from "@mui/system";
import MediaUploadArea from "./MediaUploadArea";
import {useMediaLibraryUpload} from "./MediaFilesUploadContext";
import {distinctUntilChanged} from "rxjs";
import MediaFileEditDialog from "../MediaFileEditDialog";
import MediaFileTable from "./MediaFileTable";
import {useEditMediaFilesModal} from "../MediaFileEditDialog/MediaFileEditDialogContext";
import MediaLibraryUploadLicenseType from "./MediaLibraryUploadLicenseType";
import MediaLibraryUploadControls from "./MediaLibraryUploadControls";
import MediaLibraryProgressStatus from "./MediaLibraryProgressStatus";

const MediaLibraryUploadPage: FC = () => {
    const {
        initMediaFilesUploadContext,
        updateMediaInfoFile
    } = useMediaLibraryUpload(distinctUntilChanged(() => true))
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
            <Stack spacing={2}>
                <Paper sx={{p: "20px 40px"}}>
                    <MediaLibraryUploadLicenseType/>
                </Paper>
                <Paper sx={{p: "20px 40px"}}>
                    <MediaUploadArea/>
                    <MediaFileTable/>
                    <MediaLibraryProgressStatus/>
                    <MediaLibraryUploadControls/>
                </Paper>
            </Stack>
            <MediaFileEditDialog
                onSave={updateMediaInfoFile}
            />
        </>
    )
}

export default MediaLibraryUploadPage;
