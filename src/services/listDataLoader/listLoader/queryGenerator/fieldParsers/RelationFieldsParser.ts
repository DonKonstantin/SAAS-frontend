import {FieldParsersInterface} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../settings/schema";
import {ListFieldConfiguration, ListFieldValueTypes} from "../../types";
import {QueryRow} from "../interfaces";
import {Logger, LoggerFactory} from "../../../../logger/Logger";
import {GraphQLClient, GraphQLQuery} from "../../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Collection} from "../../../../types";
import {RelationValue} from "../../listValues/RelationValue";

/**
 * Парсер значений отношений
 */
export class RelationFieldsParser<G extends "Relation" | "MultipleRelation"> implements FieldParsersInterface<G> {
    private readonly schemas: Schemas;
    private readonly logger: Logger;
    private readonly client: GraphQLClient;

    /**
     * Конструктор парсера
     * @param loggerFactory
     * @param client
     */
    constructor(
        loggerFactory: LoggerFactory,
        client: GraphQLClient
    ) {
        this.schemas = new Schemas();
        this.logger = loggerFactory.make(`RelationFieldsParser`);
        this.client = client
    }

    /**
     * Парсинг поля. Парсит значения из строки и подгружает доп. данные если они нужны
     * @param schema
     * @param config
     * @param rows
     */
    async ParseField<T extends keyof Schemas, K extends keyof Schemas[T]["fields"]>(
        schema: T,
        config: ListFieldConfiguration<T, K>,
        rows: QueryRow<T>[]
    ): Promise<ListFieldValueTypes[G][]> {
        // @ts-ignore
        const fieldSchema: SchemaField = this.schemas[schema].fields[config.field];

        // @ts-ignore
        const defaultRows: ListFieldValueTypes[G][] = rows.reduce((result: ListFieldValueTypes["Relation" | "MultipleRelation"][], row: QueryRow<T>): ListFieldValueTypes["Relation" | "MultipleRelation"][] => {
            if (!Array.isArray(row[config.field])) {
                return [...result, new RelationValue()]
            } else {
                return [...result, []]
            }
        }, []);

        const itemIds = rows.reduce((result: string[], row: QueryRow<T>): string[] => {
            let rowValues: string[] = [];
            if (!Array.isArray(row[config.field])) {
                if (!!row[config.field]) {
                    rowValues = [`${row[config.field]}`]
                }
            } else {
                rowValues = row[config.field].filter((val: any): boolean => !!val).map((val: any): string => `${val}`)
            }

            return [...result, ...rowValues]
        }, []);

        this.logger.Debug(`Parsed field ${config.field} target ID's`, itemIds);

        if (0 === itemIds.length) {
            return defaultRows
        }

        if (!fieldSchema.relation) {
            this.logger.Error(`Field ${config.field} has not relation configuration`);
            return defaultRows
        }

        if (!config.fieldType.config?.relatedFields || 0 === config.fieldType.config?.relatedFields.length) {
            this.logger.Error(`Field ${config.field} has not related fields configuration`);
            return defaultRows
        }

        const query = `query __LIST_REL_DATA__ {rel_data: ${fieldSchema.relation.schema}_list(where: {${String(fieldSchema.relation.target)}: {_in: ["${itemIds.join(`", "`)}"]}}, limit: ${itemIds.length}) {${String(fieldSchema.relation.target)}, ${config.fieldType.config?.relatedFields.join(", ")}}}`;
        try {
            const response = await this.client.Query<null, any>(new class implements GraphQLQuery<null> {
                readonly query: any = gql`${query}`;
                readonly variables: null = null;
            }, {});

            const data = response[`rel_data`] ? response[`rel_data`] : undefined;
            if (!Array.isArray(data)) {
                this.logger.Error(`Field ${config.field}: Response is not valid`, response);
                return []
            }

            this.logger.Debug(`Field ${config.field} addition data`, data);

            let additionColumnsData: Collection<RelationValue> = {};
            data.map(item => {
                const val = new RelationValue();
                // @ts-ignore
                val.relationId = `${item[String(fieldSchema.relation.target)]}`;
                const joinString = config.fieldType.config?.joinSymbol || ", ";
                // @ts-ignore
                val.relationCaption = config.fieldType.config?.relatedFields.map(field => `${item[field]}`).join(joinString) || val.relationId;
                val.relationFieldValues = JSON.parse(JSON.stringify(item));

                additionColumnsData[val.relationId] = val
            });

            this.logger.Debug(`Field ${config.field} parsed data`, additionColumnsData);

            const result = rows.reduce((result: ListFieldValueTypes["Relation" | "MultipleRelation"][], row: QueryRow<T>): ListFieldValueTypes["Relation" | "MultipleRelation"][] => {
                if (!Array.isArray(row[config.field])) {
                    return [...result, additionColumnsData[`${row[config.field]}`]]
                } else {
                    return [...result, row[config.field].map((item: string): RelationValue => additionColumnsData[`${item}`])]
                }
            }, []);

            this.logger.Debug(`Field ${config.field} addition data result`, result);

            // @ts-ignore
            return result
        } catch (e) {
            this.logger.Error(`Field ${config.field}: some error occurred`, config, e);
            return defaultRows
        }
    }
}
