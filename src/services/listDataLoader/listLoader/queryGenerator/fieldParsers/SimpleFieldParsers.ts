import {FieldParsersInterface} from "./interfaces";
import {FieldType, Schemas} from "../../../../../settings/schema";
import {ListFieldConfiguration, ListFieldValueTypes} from "../../types";
import {QueryRow} from "../interfaces";
import {SimpleValues} from "../../listValues/SimpleValues";
import {SchemaValueConverterInterface} from "../../../../schemaValueConverter/interfaces";

/**
 * Парсер значений простых полей
 */
export class SimpleFieldParsers implements FieldParsersInterface<"Simple"> {
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
    ): Promise<ListFieldValueTypes["Simple"][]> {
        // @ts-ignore
        const fieldType: FieldType = this.schemas[schema].fields[config.field].type;

        return rows.reduce((result: ListFieldValueTypes["Simple"][], row: QueryRow<T>): ListFieldValueTypes["Simple"][] => {
            const value = this.valueConverter.convertValueFromGraphQL(fieldType, row[config.field]);
            const item = new SimpleValues;
            item.value = value;

            return [...result, item]
        }, [])
    }
}