import {QueryGeneratorInterface, RowResult} from "./interfaces";
import {SchemaField, Schemas} from "../../../settings/schema";
import {
    ListFieldRow,
    ListFieldRowColumnValues,
    ListFieldsConfiguration,
    ListFieldValueTypes
} from "../../listDataLoader/listLoader/types";
import {Logger, LoggerFactory} from "../../logger/Logger";
import getPrimaryKeyForSchema from "../../helpers/GetPrimaryKeyForSchema";
import {listSchemaConfiguration} from "../../../settings/pages";
import {GraphQlSchemaValueConverterInterface} from "../../graphQlSchemaValueConverter/interfaces";
import {FieldParsers} from "../../listDataLoader/listLoader/queryGenerator/fieldParsers";

/**
 * Сервис генерации основного запроса листинга сущностей и парсинга результатов
 */
export class TreeQueryGenerator implements QueryGeneratorInterface {
    private readonly valueConverter: GraphQlSchemaValueConverterInterface;
    private readonly fieldParsers: FieldParsers;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param valueConverter
     * @param loggerFactory
     * @param fieldParsers
     */
    constructor(
        valueConverter: GraphQlSchemaValueConverterInterface,
        loggerFactory: LoggerFactory,
        fieldParsers: FieldParsers
    ) {
        this.fieldParsers = fieldParsers;
        this.logger = loggerFactory.make(`TreeQueryGenerator`);
        this.valueConverter = valueConverter
    }

    /**
     * Генерация запроса листинга сущностей
     * @param schema
     * @param primaryKeyValues
     */
    GenerateQuery<T extends keyof Schemas>(schema: T, primaryKeyValues: any[]): string {
        const config = listSchemaConfiguration()[schema];
        if (!config || primaryKeyValues.length === 0) {
            return ""
        }

        let fields = Object.keys(config.listFields.fields).filter(field => {
            const fieldConfig = config.listFields.fields[field];

            return fieldConfig.isEnabled
        });

        try {
            const primaryKey = getPrimaryKeyForSchema(schema);
            if (fields.indexOf(`${primaryKey.code}`) === -1) {
                fields.push(`${primaryKey.code}`)
            }

            const primaryKeys = primaryKeyValues.map(key => this.valueConverter.convertValueToGraphQL(primaryKey.field, key)).join(",");
            const fieldsStr = fields.join(`,`);
            const query = `query __ITEMS_LIST__ {${schema}: ${schema}_list(where: {${primaryKey.code}: {_in: [${primaryKeys}]}}, limit: ${primaryKeys.length}, order:[{by: ${primaryKey.code}, direction: asc, priority: 1}]) {${fieldsStr}}}`;

            this.logger.Debug(`GenerateQuery() Generated list query`, query);

            return query
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return ""
        }
    }

    /**
     * Генерация листинга значений по данным базового запроса
     * @param schema
     * @param rowResult
     */
    async GenerateValuesByRowResult<T extends keyof Schemas>(
        schema: T,
        rowResult: RowResult<T>
    ): Promise<ListFieldRow<T>[]> {
        const rows = rowResult[schema];
        if (0 === rows.length) return [];

        const config = listSchemaConfiguration()[schema];
        if (!config) {
            return []
        }

        interface FieldsParseResult {
            data: ListFieldValueTypes[keyof ListFieldValueTypes][]
            field: keyof ListFieldsConfiguration<T>["fields"]
        }

        const promises = Object.keys(config.listFields.fields).map(async field => {
            const fieldConfig = config.listFields.fields[field];

            return {
                // @ts-ignore
                data: await this.fieldParsers[fieldConfig.fieldType.type].ParseField(schema, fieldConfig, rows),
                field: field
            }
        });

        const parsedData = await Promise.all(promises);

        this.logger.Debug(`GenerateValuesByRowResult() Parsed data`, parsedData);

        let primaryKey: { code: keyof Schemas[T]['fields'], field: SchemaField };
        try {
            primaryKey = getPrimaryKeyForSchema(schema)
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }

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

        const resultRows = result.map((item, i) => {
            let result = <ListFieldRow<T>>{
                primaryKeyValue: undefined,
                columnValues: item,
            };

            result.primaryKeyValue = this.valueConverter.convertValueFromGraphQL(primaryKey.field, rows[i][primaryKey.code]);

            return result
        });

        this.logger.Debug(`GenerateValuesByRowResult() Parsed results`, resultRows);

        return resultRows
    }
}