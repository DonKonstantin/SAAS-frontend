import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

interface Params {
    errorMessage?: string
}

/**
 * Валидатор наличия значения
 * @param parameters
 */
export const ValueExistsValidator: ValidatorFactory<Params> = (parameters: Params) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = `Необходимо ввести значение`
    }

    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            if (!params.value || `${params.value}`.length === 0) {
                return `${parameters.errorMessage}`
            }

            return null
        }
    }
}