import {DataConverterProcessorInterface} from "./interfaces";
import {FieldConfiguration} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Процессор логических значений
 */
export class EnumProcessor<T, field extends keyof T> implements DataConverterProcessorInterface<T, field> {
    /**
     * Проверка доступности процессора
     * @param configuration
     */
    isAvailable(configuration: FieldConfiguration<T, field>): boolean {
        return configuration.fieldValueType === "enum" && !!configuration.enum;
    }

    /**
     * Конвертация данных
     * @param configuration
     * @param data
     */
    async convertData(configuration: FieldConfiguration<T, field>, data: string): Promise<any> {
        const {enum: enumData} = configuration;
        if (!enumData) {
            throw new Error(`Не установлены параметры списка значений`)
        }

        const {variants = {}} = enumData;
        for (let variant of Object.keys(variants)) {
            const {title, aliases} = variants[variant];
            const typesToSearch = [
                title.toLowerCase(),
                variant.toLowerCase(),
                ...aliases.map(alias => alias.toLowerCase()),
            ];

            if (typesToSearch.indexOf(data) !== -1) {
                return variant;
            }
        }

        throw new Error(`Не удалось распознать значение для списка: ${data}`)
    }
}