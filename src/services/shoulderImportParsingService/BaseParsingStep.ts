import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {
    ImportShoulderConfiguration,
    ImportShoulderOffer, ImportShoulderStep,
    ShoulderFieldConfiguration
} from "../shoulderImportTaskService/interfaces";
import {BaseShoulderImportParsingServiceInterface} from "./baseShoulderImportParsingService/interfaces";
import {ImportParsingTypes} from "../shoulderImportTaskService/baseTypes";
import {Subject} from "rxjs";
import {bufferTime} from "rxjs/operators";

/**
 * Шаг предварительного парсинга сущностей плеч
 */
export class BaseParsingStep implements ShoulderImportParsingStepInterface {
    private readonly baseShoulderImportParsingService: BaseShoulderImportParsingServiceInterface<
        ShoulderFieldConfiguration,
        "shoulder",
        Shoulder,
        ImportParsingTypes,
        {
            shoulderOffer: ImportShoulderOffer,
            shoulderStep: ImportShoulderStep,
        }
    >;

    /**
     * Конструктор сервиса
     * @param baseShoulderImportParsingService
     */
    constructor(baseShoulderImportParsingService: BaseShoulderImportParsingServiceInterface<
        ShoulderFieldConfiguration,
        "shoulder",
        Shoulder,
        ImportParsingTypes,
        {
            shoulderOffer: ImportShoulderOffer,
            shoulderStep: ImportShoulderStep,
        }
    >) {
        this.baseShoulderImportParsingService = baseShoulderImportParsingService
    }

    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Предварительная обработка"
    }

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param data
     * @param _
     * @param configuration
     */
    parseData(
        data: { [T in string]: string[][] },
        _: Values<Shoulder>[],
        configuration: ImportShoulderConfiguration,
    ): _StepProcessingResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            const {callback, complete} = this.baseShoulderImportParsingService.parseData(
                data,
                [],
                {},
                configuration,
            );

            const subscription = complete.pipe(bufferTime(100)).subscribe({
                next: value => {
                    if (value.length === 0) {
                        return
                    }

                    subject$.next(value[value.length - 1])
                },
            });

            const values = await callback();

            subscription.unsubscribe();
            subject$.complete();

            return values.values
        };


        return {
            callback,
            status: subject$,
        }
    }
}