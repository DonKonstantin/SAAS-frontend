import {FC, useEffect} from "react";
import {useAuthorization} from "../../../context/AuthorizationContext";

// Свойства компонента
type MainMenuInitializerProps = {
    pageMenuType: "realm" | "domain" | "project"
}

// Компонент инициализации левого меню. Пробрасывает нужный тип меню в контекст
const MainMenuInitializer: FC<MainMenuInitializerProps> = props => {
    const {pageMenuType} = props
    const {onChangeMenuType} = useAuthorization()

    useEffect(() => {
        onChangeMenuType(pageMenuType)
    }, [pageMenuType])

    return null
}

// Экспортируем компонент
export default MainMenuInitializer