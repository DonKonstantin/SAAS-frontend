import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

/**
 * Сервис получения дополнительных данных полей сущности
 */
export interface AdditionDataGetterInterface {
    /**
     * Получение дополнительных данных для полей сущности
     * @param schema
     * @param primaryKey
     * @param entityValues
     */
    GetAdditionData<T extends keyof Schemas>(schema: T, primaryKey: any, entityValues: EntityValues<T>): Promise<((any  | null)[])[]>
}