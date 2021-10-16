import React, {FC, useEffect} from "react";
import {PageWithEntityEdit} from "./type";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";

// Свойства провайдера страницы редактирования сущности
type EditPageProviderProps = PageWithEntityEdit & {
    children: React.ReactNode
}

// Провайдер страниц редактирования сущностей
const EditPageProvider: FC<EditPageProviderProps> = props => {
    const {
        children,
        entityEditSchema,
        entityEditPrimaryKey,
    } = props

    const {setSchema} = useEntityEdit(distinctUntilChanged(() => false))

    useEffect(() => {
        if (!entityEditSchema) {
            return
        }

        setSchema(entityEditSchema, entityEditPrimaryKey)
    }, [entityEditSchema, entityEditPrimaryKey])

    return <>{children}</>
}

// Экспортируем компонент
export default EditPageProvider