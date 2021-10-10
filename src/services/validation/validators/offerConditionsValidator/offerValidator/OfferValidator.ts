import {OfferValidatorInterface} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";
import {ValidationResult} from "../../../../../settings/pages/system/edit";
import {ConditionValidator} from "../conditionValidators/interfaces";
import {Collection} from "../../../../types";

/**
 * Валидатора ценовых предложений
 */
export class OfferValidator implements OfferValidatorInterface {
    private readonly validators: ConditionValidator[];

    /**
     * Конструктор валидатора
     * @param validators
     */
    constructor(validators: ConditionValidator[]) {
        this.validators = validators
    }

    /**
     * Валидация ценовых предложений
     * @param conditions
     */
    async Validate(conditions: PriceCondition[]): Promise<ValidationResult> {
        let result = await conditions.reduce(async (result: Promise<Collection<string | undefined>[]>, condition: PriceCondition): Promise<Collection<string | undefined>[]> => {
            let responseResult = result ? await result : [];
            const validationResults: Collection<string | undefined> = {};

            await Promise.all(this.validators.map(async validator => {
                const result = await validator.Validate(condition);
                if (result.error) {
                    validationResults[result.field] = result.error
                }
            }));

            return [...responseResult, validationResults]
        }, null);

        if (!result) {
            return null
        }

        let hasError: boolean = false;
        result.map(res => {
            if (Object.keys(res).length > 0) {
                hasError = true
            }
        });

        return hasError ? JSON.stringify(result) : null
    }
}