import React, {FC} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import PlayAudioButton from "../AudioPlayeContainer/PlayAudioButton";

// Компонент вывода простой ячейки
const CustomSongNameWithPlayCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration, value} = props;

    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <div className={'custom-song-with-play-cell'}>
                <div>
                    <PlayAudioButton
                        fileName={value.value}
                    />
                </div>
                <div>{value.value}</div>
            </div>
        </TableCell>
    )
}

// Экспортируем компонент
export default CustomSongNameWithPlayCell
