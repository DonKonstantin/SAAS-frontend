import {Subscribable} from "rxjs/internal/types";

// Результат конвертации CSV файлов
export type ConvertationResponse = { [T in string]: string[][]}

// Тип callback функции, описывающий получение статуса выполнения запроса
export type Status = {
    progress: number,
    statusType: "uploading" | "waiting" | "loading",
}

// Результат конвертации
export type ConvertationResult = {
    status: Subscribable<Status>,
    convert: {(): Promise<ConvertationResponse | undefined>}
}

/**
 * Интерфейс сервиса конвертации файлов
 */
export interface FileConvertationServiceInterface {
    /**
     * Конвертация переданных CSV файлов в JSON
     * @param files
     */
    ConvertCsvFiles(files: File[]): ConvertationResult

    /**
     * Конвертация переданного XLSX файла в JSON
     * @param file
     */
    ConvertXlsxFile(file: File): ConvertationResult
}