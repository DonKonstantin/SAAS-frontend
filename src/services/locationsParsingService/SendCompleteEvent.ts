import {LocationParsingConfiguration, LocationsParsingServiceStepInterface} from "./interface";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {Subject} from "rxjs";

/**
 * Шаг отправки итоговых результатов обработки
 */
export class SendCompleteEvent implements LocationsParsingServiceStepInterface  {
    /**
     * Обработка данных текущим шагом
     * @param _
     * @param __
     * @param result
     * @param relations
     * @param subject
     */
    async Process(
        _: ConvertationResponse,
        __: LocationParsingConfiguration,
        result: LocationToImport[],
        relations: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}> {
        subject.next({
            type: "complete",
            payload: {result, relations},
        });

        return {result, relations}
    }
}