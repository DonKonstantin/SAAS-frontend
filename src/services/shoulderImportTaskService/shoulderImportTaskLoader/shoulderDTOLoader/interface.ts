import {Unsubscribable} from "rxjs";
import {WithProcessingStatus} from "../../baseTypes";

// DTO плеча
export type ShoulderDTO = {
    import_id: string               // Временный ID
    id: string | null               // ID плеча
    shoulder_type: string           // Тип плеча
    from_location_ids: string[]     // ID пунктов отправления плеча. (Не обязательно указывать, если указаны терминалы отправления)
    to_location_ids: string[]       // ID пунктов назначения плеча. (Не обязательно указывать, если указаны терминалы назначения)
    from_terminal_ids: string[]     // ID терминалов отправления плеча. (Не обязательно указывать)
    to_terminal_ids: string[]       // ID пунктов назначения плеча. (Не обязательно указывать)
    contractor_id: string           // ID подрядчика
    carrier_id: string              // ID перевозчика
    distance: number                // Расстояние перевозки
    distance_unit: string           // Единица измерения расстояния перевозки
    shoulder_steps: string[]        // Шаги плеча. Используется в мультимодальных плечах.
    is_processed: boolean
    error: string
};

/**
 * Сервис загрузки DTO данных плеч
 */
export interface ShoulderDTOLoaderInterface {
    /**
     * Загрузка данных ЦП из импорта для переданного списка id
     * @param taskId
     */
    Load(taskId: string): Promise<WithProcessingStatus<ShoulderDTO>[]>

    /**
     * Подписка на изменения плеч
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    Subscribe(callback: {(shoulder: WithProcessingStatus<ShoulderDTO>): void}): Unsubscribable
}