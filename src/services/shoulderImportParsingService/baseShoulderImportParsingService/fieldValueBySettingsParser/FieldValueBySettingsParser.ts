import {FieldSingleValueParserInterface, FieldValueBySettingsParserInterface, Values} from "./interfaces";
import {FieldConfigurationCollection, Settings} from "../../../shoulderImportTaskService/baseTypes";

// Результат парсинга значения
type FieldValue<Entity extends object> = {
    field: keyof Entity
    value: any
    error?: string
};

/**
 * Сервис парсинга переданных данных по конфигурации полей
 */
export class FieldValueBySettingsParser implements FieldValueBySettingsParserInterface {
    protected readonly singleValueParser: FieldSingleValueParserInterface;

    /**
     * Конструктор сервиса
     * @param singleValueParser
     */
    constructor(singleValueParser: FieldSingleValueParserInterface) {
        this.singleValueParser = singleValueParser
    }

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    async parse<Entity extends object>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: Settings<Entity>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<Values<Entity>> {
        const fields = Object.keys(settings) as (keyof Entity)[];

        const fieldValues: FieldValue<Entity>[] = await Promise.all(
            fields.map(async field => {
                try {
                    return {
                        field: field,
                        value: await this.singleValueParser.parse(
                            data,
                            rowData,
                            settings[field],
                            fieldsConfiguration
                        )
                    };
                } catch (e) {
                    return {
                        field: field,
                        value: undefined,
                        error: e.message,
                    }
                }
            })
        );

        return fieldValues.reduce((
            values: Values<Entity>,
            value: FieldValue<Entity>
        ) => {
            return {
                ...values,
                [value.field]: {
                    value: value.value,
                    error: value.error,
                }
            }
        }, {} as unknown as Values<Entity>)
    }
}