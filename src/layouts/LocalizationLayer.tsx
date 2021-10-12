import React, {FC} from "react";
import {I18nextProvider} from "react-i18next";
import i18n from "../i18n";
import Localization from "../components/Localization";

// Свойства слоя
type LocalizationLayerProps = Partial<{
    children: React.ReactNode
}>

// Слой подключения локализации к проекту
const LocalizationLayer: FC<LocalizationLayerProps> = ({children}) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Localization />
            {children}
        </I18nextProvider>
    )
}

// Экспортируем слой
export default LocalizationLayer