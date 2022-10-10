import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import i18n from "i18n";

interface Params {
    errorMessage?: string
}

/**
 * Валидатор наличия значения
 * @param parameters
 */
export const ValueExistsValidator: ValidatorFactory<Params> = (parameters: Params) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = i18n.t("validators.not-empty-string.error-message")
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