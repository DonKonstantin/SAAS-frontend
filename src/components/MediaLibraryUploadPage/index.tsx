import React, {FC, useCallback, useEffect} from "react";
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
import SelectReplaceFileDialog from "./SelectReplaceFileDialog";

const MediaLibraryUploadPage: FC = () => {
    const {
        initMediaFilesUploadContext,
        updateMediaInfoFile,
        setReplacedTargetFile
    } = useMediaLibraryUpload(distinctUntilChanged(() => true))
    const {initEditFileForm} = useEditMediaFilesModal(distinctUntilChanged(() => true));

    useEffect(() => initMediaFilesUploadContext(), []);
    useEffect(() => initEditFileForm(), []);

    const handleSelectRaplacedFile = useCallback((file, replacedFile) => {
        if ( !replacedFile) {
            return;
        }

        setReplacedTargetFile(file, replacedFile.id);
    }, [setReplacedTargetFile]);

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
            <SelectReplaceFileDialog
                onSave={handleSelectRaplacedFile}
            />
        </>
    )
}

export default MediaLibraryUploadPage;
