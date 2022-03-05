import {FC, memo} from "react";
import {MediaFilesDoubles} from "../../services/MediaLibraryService/interface";
import {Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

type Props = {
    filePath: string;
    doubles?: MediaFilesDoubles;
}

// Компонент вывода результатов проверки файлов на дубли
const CheckMediaFilesItem: FC<Props> = (props) => {
    const {filePath, doubles} = props;

    return (
        <Typography>
            {filePath}
            {
                doubles?.doubles.length === 0 && (
                    <CheckIcon/>
                )
            }
            {
                doubles?.doubles.length !== 0 && (
                    <DoDisturbIcon/>
                )
            }
        </Typography>
    )
}

export default memo(CheckMediaFilesItem);
