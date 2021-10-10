import {QueryGeneratorInterface} from "./interface";
import {SchemaField, Schemas} from "../../../settings/schema";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {listSchemaConfiguration} from "../../../settings/pages";
import {
    ListFieldRow,
    ListFieldRowColumnValues,
    ListFieldsConfiguration,
    ListFieldValueTypes
} from "../../listDataLoader/listLoader/types";
import getPrimaryKeyForSchema from "../../helpers/GetPrimaryKeyForSchema";
import {QueryRow} from "../../listDataLoader/listLoader/queryGenerator/interfaces";
import {FieldParsers} from "../../listDataLoader/listLoader/queryGenerator/fieldParsers";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {SchemaValueConverterInterface} from "../../schemaValueConverter/interfaces";

/**
 * Генератор запроса подписки на события
 */
export class QueryGenerator implements QueryGeneratorInterface {

    private readonly fieldParsers: FieldParsers;
    private readonly valueConverter: SchemaValueConverterInterface;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param fieldParsers
     * @param valueConverter
     * @param logger
     */
    constructor(fieldParsers: FieldParsers, valueConverter: SchemaValueConverterInterface, logger: LoggerFactory) {
        this.fieldParsers = fieldParsers;
        this.valueConverter = valueConverter;
        this.logger = logger.make(`QueryGenerator`);
    }

    /**
     * Генерация запроса подписки
     * @param schema
     */
    GenerateQuery<T extends keyof Schemas>(schema: T): string {
        // @ts-ignore
        const actualConfig: ListPageConfiguration<T> = listSchemaConfiguration()[schema];
        const schemaParameters = (new Schemas)[schema];

        if (!schemaParameters.subscriptionKey) {
            throw new Error(`Passed schema has not subscription key to subscribe`)
        }

        let fields = Object.keys(actualConfig.listFields.fields).filter((field: keyof ListFieldsConfiguration<T>["fields"]) => {
            const fieldConfig = actualConfig.listFields.fields[field];

            return fieldConfig.isEnabled
        });

        try {
            const primaryKey = getPrimaryKeyForSchema(schema);
            if (fields.indexOf(`${primaryKey.code}`) === -1) {
                fields.push(`${primaryKey.code}`)
            }
        } catch (e) {
            throw e
        }

        const fieldsStr = fields.join(`,`);
        return `subscription { ${schema}: ${schemaParameters.subscriptionKey}Changes(eventType:[updated, deleted]) { entityId, eventType, data {${fieldsStr}} } }`;
    }

    /**
     * Парсинг результата, полеченного по WSS
     * @param schema
     * @param row
     */
    async ParseRow<T extends keyof Schemas>(schema: T, row: QueryRow<T>): Promise<ListFieldRow<T> | undefined> {
        // @ts-ignore
        const config: ListPageConfiguration<T> = listSchemaConfiguration()[schema];
        if (!config) {
            return;
        }

        let rows = [row];

        interface FieldsParseResult {
            data: ListFieldValueTypes[keyof ListFieldValueTypes][]
            field: keyof ListFieldsConfiguration<T>["fields"]
        }

        // Парсим поля. Обрабатываем каждый тип поля по отдельности
        const parsedData =  await Promise.all(Object.keys(config.listFields.fields).map(async (field: keyof ListFieldsConfiguration<T>["fields"]): Promise<FieldsParseResult>  => {
            const fieldConfig = config.listFields.fields[field];

            return {
                // @ts-ignore
                data: await this.fieldParsers[fieldConfig.fieldType.type].ParseField(schema, fieldConfig, rows),
                field: field
            }
        }));

        this.logger.Debug(`GenerateValuesByRowResult() Parsed data`, parsedData);

        // Парсим первичный ключ для переданной таблицы и данных WSS
        let primaryKey: {code: keyof Schemas[T]['fields'], field: SchemaField};
        try {
            primaryKey = getPrimaryKeyForSchema(schema)
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }

        // Формируем итоговые объекты, складывая поля в результаты
        let result = parsedData.reduce((result: ListFieldRowColumnValues<T>[], row: FieldsParseResult): ListFieldRowColumnValues<T>[] => {
            return row.data.map((item, i): ListFieldRowColumnValues<T> => {
                if (!result[i]) {
                    // @ts-ignore
                    result[i] = {}
                }

                // @ts-ignore
                let elem: ListFieldRowColumnValues<T> = result[i];

                // @ts-ignore
                elem[row.field] = item;

                return elem
            })
        }, []);

        // Конвертируем первичный ключ в требуемый формат по конфигурации
        const resultRows = result.map((item, i) => {
            let result = <ListFieldRow<T>>{
                primaryKeyValue: undefined,
                columnValues: item,
            };

            result.primaryKeyValue = this.valueConverter.convertValueFromGraphQL(primaryKey.field.type, rows[i][primaryKey.code]);

            return result
        });

        this.logger.Debug(`GenerateValuesByRowResult() Parsed results`, resultRows);
        const [rowResult] = resultRows;

        return rowResult
    }
}