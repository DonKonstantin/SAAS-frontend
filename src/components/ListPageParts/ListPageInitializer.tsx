import EntityListHoc, {WithEntityListHoc} from "../../context/EntityListContext";
import {FC, useEffect} from "react";
import {auditTime} from "rxjs";
import {PageWithEntityList} from "../ListPage/types";

// Свойства компонента
type ListPageInitializerProps = WithEntityListHoc<PageWithEntityList>

// Компонент инициализации внутреннего функционала для контекста листинга сущностей
const ListPageInitializer: FC<ListPageInitializerProps> = props => {
    const {
        initializeSubscriptions,
        entityListSchema,
        setSchema,
    } = props

    // Инициируем внутренние подписки
    useEffect(() => {
        const unsubscribe = initializeSubscriptions()
        if (entityListSchema) {
            setSchema(entityListSchema)
        }

        return unsubscribe
    }, [])

    // Подписываемся на изменение схемы
    useEffect(() => {
        if (!entityListSchema) {
            return
        }

        setSchema(entityListSchema)
    }, [entityListSchema])

    return null
}

// Экспортируем компонент
export default EntityListHoc(auditTime(1000))(ListPageInitializer)