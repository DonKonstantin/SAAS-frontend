import {FilterBaseValuesLoaderProcessor} from "./interfaces";
import {SchemaValueConverterInterface} from "../../../../schemaValueConverter/interfaces";
import {RegisteredFilterFieldBaseComponentValues} from "../../types";
import {SchemaField, Schemas} from "../../../../../settings/schema";
import {VariantsBaseValues} from "../../fieldBaseData/VariantsBaseValues";

/**
 * Загрузчик значений вариантов
 */
export class VariantsBaseValuesLoader<
 G extends "RelationVariantsSelector" | "VariantsSelectorFloat" | "VariantsSelectorInt" | "VariantsSelectorString" | "RelationAutocompleteSelector"
> implements FilterBaseValuesLoaderProcessor<G> {
    private readonly valueConverter: SchemaValueConverterInterface

    /**
     * Конструктор процессора
     * @param valueConverter
     */
    constructor(valueConverter: SchemaValueConverterInterface) {
        this.valueConverter = valueConverter;
    }

    /**
     * Набор базовых операций агрегации для получения базовых данных
     */
    getOperationsForField(): string[] {
        return [`variants`];
    }

    /**
     * Парсинг значений базового запроса
     * @param schema
     * @param fieldCode
     * @param _
     * @param data
     */
    parseBaseQueryResult<T extends keyof Schemas>(
        schema: T,
        fieldCode: keyof Schemas[T]["fields"],
        _: G,
        data: any
    ): RegisteredFilterFieldBaseComponentValues[G] {
        let result = new VariantsBaseValues<any>()
        const baseVariants = data['variants'][fieldCode] ? data['variants'][fieldCode] : []

        // @ts-ignore
        const config: SchemaField = (new Schemas())[schema].fields[fieldCode]

        result.variants = baseVariants.map((variant: any): any[] => this.valueConverter.convertValueFromGraphQL(config.type, variant))

        return result;
    }
}