import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

interface Params {
    lessField: string
    moreField: string
    errorMessage: string
    fieldsEmptyError: string
    lessFieldEmptyError?: string
    moreFieldEmptyError?: string
}

/**
 * Валидатор минимальной длины значения
 * @param parameters
 */
export const DateShouldBeMoreThatAnotherDate: ValidatorFactory<Params> = (parameters: Params) => {
    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            const lessDate = this.getDate(params.allValues[parameters.lessField]);
            const moreDate = this.getDate(params.allValues[parameters.moreField]);

            if (!lessDate && !moreDate) {
                return parameters.fieldsEmptyError
            }

            if (!lessDate) {
                return parameters.lessFieldEmptyError || null
            }

            if (!moreDate) {
                return parameters.moreFieldEmptyError || null
            }

            if (lessDate.getTime() >= moreDate.getTime()) {
                return parameters.errorMessage
            }

            return null
        }

        /**
         * Конвертация переданной даты в UTC
         * @param date
         */
        getDate(date: any): Date | undefined {
            let value: Date | undefined = undefined;
            if (date) {
                // @ts-ignore
                const baseDate = (new Date(date));
                value = new Date(Date.UTC(
                    baseDate.getUTCFullYear(),
                    baseDate.getUTCMonth(),
                    baseDate.getUTCDate(),
                    0,
                    0,
                    0,
                ));
            }

            return value
        }
    }
};