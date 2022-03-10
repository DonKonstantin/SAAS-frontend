// Компонент вывода простой ячейки
import {Button, Tooltip} from "@mui/material";
import {useBulkEditFiles} from "../../context/BulkEditFilesContext";
import BulkMediaFileEditDialog from "../BulkMediaFileEditDialog";
import MediaFileEditDialog from "../MediaFileEditDialog";
import React from "react";
import {ListHeaderProps} from "../ListPageParts/TableCaption";
import {withPageProps} from "../../layouts/PagePropsProvider";

const BulkEditing = (props:ListHeaderProps) => {
    console.log('props',props)
    const {toggleBulkEditFiles} = useBulkEditFiles()

    const handleToggleBulkEditFiles = () => {
        toggleBulkEditFiles(true)
    }

    return (
        <>
            <Tooltip title={'Массовое редактирование'}>
                <Button variant={"outlined"} onClick={handleToggleBulkEditFiles}>
                    Массовое редактирование
                </Button>
            </Tooltip>
            <BulkMediaFileEditDialog onSave={() => console.log('BulkMediaFileEditDialog')}/>
            <MediaFileEditDialog
                onSave={() => console.log('MediaFileEditDialog')}
            />
        </>

    )
}

// Экспортируем компонент
export default withPageProps(BulkEditing)
