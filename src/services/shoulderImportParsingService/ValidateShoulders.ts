import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {ShoulderValidatorInterface} from "../shoulderValidator/interface";
import {Subject} from "rxjs";

/**
 * Шаг валидации плеч
 */
export class ValidateShoulders implements ShoulderImportParsingStepInterface {
    private readonly shoulderImportValidator: ShoulderValidatorInterface;

    /**
     * Конструктор сервиса
     * @param shoulderImportValidator
     */
    constructor(shoulderImportValidator: ShoulderValidatorInterface) {
        this.shoulderImportValidator = shoulderImportValidator;
    }

    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Валидация плеч"
    }

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param _
     * @param previousResult
     * @param __
     */
    parseData(
        _: { [p: string]: string[][] },
        previousResult: Values<Shoulder>[],
        __: ImportShoulderConfiguration
    ): _StepProcessingResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            const result: Values<Shoulder>[] = [];
            for (let i = 0; i < previousResult.length; i++) {
                const shoulder = previousResult[i];
                result.push(this.shoulderImportValidator.validate(shoulder));

                subject$.next(Math.round(i / previousResult.length * 100))
            }

            return result;
        };

        return {
            callback,
            status: subject$,
        };
    }
}