import {ShoulderStepData} from "../searchLoaders/shoulderStepsLoader/ShoulderStepsLoaderQuery";

/**
 * Сервис настройки шагов плеча
 */
export interface ShoulderStepsServiceInterface {
    /**
     * Клонирование шагов плеча
     * @param steps
     */
    CloneShoulderSteps(steps: ShoulderStepData[]): ShoulderStepData[]

    /**
     * Обработка сохранения шагов плеча
     * @param steps
     */
    StoreShoulderSteps(steps: ShoulderStepData[]): Promise<ShoulderStepData[]>
}