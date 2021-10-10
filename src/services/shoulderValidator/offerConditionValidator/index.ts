import {OfferConditionValidatorInterface} from "./interface";
import {OfferConditionValidator} from "./OfferConditionValidator";
import {CurrencyValidator} from "./CurrencyValidator";
import {MinValidator} from "./MinValidator";
import {MaxValidator} from "./MaxValidator";
import {RangesValidator} from "./RangesValidator";
import {UnitValidator} from "./UnitValidator";
import {PriceValidator} from "./PriceValidator";
import {FlagNormalizator} from "./FlagNormalizator";
import {AdditionPriceValidator} from "./AdditionPriceValidator";
import {GroupValidator} from "./GroupValidator";
import {IdNormalizer} from "./IdNormalizer";

// Фабрика сервиса
export const offerConditionValidator: { (): OfferConditionValidatorInterface } = () => {
    return new OfferConditionValidator(
        new FlagNormalizator(),
        new CurrencyValidator(),
        new MinValidator(),
        new MaxValidator(),
        new RangesValidator(),
        new UnitValidator(),
        new PriceValidator(),
        new AdditionPriceValidator(),
        new GroupValidator(),
        new IdNormalizer(),
    );
};