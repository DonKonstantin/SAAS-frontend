import {QueryGeneratorInterface, RowResult} from "./interfaces";
import {ListLoadingParameters, OrderParameter} from "../interfaces";
import {SchemaField, Schemas} from "../../../../settings/schema";
import {ListFieldRow, ListFieldRowColumnValues, ListFieldsConfiguration, ListFieldValueTypes} from "../types";
import {FilterGeneratorInterface} from "./filterGenerator/interfaces";
import {FieldParsers} from "./fieldParsers";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {SchemaValueConverterInterface} from "../../../schemaValueConverter/interfaces";
import getPrimaryKeyForSchema from "../../../helpers/GetPrimaryKeyForSchema";

/**
 * Сервис генерации основного запроса листинга сущностей и парсинга результатов
 */
export class QueryGenerator implements QueryGeneratorInterface {
    private readonly filterGenerator: FilterGeneratorInterface;
    private readonly valueConverter: SchemaValueConverterInterface;
    private readonly fieldParsers: FieldParsers;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param filterGenerator
     * @param valueConverter
     * @param loggerFactory
     * @param fieldParsers
     */
    constructor(
        filterGenerator: FilterGeneratorInterface,
        valueConverter: SchemaValueConverterInterface,
        loggerFactory: LoggerFactory,
        fieldParsers: FieldParsers
    ) {
        this.filterGenerator = filterGenerator;
        this.fieldParsers = fieldParsers;
        this.logger = loggerFactory.make(`QueryGenerator`);
        this.valueConverter = valueConverter
    }

    /**
     * Генерация запроса листинга сущностей
     * @param params
     */
    GenerateQuery<T extends keyof Schemas>(params: ListLoadingParameters<T>): {list: string, count: string} {
        let argumentsRows: string[] = [];

        const filterQuery = this.filterGenerator.GenerateFilter(params);
        if (0 !== filterQuery.length) {
            argumentsRows.push(filterQuery)
        }

        let countQuery = "";
        if (JSON.stringify(params.currentFilterValues || null) !== JSON.stringify(params.prevFilterValues || null) || !params.currentFilterValues) {
            countQuery = `query __ITEMS_COUNT__ {${params.schema}: ${params.schema}_aggregate${filterQuery.length !== 0 ? `(${filterQuery})`: ""} {count}}`
        }

        const offset = countQuery.length !== 0 ? 0 : params.offset;

        argumentsRows.push(`limit: ${params.limit}, offset: ${offset}`);
        const orderQueries = params.order.reduce((result: string[], order: OrderParameter<T>): string[] => {
            return [
                ...result,
                `{by: ${order.by}, direction: ${order.direction}, priority: ${order.priority}}`
            ]
        }, []);

        if (0 !== orderQueries.length) {
            argumentsRows.push(`order: [${orderQueries.join(", ")}]`)
        }

        this.logger.Debug(`GenerateQuery() Argument rows`, argumentsRows);

        const argumentsQuery = argumentsRows.join(", ");
        let fields = Object.keys(params.listConfiguration.fields).filter((field: keyof ListFieldsConfiguration<T>["fields"]) => {
            const fieldConfig = params.listConfiguration.fields[field];

            return fieldConfig.isEnabled
        });

        try {
            const primaryKey = getPrimaryKeyForSchema(params.schema);
            if (fields.indexOf(`${primaryKey.code}`) === -1) {
                fields.push(`${primaryKey.code}`)
            }
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
        }

        const fieldsStr = fields.join(`,`);

        const query = `query __ITEMS_LIST__ {${params.schema}: ${params.schema}_list${argumentsQuery.length > 0 ? `(${argumentsQuery})` : ``} {${fieldsStr}}}`;

        this.logger.Debug(`GenerateQuery() Generated list query`, query);

        return {
            list: query,
            count: countQuery
        }
    }

    /**
     * Генерация листинга значений по данным базового запроса
     * @param params
     * @param rowResult
     */
    async GenerateValuesByRowResult<T extends keyof Schemas>(
        params: ListLoadingParameters<T>,
        rowResult: RowResult<T>
    ): Promise<ListFieldRow<T>[]> {
        const rows = rowResult[params.schema];
        if (0 === rows.length) return [];

        interface FieldsParseResult {
            data: ListFieldValueTypes[keyof ListFieldValueTypes][]
            field: keyof ListFieldsConfiguration<T>["fields"]
        }
        const promises = Object.keys(params.listConfiguration.fields).map(async (field: keyof ListFieldsConfiguration<T>["fields"]): Promise<FieldsParseResult>  => {
            const fieldConfig = params.listConfiguration.fields[field];

            return {
                // @ts-ignore
                data: await this.fieldParsers[fieldConfig.fieldType.type].ParseField(params.schema, fieldConfig, rows),
                field: field
            }
        });

        const parsedData = await Promise.all(promises);

        this.logger.Debug(`GenerateValuesByRowResult() Parsed data`, parsedData);

        let primaryKey: {code: keyof Schemas[T]['fields'], field: SchemaField};
        try {
            primaryKey = getPrimaryKeyForSchema(params.schema)
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

            result.primaryKeyValue = this.valueConverter.convertValueFromGraphQL(primaryKey.field.type, rows[i][primaryKey.code]);

            return result
        });

        this.logger.Debug(`GenerateValuesByRowResult() Parsed results`, resultRows);

        return resultRows
    }
}