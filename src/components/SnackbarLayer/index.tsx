import React, {FC} from "react";
import SnackCloseButton from "./SnackCloseButton";
import {SnackbarProvider} from "notistack";
import SnackbarRegistrator from "./Registrator";

// Свойства компонента
interface SnackbarLayerProps {
    children: React.ReactNode
}

// Компонент вывода слоя для всплывающих сообщений
const SnackbarLayer: FC<SnackbarLayerProps> = props => {
    const {children} = props

    // Создаем ссылку для связывания компонентов
    const ref = React.useRef<SnackbarProvider>(null)

    // Кнопка закрытия сообщения
    const snackCloseAction = (key: any) => {
        return (
            <SnackCloseButton key={key} snackbarRef={ref}/>
        )
    };

    return (
        <SnackbarProvider
            ref={ref}
            maxSnack={5}
            anchorOrigin={{vertical: `bottom`, horizontal: `right`}}
            hideIconVariant={false}
            action={snackCloseAction}
        >
            <SnackbarRegistrator>
                {children}
            </SnackbarRegistrator>
        </SnackbarProvider>
    );
}

// Экспортируем компонент
export default SnackbarLayer