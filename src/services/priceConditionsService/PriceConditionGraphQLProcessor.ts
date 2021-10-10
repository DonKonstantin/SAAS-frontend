import {graphQlSchemaValueConverter} from "../graphQlSchemaValueConverter";
import {Schemas} from "../../settings/schema";
import {PriceCondition} from "./interface";

/**
 * Преобразование значений сущности условия ценового предложения в формат GraphQL
 * @param condition
 */
export function ConvertPriceConditionToGraphQL(condition: PriceCondition): PriceCondition {
    const valueConverter = graphQlSchemaValueConverter()
    const schema = (new Schemas())['transport_offer_condition']

    // @ts-ignore
    return Object.keys(condition).reduce(
        (result: PriceCondition, key: string): PriceCondition => {
            return {
                ...result,
                // @ts-ignore
                [key]: valueConverter.convertValueToGraphQL(schema.fields[key], condition[key])
            }
        },
        {}
    )
}

/**
 * Преобразование значений сущности условия ценового предложения в формат GraphQL
 * @param condition
 */
export function ConvertPriceConditionFromGraphQL(condition: PriceCondition): PriceCondition {
    const valueConverter = graphQlSchemaValueConverter()
    const schema = (new Schemas())['transport_offer_condition']

    // @ts-ignore
    return Object.keys(condition).reduce(
        (result: PriceCondition, key: string): PriceCondition => {
            return {
                ...result,
                // @ts-ignore
                [key]: valueConverter.convertValueFromGraphQL(schema.fields[key], condition[key])
            }
        },
        {}
    )
}