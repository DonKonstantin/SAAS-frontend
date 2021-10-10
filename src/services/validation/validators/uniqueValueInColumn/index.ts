import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {graphQLClient} from "../../../graphQLClient";
import {UniqueCheckQuery, UniqueCheckResult} from "./UniqueCheckQuery";

interface Params<T extends keyof Schemas> {
    schema: T,
    field: keyof Schemas[T]['fields']
    errorMessage?: string
}

/**
 * Валидатор уникальных значений для поля
 * @param parameters
 */
export const UniqueValueInColumnValidator: ValidatorFactory<Params<any>> = (parameters: Params<any>) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = `Значение поля должно быть уникальным`
    }

    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            try {
                const response = await graphQLClient().Query<null, UniqueCheckResult>(new UniqueCheckQuery(
                    parameters.schema,
                    parameters.field,
                    params.value,
                    params.primaryKey,
                ), {})

                if (0 === response.check.length) {
                    return `Не удалось проверить уникальность поля. Попробуйте еще раз.`
                }

                if (response.check[0].count > 0) {
                    return `${parameters.errorMessage}`
                }
            } catch (e) {
                return `Не удалось проверить уникальность поля. Попробуйте еще раз.`
            }

            return null
        }
    }
}