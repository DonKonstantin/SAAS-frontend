import React, {FC} from "react";
import {AuthHumanIcon} from "../Icons/AuthHumanIcon";

// Свойства слоя
export type LoginFormUiLayerProps = {
    children: React.ReactNode
};

// Слой, выводящий обвязку страницы авторизации.
// Картинку и блок под контент.
const LoginFormUiLayer: FC<LoginFormUiLayerProps> = props => {
    const {children} = props

    return (
        <div className={`login-form`}>
            <div className={`login-form--picture`}>
                <AuthHumanIcon/>
            </div>
            <div className={`login-form--content`}>
                <div className={`login-form--form`}>
                    <div className={`login-form--logo`}>
                        <img src="/static/auth-logo.png" alt="logo" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
};

// Экспортируем компонент
export default LoginFormUiLayer