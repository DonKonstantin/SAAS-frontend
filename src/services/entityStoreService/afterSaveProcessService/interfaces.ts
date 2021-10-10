import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

/**
 * Сервис пост сохранения сущности
 */
export interface AfterSaveProcessServiceInterface {
    /**
     * Пост обработка данных после основного сохранения
     * @param schema
     * @param primaryKey
     * @param data
     */
    Process(schema: keyof Schemas, primaryKey: any, data: EntityData<keyof Schemas>): Promise<boolean>
}