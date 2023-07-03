import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

/**
 * Сервис получения данных полей сущности
 */
export interface EntityValuesGetterInterface {
    /**
     * Получение значений полей сущности
     * @param schema
     * @param primaryKey
     * @param initialValues
     */
    GetEntityValues<T extends keyof Schemas>(schema: T, primaryKey: any, initialValues: EntityValues<T>): Promise<EntityValues<T>>
}