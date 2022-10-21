import {FieldParsersInterface} from "./interfaces";
import {Schemas} from "../../../../../settings/schema";
import {ListFieldConfiguration, ListFieldValueTypes} from "../../types";
import {QueryRow} from "../interfaces";
import {SchemaValueConverterInterface} from "../../../../schemaValueConverter/interfaces";
import {SchemaValues} from "../../listValues/SchemaValues";

export class SchemaFieldParser implements FieldParsersInterface<'Schema'> {
    private readonly valueConverter: SchemaValueConverterInterface;
    private readonly schemas: Schemas;

    /**
     * Конструктор парсера
     * @param valueConverter
     */
    constructor(valueConverter: SchemaValueConverterInterface) {
        this.valueConverter = valueConverter;
        this.schemas = new Schemas()
    }

    ParseField<T extends keyof Schemas, K extends keyof Schemas[T]["fields"]>(
        scheme: T,
        config: ListFieldConfiguration<T, K>,
        rows: QueryRow<T>[]
    ): Promise<ListFieldValueTypes["Schema"][]> {
        // @ts-ignore
        const field = this.schemas[scheme].fields[config.field];

        // @ts-ignore
        return rows.reduce((result, row) => {
            if (field.type !== 'Schema') {
                return [...result]
            }

            // @ts-ignore
            const item = new SchemaValues<field.schema, field.isArray>();

            item.value = row[config.field]

            return [...result, item]
        }, [])
    }
}