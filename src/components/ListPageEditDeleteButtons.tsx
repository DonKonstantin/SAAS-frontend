import {ListFieldRow} from "../services/listDataLoader/listLoader/types";
import {PageWithEntityList} from "./ListPage/types";
import {IconButton, TableCell, Tooltip} from "@mui/material";
import {FC, MouseEventHandler, useRef} from "react";
import {useEntityList} from "../context/EntityListContext";
import {useAuthorization} from "../context/AuthorizationContext";
import CheckPermission from "../services/helpers/CheckPermission";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {withPageProps} from "../layouts/PagePropsProvider";
import {listSchemaConfiguration} from "../settings/pages";

// Свойства компонента
type ListPageEditDeleteButtonsProps = PageWithEntityList
    & { item: ListFieldRow }

// Компонент вывода кнопокредактирования и удаления для страниц листинга
const ListPageEditDeleteButtons: FC<ListPageEditDeleteButtonsProps> = props => {
    const {
        item,
        permissionCheckEditPermission,
        permissionCheckLevel = "project",
        permissionCheckEditLevel = permissionCheckLevel,
    } = props

    const {t} = useTranslation()
    const router = useRouter()

    const {data, onDeleteItems} = useEntityList()
    if (!data) {
        return <TableCell className="list-table-cell"/>
    }

    const {schema} = data
    const config = useRef(listSchemaConfiguration()[schema])
    if (!config.current) {
        return <TableCell className="list-table-cell"/>
    }

    const {editPageUrl} = config.current
    const {userInfo} = useAuthorization()
    if (!userInfo) {
        return <TableCell className="list-table-cell"/>
    }

    if (permissionCheckEditPermission && !CheckPermission(userInfo, permissionCheckEditPermission, permissionCheckEditLevel)) {
        return <TableCell className="list-table-cell"/>
    }

    // Обработка нажатия на кнопку редактирования
    const onEdit: MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation()
        event.preventDefault()

        const url = editPageUrl(item.primaryKeyValue)
        return router.push(url.href, url.as)
    }

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
            <Tooltip title={t(`entity-list.components.actions.edit-tooltip`) as string}>
                <IconButton size="small" onClick={onEdit}>
                    <EditIcon fontSize="medium"/>
                </IconButton>
            </Tooltip>
            <Tooltip title={t(`entity-list.components.actions.delete-tooltip`) as string}>
                <IconButton size="small" onClick={onDelete}>
                    <DeleteIcon fontSize="medium"/>
                </IconButton>
            </Tooltip>
        </TableCell>
    )
}

// Экспортируем компонент
export default withPageProps<{ item: ListFieldRow }>(ListPageEditDeleteButtons)