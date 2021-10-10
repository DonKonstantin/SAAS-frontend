import {AllowanceOfferValidatorProcessorInterface} from "./interface";
import {AllowanceOffer, ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {OfferConditionValidatorInterface} from "../offerConditionValidator/interface";

/**
 * Валидатор условий ЦП
 */
export class OffersValidator implements AllowanceOfferValidatorProcessorInterface {
    private readonly offerConditionValidator: OfferConditionValidatorInterface;

    /**
     * Конструктор валидатора
     * @param offerConditionValidator
     */
    constructor(offerConditionValidator: OfferConditionValidatorInterface) {
        this.offerConditionValidator = offerConditionValidator;
    }

    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer> {
        return {
            ...condition,
            offer_conditions: {
                value: (condition.offer_conditions.value || []).map(
                    (offer: Values<ShoulderOfferCondition>) => this.offerConditionValidator.validate(offer)
                ),
                error: (condition.offer_conditions.value || []).length === 0
                    ? "Необходимо добавить хотя бы одно условие"
                    : undefined
                ,
            }
        };
    }
}