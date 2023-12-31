import {DeclaredFilterFieldPreloadedData} from "../../types";
import {FilterPreloaderProcessorInterface} from "./interfaces";

/**
 * Процессор предзагрузки данных с пропуском загрузки
 */
export class SkipPreloader<
    C extends "Checkbox" |
        "EqualsFloat" |
        "EqualsInt" |
        "EqualsString" |
        "FloatSlider" |
        "IntegerSlider" |
        "Like" |
        "Switch" |
        "VariantsSelectorFloat" |
        "VariantsSelectorInt" |
        "VariantsSelectorString" |
        "DateTimeRange" |
        "EnumSelector"
> implements FilterPreloaderProcessorInterface<C> {
    /**
     * Загрузка параметров фильтрации
     */
    async loadFilterData(): Promise<DeclaredFilterFieldPreloadedData[C]> {
        return undefined;
    }
}
