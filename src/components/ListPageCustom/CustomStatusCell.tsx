import React, {FC} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";
import MediaFileMetaTagStatus from "./MediaFileMetaTagStatus";

export const TemplateMediaFile: MediaFile = {
    album: "",
    artist: "",
    bpm: 0,
    composer: "",
    creation_date: "",
    creator: "",
    duration: 0,
    file_name: "",
    genre: "",
    hash_sum: "",
    id: "",
    isrc: "",
    language: "",
    last_change_date: "",
    last_editor: "",
    license_type: LicenseType.amurco,
    lyricist: "",
    mime_type: "audio/mpeg",
    obscene: false,
    origin_name: "",
    publisher: "",
    size: 0,
    title: "",
    uuid: "",
    year: 0,
}

// Компонент вывода простой ячейки
const CustomStatusCell: FC<ListFieldProperties<SimpleValues>> = props => {
    const {schema, configuration} = props;

    const {
        align = columnDirection(schema, configuration),
        width,
        padding
    } = configuration

    const file: MediaFile = Object.keys(props.rowValues).reduce((acc, item) => {
        acc = {
            ...acc,
            [item]: props.rowValues[item].value
        }
        return acc
    }, TemplateMediaFile)

    return (
        <TableCell className="list-table-cell" padding={padding} style={{width: width}} align={align}>
            <MediaFileMetaTagStatus file={file}/>
        </TableCell>
    )
}

// Экспортируем компонент
export default CustomStatusCell
