import {
    ConvertFilesToBaseLocationToImportProcessorInterface,
    LocationParsingConfiguration,
    LocationsParsingServiceStepInterface
} from "./interface";
import {LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {Subject} from "rxjs";

/**
 * Шаг преобразования файла импорта в базовый объект локации для импорта
 */
export class ConvertFilesToBaseLocationToImport implements LocationsParsingServiceStepInterface {

    private readonly processors: ConvertFilesToBaseLocationToImportProcessorInterface[];

    /**
     * Конструктор шага
     * @param processors
     */
    constructor(processors: ConvertFilesToBaseLocationToImportProcessorInterface[]) {
        this.processors = processors;
    }

    /**
     * Обработка данных текущим шагом
     * @param files
     * @param config
     * @param _
     * @param __
     * @param subject
     */
    async Process(
        files: ConvertationResponse,
        config: LocationParsingConfiguration,
        _: LocationToImport[],
        __: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}> {
        let total = 0;
        for (let file of Object.values(files)) {
            total += file.length;
        }

        let resultIndex = 0;
        let result: LocationToImport[] = new Array(total);
        Object.keys(files).map(fileName => {
            const fileData = files[fileName];
            const max = fileData.length;

            let prevPercents = 0;
            fileData.map((row, i) => {
                const locationToImport: LocationToImport = {
                    default_name: this.convertFieldByConfigForRow(row, "defaultName", config),
                    id: "",
                    import_id: this.convertFieldByConfigForRow(row, "id", config),
                    is_country: this.getBooleanValuesArray().indexOf(this.convertFieldByConfigForRow(row, "isCountry", config)) !== -1,
                    is_user_searchable: this.getBooleanValuesArray().indexOf(this.convertFieldByConfigForRow(row, "isUserSearchable", config)) !== -1,
                    localized_names: [],
                    parent_id: "",
                    parent_import_id: this.convertFieldByConfigForRow(row, "parent", config),
                    symbol_code: this.convertFieldByConfigForRow(row, "symbolCode", config),
                    latitude: parseFloat(this.convertFieldByConfigForRow(row, "latitude", config)),
                    longitude: parseFloat(this.convertFieldByConfigForRow(row, "longitude", config)),
                    populated_area: this.getBooleanValuesArray().indexOf(this.convertFieldByConfigForRow(row, "isPopulationArea", config)) !== -1,
                    population: parseInt(this.convertFieldByConfigForRow(row, "population", config)),
                    search_tags: [],
                };

                const current = i + 1;
                const currentPercents = Math.round(current / max * 100);
                if (currentPercents - prevPercents >= 5) {
                    subject.next({
                        type: "processing",
                        payload: {
                            stepName: `Парсинг файла: "${fileName}"`,
                            stepProcessingStatus: currentPercents,
                            stepProcessingMaxValue: 100,
                        },
                    });

                    prevPercents = currentPercents;
                }

                result[resultIndex] = locationToImport;
                resultIndex++;
            })

        });

        return {result, relations: []};
    }

    /**
     * Получение доступных вариантов значений для поля тип Boolean
     */
    private getBooleanValuesArray(): any[] {
        return [
            "Да", "ДА", "да", "дА",
            "true", "True", "tRue", "trUe", "truE",
            "TRue", "tRUe", "trUE",
            "TRUe", "tRUE", "TRUE",
            true, 1, "1"
        ];
    }

    /**
     * Конвертация значения для переданного поля в результат для локации для импорта
     * @param row
     * @param fieldCode
     * @param config
     */
    private convertFieldByConfigForRow(
        row: string[],
        fieldCode: keyof LocationParsingConfiguration,
        config: LocationParsingConfiguration
    ): any {
        for (let processor of this.processors) {
            if (processor.isAvailable(config[fieldCode])) {
                return processor.convert(row, config[fieldCode])
            }
        }

        return undefined;
    }
}