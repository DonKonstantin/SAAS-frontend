import { ValidatorFactory } from "../types";
import {
  EditFieldValidator,
  ValidationParams,
  ValidationResult,
} from "../../../../settings/pages/system/edit";
import { Schemas } from "../../../../settings/schema";
import i18n from "i18n";

interface Params {
  errorMessage?: string;
}

/**
 * Валидатор адреса E-mail
 * @param parameters
 */
export const EmailValidator: ValidatorFactory<Params> = (
  parameters: Params
) => {
  if (!parameters.errorMessage) {
    parameters.errorMessage = i18n.t("validators.email.error-message");
  }

  return new (class implements EditFieldValidator<keyof Schemas> {
    async Validate(
      params: ValidationParams<keyof Schemas>
    ): Promise<ValidationResult> {
      const email = params.value as string;

      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const checkEmail = (email: string) => {
        if (!re.test(email)) {
          return parameters.errorMessage;
        }

        return null;
      };

      if (Array.isArray(email)) {
        const emailErrors = email.map((item) => checkEmail(item));

        //@ts-ignore
        return emailErrors.every((error) => error === undefined)
          ? undefined
          : emailErrors;
      } else {
        return checkEmail(email) || null;
      }
    }
  })();
};
