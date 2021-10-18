import React, {FC} from "react";
import LoginPageForm from "./LoginPageForm";
import {useRouter} from "next/router";

// Свойства компонента
export type LoginPageProps = {
    changePasswordToken?: string
    isNeedShowChangePassword?: boolean
    isPrivate?: boolean
    children: React.ReactNode
}

// Компонент вывода страницы авторизации/восстановления пароля
const LoginPage: FC<LoginPageProps> = props => {
    const {
        isPrivate = true,
        changePasswordToken,
        isNeedShowChangePassword,
        children,
    } = props;
    const router = useRouter()

    if (["/404", "/500"].includes(router.pathname) || !isPrivate) {
        return <>{children}</>
    }

    return (
        <LoginPageForm
            changePasswordToken={changePasswordToken}
            isNeedShowChangePassword={isNeedShowChangePassword}
        >
            {children}
        </LoginPageForm>
    )
};

// Экспортируем компонент
export default LoginPage