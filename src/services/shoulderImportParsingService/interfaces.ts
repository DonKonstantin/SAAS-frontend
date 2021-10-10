import {Subject, Subscribable} from "rxjs";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

// Статус обработки парсинга
export type ProcessingStatus = {
    step: string
    progress: number
}

// Данные парсинга
export type ParsingData = {
    shoulders: Values<Shoulder>[]
}

// Результат парсинга сырых данных по переданной конфигурации
export type ParsingResult = {
    subscription: Subscribable<ProcessingStatus>
    process: { (): Promise<ParsingData> }
}

/**
 * Интерфейс сервиса парсинга сырых данных по переданной конфигурации
 */
export interface ShoulderImportParsingServiceInterface {
    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param data
     * @param configuration
     */
    parseData(
        data: { [T in string]: string[][] },
        configuration: ImportShoulderConfiguration,
    ): ParsingResult
}

// Результат выполнения обработки данных шагом
export type _StepProcessingResult = {
    callback: { (): Promise<Values<Shoulder>[]> },
    status: Subject<number>,
}

/**
 * Шаг парсинга сырых данных для импорта плеч по переданной конфигурации
 */
export interface ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param data
     * @param previousResult
     * @param configuration
     */
    parseData(
        data: { [T in string]: string[][] },
        previousResult: Values<Shoulder>[],
        configuration: ImportShoulderConfiguration,
    ): _StepProcessingResult
}