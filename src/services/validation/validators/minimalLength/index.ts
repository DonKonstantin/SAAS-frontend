import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

interface Params {
    minimalLength: number
    errorMessage?: string
}

/**
 * Валидатор минимальной длины значения
 * @param parameters
 */
export const MinimalLengthValidator: ValidatorFactory<Params> = (parameters: Params) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = `Минимальная длина значения должна быть больше ${parameters.minimalLength}`
    }

    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            if (`${params.value}`.length <= parameters.minimalLength) {
                return `${parameters.errorMessage}`
            }

            return null
        }
    }
}