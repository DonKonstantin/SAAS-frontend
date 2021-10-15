import {FC, useRef} from "react";
import {useEntityList} from "../../context/EntityListContext";
import {Button, Tooltip} from "@mui/material";
import {listSchemaConfiguration} from "../../settings/pages";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {useAuthorization} from "../../context/AuthorizationContext";
import {PageWithEntityList} from "../ListPage/types";
import CheckPermission from "../../services/helpers/CheckPermission";

// Компонент вывода кнопки создания элемента
const ListPageCreationButton: FC<PageWithEntityList> = props => {
    const {
        permissionCheckEditPermission,
        permissionCheckLevel = "project",
    } = props

    const {data} = useEntityList()
    if (!data) {
        return null
    }

    const {schema} = data
    const config = useRef(listSchemaConfiguration()[schema])
    if (!config.current) {
        return null
    }

    const {userInfo} = useAuthorization()
    if (!userInfo) {
        return null
    }

    if (permissionCheckEditPermission && !CheckPermission(userInfo, permissionCheckEditPermission, permissionCheckLevel)) {
        return null
    }

    const {addPageUrl: {href, as}} = config.current
    const router = useRouter()
    const {t} = useTranslation()

    // Обработка перехода на страницу создания элемента
    const onClick = () => {
        return router.push(href, as)
    }

    return (
        <Tooltip title={t(`entity-list.components.actions.add-tooltip`) as string}>
            <Button variant={"outlined"} onClick={onClick}>
                {t(`entity-list.components.actions.add`)}
            </Button>
        </Tooltip>
    )
}

// Экспортируем компонент
export default ListPageCreationButton