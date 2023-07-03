import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import LanguageHoc, {WithLanguageHoc} from "../../context/LanguageContext";
import {auditTime} from "rxjs";

// Компонент инициализации языкового контекста
const Localization = (props: WithLanguageHoc<{}>) => {
    const {currentLanguage} = props;
    const {i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    return null;
};

// Экспортируем компонент
export default LanguageHoc(auditTime(100))(Localization)