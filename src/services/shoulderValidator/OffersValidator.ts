import {ShoulderValidatorProcessorInterface} from "./interface";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOfferValidatorInterface} from "./shoulderOfferValidator/interface";
import {Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор ЦП
 */
export class OffersValidator implements ShoulderValidatorProcessorInterface {
    private readonly shoulderOfferValidator: ShoulderOfferValidatorInterface;

    /**
     * Конструктор валидатора
     * @param shoulderOfferValidator
     */
    constructor(shoulderOfferValidator: ShoulderOfferValidatorInterface) {
        this.shoulderOfferValidator = shoulderOfferValidator;
    }

    /**
     * Валидация значений плеча
     * @param condition
     */
    validate(condition: Values<Shoulder>): Values<Shoulder> {
        return {
            ...condition,
            offers: {
                value: (condition.offers.value || []).map(
                    (offer: Values<ShoulderOffer>) => this.shoulderOfferValidator.validate(offer)
                ),
                error: (condition.offers.value || []).length === 0
                    ? "Необходимо добавить хотя бы одно ЦП"
                    : undefined
                ,
            }
        };
    }
}