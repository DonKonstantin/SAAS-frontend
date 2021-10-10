import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {ValidationResult} from "../../../settings/pages/system/edit";

/**
 * Сервис валидации сущностей
 */
export type ValidationResults = {isError: boolean, validationResults: ValidationResult[][]}
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