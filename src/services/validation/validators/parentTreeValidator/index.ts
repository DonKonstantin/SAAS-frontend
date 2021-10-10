import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {graphQlSchemaValueConverter} from "../../../graphQlSchemaValueConverter";
import getPrimaryKeyForSchema from "../../../helpers/GetPrimaryKeyForSchema";
import {graphQLClient} from "../../../graphQLClient";
import {GetChildrenQuery, GetChildrenQueryResponse} from "./GetChildrenQuery";
import {loggerFactory} from "../../../logger";

/**
 * Параметры валидатора родителя для дерева сущностей
 */
export interface ParentTreeValidatorParams<T extends keyof Schemas> {
    schema: T
    field: keyof Schemas[T]['fields']
    method: string,
    methodField: string,
}

/**
 * Валидатор родителя для дерева сущностей
 */
export const ParentTreeValidator: ValidatorFactory<ParentTreeValidatorParams<keyof Schemas>> = parameters => {
    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            if (!params.primaryKey) {
                return null
            }

            const valueConverter = graphQlSchemaValueConverter()
            const logger = loggerFactory().make(`ParentTreeValidator`)
            const client = graphQLClient()
            const schema = (new Schemas())[parameters.schema]

            const currentValue = valueConverter.convertValueToGraphQL(schema.fields[parameters.field], params.value)
            const primaryKey = getPrimaryKeyForSchema(parameters.schema)
            const currentPrimaryKey = valueConverter.convertValueToGraphQL(primaryKey.field, params.primaryKey)

            if (currentPrimaryKey === currentValue) {
                return `Нельзя установить в качестве родителя самого себя`
            }

            try {
                const response = await client.Query<null, GetChildrenQueryResponse>(new GetChildrenQuery(
                    parameters.method,
                    parameters.methodField,
                    primaryKey.code,
                    currentPrimaryKey,
                ), {})

                logger.Debug(`Children response`, response)

                let result: ValidationResult = null
                response.children.map(ch => {
                    const children = valueConverter.convertValueFromGraphQL(primaryKey.field, ch.primaryKey)
                    if (children === params.value) {
                        result = `Нельзя установить в качестве родителя дочерний элемент`
                    }
                })

                return result
            } catch (e) {
                logger.Error(`Some error occurred`, e)
                return `Внутренняя ошибка сервера. Попробуйте позже.`
            }
        }
    }
}