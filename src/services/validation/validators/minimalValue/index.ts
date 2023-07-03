import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

interface Params {
    minimalValue: number
    errorMessage?: string
}

/**
 * Валидатор минимального значения
 * @param parameters
 */
export const MinimalValueValidator: ValidatorFactory<Params> = (parameters: Params) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = `Минимальное значение должно быть больше ${parameters.minimalValue}`
    }

    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            if (params.value === undefined || params.value === null || params.value <= parameters.minimalValue) {
                return `${parameters.errorMessage}`
            }

            return null
        }
    }
}