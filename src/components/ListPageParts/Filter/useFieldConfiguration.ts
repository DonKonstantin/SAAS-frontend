import {useTranslation} from "react-i18next";
import {EntityListHocContext, useEntityList} from "../../../context/EntityListContext";
import {OperatorFunction} from "rxjs";
import {useRef} from "react";
import {Schemas} from "../../../settings/schema";
import {listSchemaConfiguration} from "../../../settings/pages";

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
    const {data, onChangeFilterValues} = useEntityList(...pipeModifications)
    if (!data) {
        return undefined
    }

    const {schema, currentData: {parameters: {currentFilterValues}}} = data
    if (!currentFilterValues) {
        return undefined
    }

    const fieldSchema = useRef((new Schemas())[fieldCode])
    const config = useRef(listSchemaConfiguration()[schema])
    if (!config.current) {
        return undefined
    }

    const {filter} = config.current
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
        fieldSchema: fieldSchema.current,
        fieldConfig,
        onChangeFilterValues
    }
}

// Экспортируем хук
export default useFieldConfiguration