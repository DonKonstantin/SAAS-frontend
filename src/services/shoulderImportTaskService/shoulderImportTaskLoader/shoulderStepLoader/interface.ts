import {ShoulderStep} from "../../shoulderTypes";

/**
 * Сервис загрузки шагов плеч
 */
export interface ShoulderStepLoaderInterface {
    /**
     * Загрузка шагов плеч из импорта для переданного списка id
     * @param ids
     */
    Load(ids: string[]): Promise<ShoulderStep[]>
}