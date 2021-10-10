import {ShoulderOfferValidatorInterface} from "./interface";
import {ShoulderOfferValidator} from "./ShoulderOfferValidator";
import {OffersValidator} from "./OffersValidator";
import {offerConditionValidator} from "../offerConditionValidator";
import {AllowancesValidator} from "./AllowancesValidator";
import {allowanceOfferValidator} from "../allowanceOfferValidator";
import {CargoTypeGroupValidator} from "./CargoTypeGroupValidator";
import {ContainersValidator} from "./ContainersValidator";
import {ContainerAffiliationIdValidator} from "./ContainerAffiliationIdValidator";
import {ContainerNominalWeightValidator} from "./ContainerNominalWeightValidator";
import {FlagsNormalizator} from "./FlagsNormalizator";
import {LoadingConditionValidator} from "./LoadingConditionValidator";
import {UnloadingConditionValidator} from "./UnloadingConditionValidator";
import {FreeTimeOnStartTerminalValidator} from "./FreeTimeOnStartTerminalValidator";
import {FreeTimeOnEndTerminalValidator} from "./FreeTimeOnEndTerminalValidator";
import {ActiveDateValidator} from "./ActiveDateValidator";
import {DeliveryModeValidator} from "./DeliveryModeValidator";
import {DeliveryTimeValidator} from "./DeliveryTimeValidator";
import {IdNormalizer} from "./IdNormalizer";

// Фабрика валидатора
export const shoulderOfferValidator: {(): ShoulderOfferValidatorInterface} = () => {
    return new ShoulderOfferValidator(
        new OffersValidator(offerConditionValidator()),
        new AllowancesValidator(allowanceOfferValidator()),
        new CargoTypeGroupValidator(),
        new ContainersValidator(),
        new ContainerAffiliationIdValidator(),
        new ContainerNominalWeightValidator(),
        new FlagsNormalizator(),
        new LoadingConditionValidator(),
        new UnloadingConditionValidator(),
        new FreeTimeOnStartTerminalValidator(),
        new FreeTimeOnEndTerminalValidator(),
        new ActiveDateValidator(),
        new DeliveryModeValidator(),
        new DeliveryTimeValidator(),
        new IdNormalizer(),
    )
};