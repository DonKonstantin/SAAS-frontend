import {
    FieldsRelations,
    LocationParsingConfiguration,
    LocationsParsingServiceStepInterface, RealFieldsRelations,
    SourceRelations
} from "./interface";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {Subject} from "rxjs";
import {Location, LocationsSearchServiceInterface} from "./locationsSearchService/interface";
import {splitArrayToParts} from "../helpers/SplitArrayToParts";

/**
 * Поиск локаций для отношений, где есть возможность установки реального значения
 */
export class SetRelationsByRealData  implements LocationsParsingServiceStepInterface {
    private readonly locationsSearchService: LocationsSearchServiceInterface;

    /**
     * Конструктор сервиса
     * @param locationsSearchService
     */
    constructor(locationsSearchService: LocationsSearchServiceInterface) {
        this.locationsSearchService = locationsSearchService;
    }

    /**
     * Обработка данных текущим шагом
     *
     * @param _
     * @param config
     * @param previousResult
     * @param ___
     * @param subject
     */
    async Process(
        _: ConvertationResponse,
        config: LocationParsingConfiguration,
        previousResult: LocationToImport[],
        ___: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}> {
        const sourceRelation = new SourceRelations;
        const fieldRelations = new FieldsRelations;
        const realFieldRelations = new RealFieldsRelations;

        let relations: {id: string, default_name: string}[] = [];
        let result: LocationToImport[] = previousResult.map(r => ({...r}));
        for (let fieldKey of (Object.keys(config) as (keyof LocationParsingConfiguration)[])) {
            if (["reference", "compare-with-relation"].indexOf(config[fieldKey].type) === -1) {
                continue;
            }

            const conf = config[fieldKey].configuration as {referenceField: keyof LocationParsingConfiguration};
            const targetField = fieldRelations[fieldKey]; // Целевое поле, из которого надо взять отношение
            // @ts-ignore
            const sourceField = sourceRelation[fieldKey]; // Целевое поле, куда надо записать ID для отношения

            if (!sourceField) {
                continue;
            }

            const realTargetField = realFieldRelations[conf.referenceField]; // Целевое поле, по которому надо поискать целевые сущности

            let values: string[] = new Array(result.length);
            result.map((loc, i) => {
                values[i] = `${loc[targetField]}`
            });

            // Загружаем сущности по целевому полю привязки и импортированным значениям
            const steps: string[][] = splitArrayToParts(values, 100);
            let locations: (Location & {[K in keyof LocationToImport]: string})[] = [];
            let processedCodes: number = 0;
            for (let codes of steps) {
                locations.push(...await this.locationsSearchService.SearchByTargetField(realTargetField, codes));
                processedCodes += codes.length;

                subject.next({
                    type: "processing",
                    payload: {
                        stepName: `Поиск отношений`,
                        stepProcessingStatus: processedCodes,
                        stepProcessingMaxValue: values.length,
                    },
                });
            }

            relations = [...relations, ...locations];
            result = result.map(loc => {
                const currentValue = `${loc[targetField]}`;
                const targetEntity = locations.find(l => l[realTargetField] === currentValue);
                if (!targetEntity) {
                    return loc
                }

                return {
                    ...loc,
                    [sourceField]: targetEntity.id,
                }
            });
        }

        return {result, relations}
    }
}