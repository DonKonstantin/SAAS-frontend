import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

interface Params {
    errorMessage?: string
    fields: string[]
}

/**
 * Валидатор наличия значения
 * @param parameters
 */
export const ValueExistsInOneOfFields: ValidatorFactory<Params> = (parameters: Params) => {
    if (!parameters.errorMessage) {
        parameters.errorMessage = `Необходимо ввести значение`
    }

    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            let result = false;
            parameters.fields.map(field => {
                if (!params.allValues[field]) {
                    return
                }

                if (Array.isArray(params.allValues[field])) {
                    // @ts-ignore
                    const val: any[] = params.allValues[field];
                    if (val.length !== 0) {
                        result = true
                    }
                } else {
                    if (`${params.allValues[field]}`.length !== 0) {
                        result = true
                    }
                }
            });

            if (result) {
                return null
            }

            return `${parameters.errorMessage}`
        }
    }
};