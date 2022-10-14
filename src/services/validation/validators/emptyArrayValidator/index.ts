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
 * Валидатор пустого массива
 * @param parameters
 */
export const EmptyArrayValidator: ValidatorFactory<Params> = (
  parameters: Params
) => {
  if (!parameters.errorMessage) {
    parameters.errorMessage = i18n.t("validators.empty-array.error-message");
  }

  return new (class implements EditFieldValidator<keyof Schemas> {
    async Validate(
      params: ValidationParams<keyof Schemas>
    ): Promise<ValidationResult> {
      const value = params.value as any[];

      if (!value.length) {
        return i18n.t`${parameters.errorMessage}`;
      }

      return null;
    }
  })();
};
