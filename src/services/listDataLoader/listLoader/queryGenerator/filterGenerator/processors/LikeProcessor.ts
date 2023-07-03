import {FilterGeneratorProcessor, FilterGeneratorProcessorParams} from "./interfaces";
import {Schemas} from "../../../../../../settings/schema";

/**
 * Процессор генерации подзапросов фильтрации для like операции
 */
export class LikeProcessor implements FilterGeneratorProcessor<"Like"> {
    /**
     * Генерация подзапроса для одного поля
     * @param params
     */
    GenerateFilter<K extends keyof Schemas, F extends keyof Schemas[K]["fields"]>(
        params: FilterGeneratorProcessorParams<"Like", K, F>
    ): string {
        if (params.currentValue.value.value === null) return ""

        return `${params.currentValue.configuration.field}: {_like: "%${params.currentValue.value.value}%"}`;
    }
}