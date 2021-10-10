import {Schemas} from "../../../settings/schema";
import {QueryRow} from "../../listDataLoader/listLoader/queryGenerator/interfaces";
import {ListFieldRow} from "../../listDataLoader/listLoader/types";

/**
 * Генератор запроса подписки на события
 */
export interface QueryGeneratorInterface {
    /**
     * Генерация запроса подписки
     * @param schema
     */
    GenerateQuery<T extends keyof Schemas>(schema: T): string;

    /**
     * Парсинг результата, полеченного по WSS
     * @param schema
     * @param row
     */
    ParseRow<T extends keyof Schemas>(schema: T, row: QueryRow<T>): Promise<ListFieldRow<T> | undefined>;
}