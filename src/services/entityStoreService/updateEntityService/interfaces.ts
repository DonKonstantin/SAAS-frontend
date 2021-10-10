import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

// Параметры сохранения сущности
export interface EntityUpdateParameters {
    primaryKey: any,
    schema: keyof Schemas,
    data: EntityData<keyof Schemas>
}

/**
 * Сервис обновления данных сущности
 */
export interface UpdateEntityServiceInterface {
    /**
     * Обновление сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param params
     */
    Update(params: EntityUpdateParameters): Promise<any>
}