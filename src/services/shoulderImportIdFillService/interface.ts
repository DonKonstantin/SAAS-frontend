import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Subscribable} from "rxjs";

// Результат выполнения заполнения ID
export type Response = {
    fill: {(): Promise<Values<Shoulder>[]>}
    status: Subscribable<{
        status: number
    }>
}

/**
 * Сервис заполнения идентификаторов для переданного списка плеч
 */
export interface ShoulderImportIdFillServiceInterface {
    /**
     * Заполнение идентификаторов для переданного списка плеч
     * @param shoulders
     */
    fill(shoulders: Values<Shoulder>[]): Response
}