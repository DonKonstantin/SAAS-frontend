import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Результат валидации
 */
export type ConditionValidationResult = {
    field: string
    error: string | undefined
}

/**
 * Интерфейс валидатора условия ценового предложения
 */
export interface ConditionValidator {
    /**
     * Валидация значения поля условия ценового предложения
     * @param condition
     */
    Validate(condition: PriceCondition): Promise<ConditionValidationResult>
}