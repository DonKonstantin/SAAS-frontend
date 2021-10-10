import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Сервис поиска плеча по переданным параметрам
 */
export interface ShoulderIdSearchServiceInterface {
    /**
     * Поиск первого доступного плеча для переданных параметров
     * @param shoulder
     */
    searchShoulder(shoulder: Values<Shoulder>): Promise<string | null>
}