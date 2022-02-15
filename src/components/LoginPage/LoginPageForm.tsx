import React, {FC, useEffect} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../context/AuthorizationContext";
import LoginFormUiLayer from "./LoginFormUiLayer";
import {auditTime} from "rxjs";
import LoginPageFormContent from "./LoginPageFormContent";
import {useRouter} from "next/router";

// Свойства компонента страницы авторизации
export type LoginPageFormProps = WithAuthorization<{
    changePasswordToken?: string
    isNeedShowChangePassword?: boolean
    children: React.ReactNode
    domainId?: string
    projectId?: string
}>;

// Компонент вывода формы авторизации/восстановления пароля
const LoginPageForm: FC<LoginPageFormProps> = props => {
    const {
        authToken,
        userInfo,
        domainId,
        projectId,
        changePasswordToken = "",
        isNeedShowChangePassword = false,
        onRedirectToUserPage,
        isNeedRedirectAfterAuth,
        children,
        setDomain,
        setProject,
    } = props;
    const router = useRouter()

    // Пробрасываем изменение домена, переданного через параметры URL
    useEffect(() => {
        if (!domainId) {
            return
        }

        setDomain(domainId)
    }, [domainId])

    // Пробрасываем изменение проекта, переданного через параметры URL
    useEffect(() => {
        if (!projectId) {
            return
        }

        setProject(projectId)
    }, [projectId])

    useEffect(() => {
        if (!userInfo) {
            return
        }

        onRedirectToUserPage(() => {
            const domains = userInfo.roles.filter(r => r.level === "domain")

            if (domains.length === 1) {
                return router.push("/domain/[domainId]/project", `/domain/${domains[0].structure_item_id}/project`)
            }

            return router.push("/domain")
        })
    }, [userInfo, isNeedRedirectAfterAuth])

    if (0 === authToken.length) {
        return (
            <LoginFormUiLayer>
                <LoginPageFormContent
                    changePasswordToken={changePasswordToken}
                    isNeedShowChangePassword={isNeedShowChangePassword}
                />
            </LoginFormUiLayer>
        )
    }

    return <>{children}</>
}

// Экспортируем компонент
export default AuthorizationHoc(auditTime(100))(LoginPageForm)
