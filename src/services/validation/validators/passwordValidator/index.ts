import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

/**
 * Валидатор паролей
 */
export const PasswordValidator: ValidatorFactory<{}> = () => {
    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            if (!params.additionData.id.password) {
                return `Пароль не заполнен`
            }

            if (`${params.additionData.id.password}`.length < 10) {
                return `Минимальная длина пароля - 10 символов`
            }

            const textRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[-\w#!$@%^&*+~=:;?\/]{10,}$/
            if (!textRegExp.test(params.additionData.id.password)) {
                return `Пароль должен содержать минимум 1 символ верхнего и нижнего регистра, а также 1 цифру`
            }

            if (params.additionData.id.password !== params.additionData.id.confirm) {
                return `Пароли не совпадают`
            }

            return null
        }
    }
}