import {FieldParsersInterface} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../settings/schema";
import {ListFieldConfiguration, ListFieldValueTypes} from "../../types";
import {QueryRow} from "../interfaces";
import {SchemaValueConverterInterface} from "../../../../schemaValueConverter/interfaces";
import {EnumValue} from "../../listValues/EnumValue";

export class EnumFieldsParser implements FieldParsersInterface<"Enum"> {
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
        schema: T, config: ListFieldConfiguration<T, K>, rows: QueryRow<T>[]
    ): Promise<ListFieldValueTypes["Enum"][]> {
        // @ts-ignore
        const field: SchemaField = this.schemas[schema].fields[config.field];

        return rows.reduce((result: ListFieldValueTypes["Enum"][], row: QueryRow<T>): ListFieldValueTypes["Enum"][] => {
            if (!field.enum) {
                return [...result]
            }

            const value = this.valueConverter.convertValueFromGraphQL(field.type, row[config.field]);

            const item = new EnumValue();
            item.value = value;
            item.variants = field.enum.variants;

            return [...result, item]
        }, [])
    }
}