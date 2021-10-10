import {LocationParsingConfiguration, LocationsParsingServiceStepInterface} from "./interface";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {Subject} from "rxjs";
import {Location, LocationsSearchServiceInterface} from "./locationsSearchService/interface";
import {splitArrayToParts} from "../helpers/SplitArrayToParts";

/**
 * Сервис загрузки локаций с сервера по символьным кодам из импорта, а также по символьным кодам родителей
 */
export class LoadLocationsByImportId implements LocationsParsingServiceStepInterface {

    private readonly locationsSearchService: LocationsSearchServiceInterface;

    /**
     * Конструктор шага
     * @param locationsSearchService
     */
    constructor(locationsSearchService: LocationsSearchServiceInterface) {
        this.locationsSearchService = locationsSearchService;
    }

    /**
     * Обработка данных текущим шагом
     * @param _
     * @param __
     * @param result
     * @param ___
     * @param subject
     */
    async Process(
        _: ConvertationResponse,
        __: LocationParsingConfiguration,
        result: LocationToImport[],
        ___: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}> {
        let importIds: string[] = new Array(result.length);

        // Формируем список ID импорта для загрузки
        result.map((loc, i) => {
            importIds[i] = loc.import_id;
        });

        const steps: string[][] = splitArrayToParts(importIds, 100);
        let locations: Location[] = [];
        let processedCodes: number = 0;
        for (let codes of steps) {
            locations.push(...await this.locationsSearchService.SearchByImportId(codes));
            processedCodes += codes.length;

            subject.next({
                type: "processing",
                payload: {
                    stepName: `Поиск гео-объектов`,
                    stepProcessingStatus: processedCodes,
                    stepProcessingMaxValue: importIds.length,
                },
            });
        }

        // Заполяем реальные идентификаторы по найденным локациям
        return { result: result.map(location => {
            let clone = {...location};

            const realLocation = locations.find(l => l.import_id === clone.import_id);

            if (!!realLocation) {
                clone.id = realLocation.id;
            }

            return clone;
        }), relations: [] };
    }
}