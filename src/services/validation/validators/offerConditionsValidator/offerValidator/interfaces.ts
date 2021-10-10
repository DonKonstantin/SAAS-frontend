import {PriceCondition} from "../../../../priceConditionsService/interface";
import {ValidationResult} from "../../../../../settings/pages/system/edit";

/**
 * Интерфейс валидатора ценовых предложений
 */
export interface OfferValidatorInterface {
    /**
     * Валидация ценовых предложений
     * @param conditions
     */
    Validate(conditions: PriceCondition[]): Promise<ValidationResult>
}