import React, {FC, useEffect} from "react";
import {PageWithEntityEdit} from "./type";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {useAuthorization} from "../../context/AuthorizationContext";

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

    const {authToken} = useAuthorization(distinctUntilChanged((previous, current) => {
        return previous.authToken === current.authToken
    }))

    const {setSchema} = useEntityEdit(distinctUntilChanged(() => false))

    useEffect(() => {
        if (!entityEditSchema || authToken.length === 0) {
            return
        }

        setSchema(entityEditSchema, entityEditPrimaryKey)
    }, [entityEditSchema, entityEditPrimaryKey, authToken.length !== 0])

    return <>{children}</>
}

// Экспортируем компонент
export default EditPageProvider