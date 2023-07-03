import EntityListHoc, {WithEntityListHoc} from "../../context/EntityListContext";
import {FC, useEffect} from "react";
import {auditTime, distinctUntilChanged} from "rxjs";
import {PageWithEntityList} from "../ListPage/types";
import {useAuthorization} from "../../context/AuthorizationContext";

// Свойства компонента
type ListPageInitializerProps = WithEntityListHoc<PageWithEntityList>

// Компонент инициализации внутреннего функционала для контекста листинга сущностей
const ListPageInitializer: FC<ListPageInitializerProps> = props => {
    const {
        initializeSubscriptions,
        entityListSchema,
        entityListAdditionFilter,
        setSchema,
    } = props

    const {authToken} = useAuthorization(distinctUntilChanged((previous, current) => {
        return previous.authToken === current.authToken
    }))

    // Инициируем внутренние подписки
    useEffect(() => {
        const unsubscribe = initializeSubscriptions()
        if (entityListSchema && authToken.length !== 0) {
            setSchema(entityListSchema, entityListAdditionFilter)
        }

        return unsubscribe
    }, [])

    // Подписываемся на изменение схемы
    useEffect(() => {
        if (!entityListSchema || authToken.length === 0) {
            return
        }

        setSchema(entityListSchema, entityListAdditionFilter)
    }, [entityListSchema, authToken.length !== 0, entityListAdditionFilter])

    return null
}

// Экспортируем компонент
export default EntityListHoc(auditTime(1000))(ListPageInitializer)