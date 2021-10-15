import {FilterGeneratorProcessor, FilterGeneratorProcessorParams} from "./interfaces";
import {SchemaValueConverterInterface} from "../../../../../schemaValueConverter/interfaces";
import {schemaValueConverter} from "../../../../../schemaValueConverter";
import {SchemaField, Schemas} from "../../../../../../settings/schema";

/**
 * Процессор генерации подзапросов фильтрации для вариантного сравнения
 */
export class VariantsProcessor implements FilterGeneratorProcessor<"RelationVariantsSelector" | "VariantsSelectorFloat" | "VariantsSelectorInt" | "VariantsSelectorString" | "RelationAutocompleteSelector"> {
    private readonly valueConverter: SchemaValueConverterInterface;

    /**
     * Конструктор процессора
     */
    constructor() {
        this.valueConverter = schemaValueConverter()
    }

    /**
     * Генерация подзапроса для одного поля
     * @param params
     */
    GenerateFilter<K extends keyof Schemas, F extends keyof Schemas[K]["fields"]>(
        params: FilterGeneratorProcessorParams<"RelationVariantsSelector" | "VariantsSelectorFloat" | "VariantsSelectorInt" | "VariantsSelectorString" | "RelationAutocompleteSelector", K, F>
    ): string {
        if (params.currentValue.value.value.length === 0
            || JSON.stringify(params.currentValue.value.value) === JSON.stringify(params.originalValue.value.value)
        ) {
            return ""
        }

        // @ts-ignore
        const field: SchemaField = (new Schemas)[params.currentValue.configuration.schema].fields[params.currentValue.configuration.field];
        // @ts-ignore
        const values: string[] = params.currentValue.value.value.map(val => this.valueConverter.convertValueToGraphQL(field.type, val));

        return `${params.currentValue.configuration.field}: {_in: [${values.join(",")}]}`;
    }
}