import React, {FC} from "react";
import ListPageInitializer from "./ListPageInitializer";
import {PageWithEntityList} from "../ListPage/types";

// Свойства провайдера
type ListPageProviderProps = PageWithEntityList & {
    children: React.ReactNode
}

// Компонент провайдера для страниц листинга сущностей
const ListPageProvider: FC<ListPageProviderProps> = props => {
    const {
        entityListSchema,
        entityListAdditionFilter,
        children,
    } = props

    return (
        <>
            <ListPageInitializer
                entityListSchema={entityListSchema}
                entityListAdditionFilter={entityListAdditionFilter}
            />
            {children}
        </>
    )
}

// Экспортируем компонент
export default ListPageProvider