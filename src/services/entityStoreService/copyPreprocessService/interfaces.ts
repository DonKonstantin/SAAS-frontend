import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";

/**
 * Сервис предварительной обработки сущностей при копировании
 */
export interface CopyPreprocessServiceInterface {
    /**
     * Предварительная обработка значений сохранения при копировании
     * @param schema
     * @param data
     */
    Preprocess(schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<EntityData<keyof Schemas>>
}