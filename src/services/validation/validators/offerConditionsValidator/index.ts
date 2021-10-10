import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {OfferConditionsAdditionData} from "../../../../custom/components/EditPage/Fields/OfferConditionsField";
import {offerValidator} from "./offerValidator";

/**
 * Валидатор условий ценовых предложений
 */
export const OfferConditionsValidator: ValidatorFactory<{}> = () => {
    return new class implements EditFieldValidator<keyof Schemas> {
        /**
         * Валидация условий ценовых предложений
         * @param params
         */
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            const data: OfferConditionsAdditionData = JSON.parse(JSON.stringify(params.additionData));
            if (data.priceConditions.length === 0) {
                return JSON.stringify([])
            }

            return await offerValidator().Validate(data.priceConditions)
        }
    }
};