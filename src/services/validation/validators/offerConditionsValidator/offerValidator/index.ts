import {OfferValidatorInterface} from "./interfaces";
import {OfferValidator} from "./OfferValidator";
import {MinValueValidator} from "../conditionValidators/minValueValidator";
import {MaxValueValidator} from "../conditionValidators/maxValueValidator";
import {UnitValidator} from "../conditionValidators/unitValidator";
import {CurrencyValidator} from "../conditionValidators/currencyValidator";
import {PriceValidator} from "../conditionValidators/priceValidator";

/**
 * Фабрика валидатора
 */
export const offerValidator: { (): OfferValidatorInterface } = () => (
    new OfferValidator([
        new MinValueValidator(),
        new MaxValueValidator(),
        new UnitValidator(),
        new CurrencyValidator(),
        new PriceValidator(),
    ])
);