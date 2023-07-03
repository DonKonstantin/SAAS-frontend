import {Schemas} from "../../settings/schema";
import {EntityData} from "../entityGetterService/interface";

// Параметры сохранения сущности
export interface EntityStoreParameters {
    primaryKey: any;
    isNeedCopy: boolean;
    schema: keyof Schemas;
    data: EntityData<keyof Schemas>;
    isSaveEnabled: boolean;
}

/**
 * Сервис сохранения данных сущности
 */
export interface EntityStoreServiceInterface {
    /**
     * Сохранение сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param params
     */
    Store(params: EntityStoreParameters): Promise<any>
}