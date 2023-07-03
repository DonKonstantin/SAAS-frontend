import React, {FC, useEffect} from "react";
import {useSnackbar} from "notistack";
import {registerEnqueueSnackbar} from "../../services/notifications";

// Свойства компонента
interface SnackbarRegistratorProps {
    children: React.ReactNode
}

// Компонент вывода слоя для всплывающих сообщений
const SnackbarRegistrator: FC<SnackbarRegistratorProps> = props => {
    const {children} = props

    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        registerEnqueueSnackbar(enqueueSnackbar)
    }, [])

    return <>{children}</>;
}

// Экспортируем компонент
export default SnackbarRegistrator