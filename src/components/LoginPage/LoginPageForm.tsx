import React, {FC, useEffect} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../context/AuthorizationContext";
import LoginFormUiLayer from "./LoginFormUiLayer";
import {auditTime} from "rxjs";
import LoginPageFormContent from "./LoginPageFormContent";

// Свойства компонента страницы авторизации
export type LoginPageFormProps = WithAuthorization<{
    changePasswordToken?: string
    isNeedShowChangePassword?: boolean
    children: React.ReactNode
}>;

// Компонент вывода формы авторизации/восстановления пароля
const LoginPageForm: FC<LoginPageFormProps> = props => {
    const {
        authToken,
        changePasswordToken = "",
        isNeedShowChangePassword = false,
        initializeContextBus,
        children,
    } = props;

    useEffect(() => {
        return initializeContextBus()
    }, [])

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