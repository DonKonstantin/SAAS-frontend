import React, {FC} from "react";
import AuthorizationHoc, {WithAuthorization} from "../context/AuthorizationContext";
import CheckPermission from "../services/helpers/CheckPermission";
import {Box} from "@mui/material";
import Link from "../components/Link";
import {Trans} from "react-i18next";
import {useRouter} from "next/router";

// Свойства страницы с проверкой разрешений
export type PageWithPermissionCheck = Partial<{
    permissionCheckPermission: string
    permissionCheckEditPermission: string
    permissionCheckCreatePermission: string
    permissionCheckDeletePermission: string
    permissionCheckLevel: "realm" | "domain" | "project"
    permissionCheckEditLevel: "realm" | "domain" | "project"
    permissionCheckCreateLevel: "realm" | "domain" | "project"
    permissionCheckDeleteLevel: "realm" | "domain" | "project"
}>

// Свойства провайдера
type PermissionProviderProps = WithAuthorization & PageWithPermissionCheck & {
    children: React.ReactNode
}

// Компонент провайдера проверки прав доступа
const PermissionProvider: FC<PermissionProviderProps> = props => {
    const {
        permissionCheckPermission,
        permissionCheckLevel = "project",
        userInfo,
        children,
    } = props
    const router = useRouter()

    if (["/404", "/500"].includes(router.pathname)) {
        return <>{children}</>
    }

    if (!userInfo) {
        return null
    }

    if (!permissionCheckPermission || CheckPermission(userInfo, permissionCheckPermission, permissionCheckLevel)) {
        return <>{children}</>
    }

    return (
        <Box sx={{width: "100%", p: 3, minHeight: "100%", position: "relative"}}>
            <div className={"permission-denied"}>
                <div><img src="/static/access-denied.png" alt="access-denied" /></div>
                <div>
                    <Trans i18nKey="UI.layouts.permissions.message">
                        У вас нет доступа в данный раздел. <Link href="/">Вернуться на главную</Link>
                    </Trans>
                </div>
            </div>
        </Box>
    )
}

// Свойства компонента
export default AuthorizationHoc()(PermissionProvider)