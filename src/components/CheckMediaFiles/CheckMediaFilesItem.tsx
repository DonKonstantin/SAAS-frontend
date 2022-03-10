import {FC, memo} from "react";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import {Box, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

type Props = {
    fileName: string;
    doubles?: MediaFile[];
}

// Компонент вывода результатов проверки файлов на дубли
const CheckMediaFilesItem: FC<Props> = (props) => {
    const {fileName, doubles} = props;

    const hasDoubles = !!doubles && doubles?.length > 0;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
            <Typography sx={{mr:1}}>
                {fileName}
            </Typography>

            {!hasDoubles && (
                <CheckIcon fontSize={"small"} color={"success"}/>
            )}
            {hasDoubles && (
                <DoDisturbIcon fontSize={"small"} color={'warning'}/>
            )}
        </Box>

    )
}

export default memo(CheckMediaFilesItem);
