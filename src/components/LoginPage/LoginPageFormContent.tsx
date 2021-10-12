import React, {FC, useState} from "react";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";

// Свойства компонента
export type LoginPageFormContentProps = {
    changePasswordToken: string
    isNeedShowChangePassword: boolean
};

// Компонент вывода контента формы авторизации
const LoginPageFormContent: FC<LoginPageFormContentProps> = props => {
    const {
        changePasswordToken,
        isNeedShowChangePassword
    } = props

    // State хранит флаг отображения формы восстановления пароля
    const [isNeedResetPassword, setIsNeedResetPassword] = useState(false)

    // State хранит флаг отображения формы смены пароля
    const [showChangePassword, setShowChangePassword] = useState(isNeedShowChangePassword)

    if (showChangePassword) {
        return (
            <ChangePasswordForm
                changePasswordToken={changePasswordToken}
                onToggleForm={() => setShowChangePassword(false)}
            />
        )
    }

    if (isNeedResetPassword) {
        return <ResetPasswordForm onToggleForm={() => setIsNeedResetPassword(false)}/>
    }

    return <LoginForm onToggleForm={() => setIsNeedResetPassword(true)}/>
};

// Экспортируем компонент
export default LoginPageFormContent