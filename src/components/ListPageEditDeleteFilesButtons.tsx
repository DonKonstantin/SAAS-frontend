import {ListFieldRow} from "../services/listDataLoader/listLoader/types";
import {PageWithEntityList} from "./ListPage/types";
import {IconButton, TableCell, Tooltip} from "@mui/material";
import {FC, MouseEventHandler, useEffect, useRef} from "react";
import {useEntityList} from "../context/EntityListContext";
import {useAuthorization} from "../context/AuthorizationContext";
import CheckPermission from "../services/helpers/CheckPermission";
import {useTranslation} from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {withPageProps} from "../layouts/PagePropsProvider";
import {listSchemaConfiguration} from "../settings/pages";
import {useEditMediaFilesModal} from "./MediaFileEditDialog/MediaFileEditDialogContext";
import {MediaFile} from "../services/MediaLibraryService/interface";
import {TemplateMediaFile} from "./ListPageCustom/CustomStatusCell";
import {distinctUntilChanged} from "rxjs";

// Свойства компонента
type ListPageEditDeleteButtonsProps = PageWithEntityList
    & { item: ListFieldRow }

// Компонент вывода кнопокредактирования и удаления для страниц листинга
const ListPageEditDeleteFilesButtons: FC<ListPageEditDeleteButtonsProps> = props => {
    const {
        item,
        permissionCheckEditPermission,
        permissionCheckDeletePermission = permissionCheckEditPermission,
        permissionCheckLevel = "project",
        permissionCheckEditLevel = permissionCheckLevel,
        permissionCheckDeleteLevel = permissionCheckEditLevel,
    } = props

    const {t} = useTranslation()



    const {data, onDeleteItems} = useEntityList()

    if (!data) {
        return <TableCell className="list-table-cell"/>
    }

    const {schema} = data
    const config = useRef(listSchemaConfiguration()[schema])
    if (!config.current) {
        return <TableCell className="list-table-cell"/>
    }

    const {userInfo} = useAuthorization()
    if (!userInfo) {
        return <TableCell className="list-table-cell"/>
    }

    const notHasEditAccess = permissionCheckEditPermission && !CheckPermission(userInfo, permissionCheckEditPermission, permissionCheckEditLevel)
    const notHasDeleteAccess = permissionCheckDeletePermission && !CheckPermission(userInfo, permissionCheckDeletePermission, permissionCheckDeleteLevel)

    if (notHasEditAccess && notHasDeleteAccess) {
        return <TableCell className="list-table-cell"/>
    }

    const {initEditFileForm,setEditFile} = useEditMediaFilesModal(distinctUntilChanged(() => true));

    useEffect(() => initEditFileForm(), []);
    //Обработка нажатия на кнопку редактирования
    const file: MediaFile = Object.keys(item.columnValues).reduce((acc, element) => {
        acc = {
            ...acc,
            [element]: item.columnValues[element].value
        }
        return acc
    }, TemplateMediaFile)

    const handleEditFile = () => {
        setEditFile(file)
    };

    // Обработка нажатия на кнопку удаления
    const onDelete: MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation()
        event.preventDefault()

        return onDeleteItems([item.primaryKeyValue])
    }

    return (
        <TableCell
            className="list-table-cell"
            align="right"
            sx={{pt: 0, pb: 0}}
        >
            {!notHasEditAccess && (
                <Tooltip title={t(`entity-list.components.actions.edit-tooltip`) as string}>
                    <IconButton size="small" onClick={handleEditFile}>
                        <EditIcon fontSize="medium"/>
                    </IconButton>
                </Tooltip>
            )}
            {!notHasDeleteAccess && (
                <Tooltip title={t(`entity-list.components.actions.delete-tooltip`) as string}>
                    <IconButton size="small" onClick={onDelete}>
                        <DeleteIcon fontSize="medium"/>
                    </IconButton>
                </Tooltip>
            )}
        </TableCell>
    )
}

// Экспортируем компонент
export default withPageProps<{ item: ListFieldRow }>(ListPageEditDeleteFilesButtons)
