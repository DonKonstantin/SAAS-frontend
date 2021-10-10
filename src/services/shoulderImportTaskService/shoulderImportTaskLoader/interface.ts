import {Shoulder} from "../shoulderTypes";
import {Unsubscribable} from "rxjs";
import {ShoulderDTO} from "./shoulderDTOLoader/interface";
import {WithProcessingStatus} from "../baseTypes";

/**
 * Сервис загрузки данных плеч
 */
export interface ShoulderImportTaskLoaderInterface {
    /**
     * Загрузка списка плеч
     * @param taskId
     */
    LoadTaskShoulders(taskId: string): Promise<WithProcessingStatus<Shoulder>[]>

    /**
     * Подписка на изменения плеч
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    SubscribeToShoulders(callback: {(shoulder: WithProcessingStatus<ShoulderDTO>): void}): Unsubscribable
}