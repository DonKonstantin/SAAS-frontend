import {ShoulderImportGridCellCheckerInterface} from "./interfaces";
import {
    ImportAllowanceOffer,
    ImportShoulderConfiguration,
    ImportShoulderOffer, ImportShoulderOfferCondition,
    ImportShoulderStep
} from "../shoulderImportTaskService/interfaces";
import {ShoulderImportGridCellChecker} from "./ShoulderImportGridCellChecker";
import {ColumnOfConfigProcessor} from "./ColumnOfConfigProcessor";
import {
    AllowanceOfferColors,
    ShoulderColors,
    ShoulderOfferColors,
    ShoulderOfferConditionColors,
    ShoulderStepColors
} from "./colors";
import {
    AllowanceOffer,
    Shoulder,
    ShoulderOffer,
    ShoulderOfferCondition,
    ShoulderStep
} from "../shoulderImportTaskService/shoulderTypes";
import {CellOfConfigProcessor} from "./CellOfConfigProcessor";
import {SubEntitiesProcessor} from "./SubEntitiesProcessor";

// Фабрика сервиса
export const shoulderImportGridCellChecker: {(): ShoulderImportGridCellCheckerInterface<ImportShoulderConfiguration>} = () => {
    return new ShoulderImportGridCellChecker<ImportShoulderConfiguration>(
        new CellOfConfigProcessor<Shoulder, ImportShoulderConfiguration>(new ShoulderColors),
        new ColumnOfConfigProcessor<Shoulder, ImportShoulderConfiguration>(new ShoulderColors),
        new SubEntitiesProcessor<"shoulderStep", ImportShoulderStep, ImportShoulderConfiguration>(
            "shoulderStep",
            new ShoulderImportGridCellChecker<ImportShoulderStep>(
                new CellOfConfigProcessor<ShoulderStep, ImportShoulderStep>(new ShoulderStepColors),
                new ColumnOfConfigProcessor<ShoulderStep, ImportShoulderStep>(new ShoulderStepColors),
            ),
        ),
        new SubEntitiesProcessor<"shoulderOffer", ImportShoulderOffer, ImportShoulderConfiguration>(
            "shoulderOffer",
            new ShoulderImportGridCellChecker<ImportShoulderOffer>(
                new CellOfConfigProcessor<ShoulderOffer, ImportShoulderOffer>(new ShoulderOfferColors),
                new ColumnOfConfigProcessor<ShoulderOffer, ImportShoulderOffer>(new ShoulderOfferColors),
                new SubEntitiesProcessor<"shoulderOfferCondition", ImportShoulderOfferCondition, ImportShoulderOffer>(
                    "shoulderOfferCondition",
                    new ShoulderImportGridCellChecker<ImportShoulderOfferCondition>(
                        new CellOfConfigProcessor<ShoulderOfferCondition, ImportShoulderOfferCondition>(new ShoulderOfferConditionColors),
                        new ColumnOfConfigProcessor<ShoulderOfferCondition, ImportShoulderOfferCondition>(new ShoulderOfferConditionColors),
                    ),
                ),
                new SubEntitiesProcessor<"allowanceOffer", ImportAllowanceOffer, ImportShoulderOffer>(
                    "allowanceOffer",
                    new ShoulderImportGridCellChecker<ImportAllowanceOffer>(
                        new CellOfConfigProcessor<AllowanceOffer, ImportAllowanceOffer>(new AllowanceOfferColors),
                        new ColumnOfConfigProcessor<AllowanceOffer, ImportAllowanceOffer>(new AllowanceOfferColors),
                        new SubEntitiesProcessor<"shoulderOfferCondition", ImportShoulderOfferCondition, ImportAllowanceOffer>(
                            "shoulderOfferCondition",
                            new ShoulderImportGridCellChecker<ImportShoulderOfferCondition>(
                                new CellOfConfigProcessor<ShoulderOfferCondition, ImportShoulderOfferCondition>(new ShoulderOfferConditionColors),
                                new ColumnOfConfigProcessor<ShoulderOfferCondition, ImportShoulderOfferCondition>(new ShoulderOfferConditionColors),
                            ),
                        ),
                    ),
                ),
            ),
        ),
    )
};