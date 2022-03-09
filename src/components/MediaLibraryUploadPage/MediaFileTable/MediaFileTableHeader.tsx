import {FC} from "react";
import {TableCell, TableHead, TableRow} from "@mui/material";

const MediaFileTableHeader: FC = () => {
    /**
     * TODO: Добавить сортировку по полям
     */
    return (
        <TableHead>
            <TableRow>
                <TableCell>Название файла</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Размер</TableCell>
                <TableCell>Прогресс</TableCell>
                <TableCell>Мета-теги</TableCell>
                <TableCell
                align={'right'}
                >Действия</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default MediaFileTableHeader;
