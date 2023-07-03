import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

/**
 * Сервис создания сущностей
 */
export interface CreateEntityServiceInterface {
    /**
     * Создание сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param schema
     * @param data
     */
    Create(schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<any>
}