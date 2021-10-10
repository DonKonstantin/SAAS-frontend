import {EditField, EditValueType, EntityValues} from "../../settings/pages/system/edit";
import {Schemas} from "../../settings/schema";

/**
 * Параметры функции сброса значения по умолчанию для полей формы редактирования
 */
export interface ResetParams<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> {
    configuration: EditField<T,F>
    values: EntityValues<T>
    additionData: any
    onSetValue: {(value: EditValueType): void}
}

/**
 * Сброс значения на значение по умолчанию для поля
 * @param params
 */
export const ResetDefaultValueForField = async <T extends keyof Schemas, F extends keyof Schemas[T]['fields']>(params: ResetParams<T, F>) => {
    let value: EditValueType;
    if (typeof params.configuration.defaultValue === "function") {
        value = await params.configuration.defaultValue({values: params.values, additionData: params.additionData})
    } else {
        value = params.configuration.defaultValue
    }

    params.onSetValue(value)
};