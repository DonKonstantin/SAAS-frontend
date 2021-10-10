import {ShoulderValidatorInterface} from "./interface";
import {ShoulderValidator} from "./ShoulderValidator";
import {ShoulderStepValidator} from "./ShoulderStepValidator";
import {OffersValidator} from "./OffersValidator";
import {shoulderOfferValidator} from "./shoulderOfferValidator";
import {ShoulderTypeValidator} from "./ShoulderTypeValidator";
import {TerminalsRequiredValidator} from "./TerminalsRequiredValidator";
import {LocationsRequired} from "./LocationsRequired";
import {ContractorValidator} from "./ContractorValidator";
import {CarrierValidator} from "./CarrierValidator";
import {DistanceValidator} from "./DistanceValidator";
import {DistanceUnitValidator} from "./DistanceUnitValidator";
import {IdNormalizer} from "./IdNormalizer";

// Конструктор валидатора
export const shoulderValidator: {(): ShoulderValidatorInterface} = () => {
    return new ShoulderValidator(
        new ShoulderStepValidator(),
        new OffersValidator(shoulderOfferValidator()),
        new ShoulderTypeValidator(),
        new LocationsRequired(),
        new TerminalsRequiredValidator(),
        new ContractorValidator(),
        new CarrierValidator(),
        new DistanceValidator(),
        new DistanceUnitValidator(),
        new IdNormalizer(),
    );
};