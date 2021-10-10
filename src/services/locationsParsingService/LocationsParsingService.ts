import {
    LocationParsingConfiguration,
    LocationsParsingServiceInterface,
    LocationsParsingServiceStepInterface
} from "./interface";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {Subject, Subscribable} from "rxjs";

/**
 * Сервис обработки файлов импорта для локаций
 */
export class LocationsParsingService implements LocationsParsingServiceInterface {

    private readonly steps: LocationsParsingServiceStepInterface[];

    /**
     * Конструктор сервиса
     * @param steps
     */
    constructor(steps: LocationsParsingServiceStepInterface[]) {
        this.steps = steps;
    }

    /**
     * Парсинг переданных файлов, для текущих локаций
     * @param files
     * @param config
     */
    ParseLocations(files: ConvertationResponse, config: LocationParsingConfiguration): {
        subscription: Subscribable<ProcessingStatus<keyof StatusTypes>>,
        startProcessingCallback: {(): void}
    } {
        const subject = new Subject<ProcessingStatus<keyof StatusTypes>>();

        // Основной асинхронный метод обработки переданных данных
        const processing = async (): Promise<void> => {
            let previousResult: LocationToImport[] = [];
            let relations: {id: string, default_name: string}[] = [];
            for (let step of this.steps) {
                const {result: currentResult, relations: currentRelations} = await step.Process(
                    files,
                    config,
                    previousResult,
                    relations,
                    subject,
                );

                previousResult = currentResult;
                relations = currentRelations;
            }
        };

        return {
            subscription: subject,
            startProcessingCallback: processing,
        };
    }
}