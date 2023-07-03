import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

// Результаты валидации сущности
export type ValidationResults<T extends keyof Schemas = keyof Schemas> = {
    isError: boolean,
    validationResults: { [F in keyof Schemas[T]['fields']]?: string }
}

/**
 * Сервис валидации сущностей
 */
export interface EntityValidatorInterface {
    /**
     * Валидация полей
     *
     * @param primaryKey
     * @param schema
     * @param data
     */
    Validate(primaryKey: any, schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<ValidationResults>
}