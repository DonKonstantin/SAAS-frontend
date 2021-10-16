import {useTranslation} from "react-i18next";
import {EntityListHocContext, useEntityList} from "../../../context/EntityListContext";
import {distinctUntilChanged, OperatorFunction} from "rxjs";
import {useEffect, useState} from "react";
import {SchemaField, Schemas} from "../../../settings/schema";
import {listSchemaConfiguration} from "../../../settings/pages";
import {ListPageConfiguration} from "../../../settings/pages/system/list";

/**
 * Хук подключает все необходимые методы для работы поля фильтра
 * Возвращает undefined, если нет каких либо данных, необходимых для работы поля
 *
 * @param fieldCode
 * @param pipeModifications
 */
const useFieldConfiguration = (
    fieldCode: keyof Schemas[keyof Schemas]['fields'],
    ...pipeModifications: OperatorFunction<any, EntityListHocContext>[]
) => {
    const {t} = useTranslation()
    const [config, setConfig] = useState<ListPageConfiguration>()
    const [fieldSchema, setFieldSchema] = useState<SchemaField>()
    const {data, onChangeFilterValues} = useEntityList(
        distinctUntilChanged(
            (previous, current) => {
                if (!previous.data || !current.data) {
                    return false
                }

                const prevFieldValue = JSON.stringify(previous.data?.currentData.parameters.currentFilterValues[fieldCode] || "")
                const currentFieldValue = JSON.stringify(current.data?.currentData.parameters.currentFilterValues[fieldCode] || "")

                return prevFieldValue === currentFieldValue
            }
        ),
        ...pipeModifications
    )

    useEffect(() => {
        if (!data) {
            return
        }

        const {schema} = data
        setConfig(listSchemaConfiguration()[schema])
        setFieldSchema((new Schemas())[schema].fields[fieldCode])
    }, [data?.schema])

    if (!data || !config || !fieldSchema) {
        return undefined
    }

    const {currentData: {parameters: {currentFilterValues}}} = data
    if (!currentFilterValues) {
        return undefined
    }

    const {filter} = config
    const fieldConfig = filter[fieldCode]
    if (!fieldConfig) {
        return undefined
    }

    const value = currentFilterValues[fieldCode]
    if (!value) {
        return undefined
    }

    return {
        t,
        value,
        fieldSchema: fieldSchema,
        fieldConfig,
        onChangeFilterValues
    }
}

// Экспортируем хук
export default useFieldConfiguration