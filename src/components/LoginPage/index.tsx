import React, {FC} from "react";
import LoginPageForm from "./LoginPageForm";

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

    if (!isPrivate) {
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