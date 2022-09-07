import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import i18n from "i18n";

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
        parameters.errorMessage = i18n.t('validators.minimal-length.error-message', {minimalLength: parameters.minimalLength});
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