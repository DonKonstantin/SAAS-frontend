import {FC} from "react";
import {TableCell, TableHead, TableRow} from "@mui/material";

const MediaFileTableHeader: FC =props => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Название файла</TableCell>
                <TableCell>Размер</TableCell>
                <TableCell>Прогресс</TableCell>
                <TableCell width={90}>Статус</TableCell>
                <TableCell
                align={'right'}
                >Действия</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default MediaFileTableHeader;
