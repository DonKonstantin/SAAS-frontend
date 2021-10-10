import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer, ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";
import {AllowanceOfferValidatorInterface} from "../allowanceOfferValidator/interface";

/**
 * Валидация надбавок
 */
export class AllowancesValidator implements ShoulderOfferValidatorProcessorInterface {
    private readonly allowanceOfferValidator: AllowanceOfferValidatorInterface;

    /**
     * Конструктор валидатора
     * @param allowanceOfferValidator
     */
    constructor(allowanceOfferValidator: AllowanceOfferValidatorInterface) {
        this.allowanceOfferValidator = allowanceOfferValidator;
    }

    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            allowance_offers: {
                value: (condition.allowance_offers.value || []).map(
                    (offer: Values<AllowanceOffer>) => this.allowanceOfferValidator.validate(offer)
                ),
            }
        };
    }
}