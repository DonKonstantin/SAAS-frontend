import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

/**
 * Сервис получения базовых данных полей сущности
 */
export interface InitialDataGetterInterface {
    /**
     * Получение базовых значений полей сущности
     * @param schema
     * @param primaryKey
     */
    GetInitialValues<T extends keyof Schemas>(schema: T, primaryKey: any): Promise<EntityValues<T>>
}