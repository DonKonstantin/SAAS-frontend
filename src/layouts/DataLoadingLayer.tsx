import React, {FC} from "react";
import useSWR from 'swr'
import withDataLoading from "../dataLoading";
import LoadingPage from "../components/UILayer/LoadingPage";

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
    const {data, error} = useSWR("base_data", async () => {
        return await withDataLoading(async () => ({}))(other)
    })

    if (error) {
        throw new Error(error)
    }

    if (!data) {
        return <LoadingPage />
    }

    return (<>{children}</>)
}

// Экспортируем слой
export default DataLoadingLayer