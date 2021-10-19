import React, {FC} from "react";
import useSWR from 'swr'
import withDataLoading from "../dataLoading";
import LoadingPage from "../components/UILayer/LoadingPage";
import {useRouter} from "next/router";
import {useAuthorization} from "../context/AuthorizationContext";

// Свойства слоя
export type DataLoadingLayerProps = object & Partial<{
    children: React.ReactNode
}>

/**
 * Слой загрузки данных приложения
 *
 * Основное предназначение данного слоя состоит в том, чтобы загрузить базовый набор данных
 * для работы приложения. Сюда по сути необходимо подключать загрузку только тех фрагметов,
 * без которых само приложение не может работать. Если необходимо загружать данные для отдельных
 * страниц, то необходимо использовать стандартные средства Next.js.
 *
 * @param props
 */
const DataLoadingLayer: FC<DataLoadingLayerProps> = props => {
    const {children, ...other} = props
    const router = useRouter()
    const auth = useAuthorization()

    const {data, error} = useSWR("base_data", async () => {
        if (["/404", "/500"].includes(router.pathname)) {
            return {}
        }

        return await withDataLoading(async () => ({}))(other)
    }, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (["/404", "/500"].includes(router.pathname)) {
        return (<>{children}</>)
    }

    if (error) {
        auth.onLogout()

        return (<>{children}</>)
    }

    if (!data) {
        return <LoadingPage/>
    }

    return (<>{children}</>)
}

// Экспортируем слой
export default DataLoadingLayer