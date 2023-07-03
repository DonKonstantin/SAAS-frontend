import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

/**
 * Сервис предварительного сохранения сущности
 */
export interface BeforeSavePreprocessServiceInterface {
    /**
     * Предварительная обработка данных перед основным сохранением
     * @param schema
     * @param data
     */
    Preprocess(schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<{isError: boolean, data: EntityData<keyof Schemas>}>
}