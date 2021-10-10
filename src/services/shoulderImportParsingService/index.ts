import {ShoulderImportParsingServiceInterface} from "./interfaces";
import {ShoulderImportParsingService} from "./ShoulderImportParsingService";
import {BaseParsingStep} from "./BaseParsingStep";
import {baseShoulderImportParsingService} from "./baseShoulderImportParsingService";
import {ShoulderFieldConfiguration} from "../shoulderImportTaskService/interfaces";
import {CompareShoulders} from "./CompareShoulders";
import {CompareAllowanceOffers} from "./CompareAllowanceOffers";
import {CompareShoulderOffers} from "./CompareShoulderOffers";
import {UniqueShoulderOfferConditions} from "./UniqueShoulderOfferConditions";
import {UniqueAllowanceOfferConditions} from "./UniqueAllowanceOfferConditions";
import {GroupShoulderOfferConditions} from "./GroupShoulderOfferConditions";
import {GroupAllowanceOfferConditions} from "./GroupAllowanceOfferConditions";
import {RemoveShoulderLocationsForSomeShoulderTypes} from "./RemoveShoulderLocationsForSomeShoulderTypes";
import {RemoveShouldersWithoutImportId} from "./RemoveShouldersWithoutImportId";
import {RemoveShoulderStepsWithoutImportId} from "./RemoveShoulderStepsWithoutImportId";
import {RemoveShoulderOffersWithoutImportId} from "./RemoveShoulderOffersWithoutImportId";
import {RemoveAllowancesWithoutImportId} from "./RemoveAllowancesWithoutImportId";
import {RemoveOfferConditionsWithoutImportId} from "./RemoveOfferConditionsWithoutImportId";
import {ValidateShoulders} from "./ValidateShoulders";
import {shoulderValidator} from "../shoulderValidator";

// Фабрика сервиса
export const shoulderImportParsingService: {(): ShoulderImportParsingServiceInterface} = () => {
    return new ShoulderImportParsingService(
        new BaseParsingStep(
            baseShoulderImportParsingService(
                "import_id",
                () => (new ShoulderFieldConfiguration).shoulder,
                {
                    field: "shoulder_steps",
                    subConfig: "shoulderStep",
                    parser: baseShoulderImportParsingService(
                        "import_id",
                        () => (new ShoulderFieldConfiguration).shoulderStep,
                    ),
                },
                {
                    field: "offers",
                    subConfig: "shoulderOffer",
                    parser: baseShoulderImportParsingService(
                        "import_id",
                        () => (new ShoulderFieldConfiguration).shoulderOffer,
                        {
                            field: "offer_conditions",
                            subConfig: "shoulderOfferCondition",
                            parser: baseShoulderImportParsingService(
                                "import_id",
                                () => (new ShoulderFieldConfiguration).shoulderOfferCondition,
                            )
                        },
                        {
                            field: "allowance_offers",
                            subConfig: "allowanceOffer",
                            parser: baseShoulderImportParsingService(
                                "import_id",
                                () => (new ShoulderFieldConfiguration).allowanceOffer,
                                {
                                    field: "offer_conditions",
                                    subConfig: "shoulderOfferCondition",
                                    parser: baseShoulderImportParsingService(
                                        "import_id",
                                        () => (new ShoulderFieldConfiguration).shoulderOfferCondition,
                                    )
                                },
                            ),
                        },
                    ),
                },
            ),
        ),
        new CompareShoulders(),
        new CompareAllowanceOffers(),
        new CompareShoulderOffers(),
        new UniqueShoulderOfferConditions(),
        new UniqueAllowanceOfferConditions(),
        new GroupShoulderOfferConditions(),
        new GroupAllowanceOfferConditions(),
        new RemoveShoulderLocationsForSomeShoulderTypes(),
        new RemoveShouldersWithoutImportId(),
        new RemoveShoulderStepsWithoutImportId(),
        new RemoveShoulderOffersWithoutImportId(),
        new RemoveAllowancesWithoutImportId(),
        new RemoveOfferConditionsWithoutImportId(),
        new ValidateShoulders(shoulderValidator()),
        // TODO: Пересчет позиции для шагов плеч
    );
};