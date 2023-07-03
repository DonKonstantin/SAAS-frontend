import {Schemas} from "../../../settings/schema";
import {EntityEditHocContext, useEntityEdit} from "../../../context/EntityEditContext";
import {editSchemaConfiguration} from "../../../settings/pages";
import {OperatorFunction} from "rxjs";
import {useTranslation} from "react-i18next";
import {EditValueType} from "../../../settings/pages/system/edit";
import {useRef} from "react";

/**
 * Хук для работы полей формы редактирования. Возвращает полный набор необходимых
 * для полей методов.
 * @param fieldCode
 * @param pipeModifications
 */
function useEntityEditField<T extends keyof Schemas = keyof Schemas,
    F extends keyof Schemas[T]['fields'] = keyof Schemas[T]['fields']>(fieldCode: F, ...pipeModifications: OperatorFunction<any, EntityEditHocContext>[]) {
    const code = fieldCode as any
    const {entityData, validation, onChangeFieldValue, onResetFieldValue} = useEntityEdit(...pipeModifications)
    if (!entityData) {
        return undefined
    }

    const {t} = useTranslation()
    const {values, schema, additionData, primaryKey} = entityData
    const config = useRef(editSchemaConfiguration()[schema])
    if (!config.current) {
        return undefined
    }

    const fieldConfig = config.current.groups
        .map(g => g.fields)
        .flat()
        .find(f => f.field === code)

    if (!fieldConfig) {
        return undefined
    }

    const fieldSchema = (new Schemas())[schema].fields[fieldCode as any]
    return {
        t,
        primaryKey: primaryKey,
        fieldConfig: fieldConfig,
        fieldSchema: fieldSchema,
        value: values[code],
        validation: validation[code],
        values: values,
        additionData: additionData,
        onChangeFieldValue: (callback: { (value: EditValueType): EditValueType }) => {
            onChangeFieldValue(code, callback)
        },
        onResetFieldValue: () => {
            onResetFieldValue(code)
        },
    }
}

// Экспортируем хук
export default useEntityEditField