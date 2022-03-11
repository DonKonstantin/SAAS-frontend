// Компонент вывода простой ячейки
import {Button, Tooltip} from "@mui/material";
import {useBulkEditFiles} from "../../context/BulkEditFilesContext";
import BulkMediaFileEditDialog from "../BulkMediaFileEditDialog";
import React from "react";
import {ListHeaderProps} from "../ListPageParts/TableCaption";
import {withPageProps} from "../../layouts/PagePropsProvider";
import {useEntityList} from "../../context/EntityListContext";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import mediaLibraryService from "../../services/MediaLibraryService";
import {FileUpdateSetType} from "../../services/MediaLibraryService/query/UpdateFilesByIdMutation";
import SingleEditFile from "../MediaFileEditDialog/SingleEditFile";

// Обработка редактируемых данных для одного элемента
const getUpdatedFieldsForSingle = (file: MediaFile) => {

    return {
        title: file.title,
        artist: file.artist,
        album: file.album,
        year: Number(file.year),
        genre: file.genre,
        language: file.language,
        license_type: file.license_type,
        bpm: Number(file.bpm),
        isrc: file.isrc,
        lyricist: file.isrc,
        composer: file.composer,
        publisher: file.publisher,
    } as unknown as FileUpdateSetType
}

// Обработка данных для множественной редактирования
const getUpdatedFieldsForPlural = (file: MediaFile) => {

    let fieldToUpdate:FileUpdateSetType = {}

    file.artist !== '' && (fieldToUpdate['artist'] = file.artist)
    file.album !== '' && (fieldToUpdate['album'] = file.album)
    file.year !== 0 && (fieldToUpdate['year'] = Number(file.year))
    file.genre !== '' && (fieldToUpdate['genre'] = file.genre)
    file.language !== '' && (fieldToUpdate['language'] = file.language)
    file.lyricist !== '' && (fieldToUpdate['lyricist'] = file.lyricist)
    file.composer !== '' && (fieldToUpdate['composer'] = file.composer)

    if (fieldToUpdate === {}) {
        return undefined
    }

    return fieldToUpdate
}

// Компонент ячейки массового изменения элементов
const BulkEditing = (props: ListHeaderProps) => {
    const {checkedItems} = props
    const {toggleBulkEditFiles} = useBulkEditFiles()
    const {reloadedListingData} = useEntityList()

    // Метод открытия диаолга массового изменения элементов
    const handleToggleBulkEditFiles = () => {
        toggleBulkEditFiles(true)
    }

    // Пост метод после подтверждения действия в диалоге единичного изменения
    const handleSingleUpdateFile = async (file: MediaFile) => {
        const fieldToUpdate = getUpdatedFieldsForSingle(file)

        const res = await mediaLibraryService().update([file.id], fieldToUpdate)

        if (res !== 0) {
            reloadedListingData()
        }
    }

    // Пост метод после подтверждения действия в диалоге массового изменения
    const handlePluralUpdateFile = async (file: MediaFile) => {
        const fieldToUpdate = getUpdatedFieldsForPlural(file)

        if (fieldToUpdate === undefined) {
            return
        }

        const res = await mediaLibraryService().update(checkedItems, fieldToUpdate)

        if (res !== 0) {
            reloadedListingData()
        }
    }

    return (
        <>
            <Tooltip title={'Массовое редактирование'}>
                <Button variant={"outlined"} onClick={handleToggleBulkEditFiles}>
                    Массовое редактирование
                </Button>
            </Tooltip>
            <SingleEditFile onSave={handleSingleUpdateFile}/>
            <BulkMediaFileEditDialog onSave={handlePluralUpdateFile}/>
        </>

    )
}

// Экспортируем компонент
export default withPageProps(BulkEditing)
