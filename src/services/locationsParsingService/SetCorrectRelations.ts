import {
    FieldsRelations,
    LocationParsingConfiguration,
    LocationsParsingServiceStepInterface,
    SourceRelations
} from "./interface";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {Subject} from "rxjs";

/**
 * Установка значения для отношения по значениям из импорта
 */
export class SetCorrectRelations implements LocationsParsingServiceStepInterface {
    /**
     * Обработка данных текущим шагом
     *
     * @param _
     * @param config
     * @param previousResult
     * @param relations
     * @param subject
     */
    async Process(
        _: ConvertationResponse,
        config: LocationParsingConfiguration,
        previousResult: LocationToImport[],
        relations: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}> {
        const sourceRelation = new SourceRelations;
        const fieldRelations = new FieldsRelations;

        let result: LocationToImport[] = previousResult.map(r => ({...r}));
        Object.keys(config).map((fieldKey: keyof LocationParsingConfiguration) => {
            if (["reference", "compare-with-relation"].indexOf(config[fieldKey].type) === -1) {
                return;
            }

            const conf = config[fieldKey].configuration as {referenceField: keyof LocationParsingConfiguration};
            const targetField = fieldRelations[conf.referenceField]; // Поле в целевой локации, с которым надо сравнить значение
            const locationField = fieldRelations[fieldKey];          // Поле в текущей локации, из которого надо взять значение
            // @ts-ignore
            const sourceField = sourceRelation[fieldKey];            // Поле с оригинальным значением, для которого надо сбросить значение

            let lastProgress = 0;

            // Заменяем значение для сущности, если оно установлено.
            result = result.map((loc, i) => {
                if (`${loc[locationField]}`.length === 0) {
                    return loc
                }

                const targetEntity = previousResult.find(l => l[targetField] === loc[locationField]);
                if (!!targetEntity) {
                    // @ts-ignore
                    loc[locationField] = targetEntity.import_id;
                    if (sourceField) {
                        // @ts-ignore
                        loc[sourceField] = "";
                    }
                } else {
                    // @ts-ignore
                    loc[locationField] = "";
                }

                const currentProgress = Math.round((i + 1) / result.length * 100);
                if ((currentProgress - lastProgress) >= 5) {
                    lastProgress = currentProgress;
                    subject.next({
                        type: "processing",
                        payload: {
                            stepName: `Парсинг отношений для: "${fieldKey}"`,
                            stepProcessingStatus: currentProgress,
                            stepProcessingMaxValue: 100,
                        },
                    })
                }

                return loc
            });

        });

        return {result, relations};
    }

}