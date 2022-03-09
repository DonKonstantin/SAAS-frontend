import {FC} from "react";
import {useCheckMediaFilesContext} from "./CheckMediaFilesContext";
import CheckMediaFilesItem from "./CheckMediaFilesItem";
import {Alert, Box, Skeleton, Stack} from "@mui/material";
import CheckMediaFilesInput from "./CheckMediaFilesInput";

const CheckMediaFilesList: FC = () => {
    const {fileCheckResult, isChecked, isError, isCheckProgress} = useCheckMediaFilesContext();

    if (isCheckProgress) {
        return (
            <Stack sx={{pt:2}}>
                <Skeleton variant={"text"}/>
                <Skeleton variant={"text"}/>
                <Skeleton variant={"text"}/>
                <Skeleton variant={"text"}/>
                <Skeleton variant={"text"}/>
                <Skeleton variant={"text"}/>
            </Stack>
        )
    }

    if (isError) {
        return (
            <div>
                <Alert severity={"error"} sx={{mt: 2}}>Не удалось провести проверку</Alert>
            </div>
        )
    }

    if (!isChecked) {
        return (
            <CheckMediaFilesInput/>
        )
    }

    return (
        <Box
            sx={{overflowY: "auto", pt:2}}
        >
            <Stack spacing={1}>
                {fileCheckResult.map(file => (
                    <CheckMediaFilesItem {...file} />
                ))}
            </Stack>
        </Box>
    )
}

export default CheckMediaFilesList;
