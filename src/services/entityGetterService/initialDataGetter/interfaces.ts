import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";
import {AdditionEditParams} from "../../../containers/EntityEdit";

/**
 * Сервис получения базовых данных полей сущности
 */
export interface InitialDataGetterInterface {
    /**
     * Получение базовых значений полей сущности
     * @param schema
     * @param primaryKey
     * @param additionEditParams
     */
    GetInitialValues<T extends keyof Schemas>(schema: T, primaryKey: any, additionEditParams: AdditionEditParams): Promise<EntityValues<T>>
}