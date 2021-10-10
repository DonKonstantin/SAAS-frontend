import {Observable} from "rxjs";

// Параметры парсинга базового файла импорта
export type ParsingParameters = Partial<{
    sku: number
    name: number
    categoryCode: number
    categoryName: number
    tnvedCode: number
}>;

// Параметры обработчика парсера данных
export type PrepareDataResult = {
    callback: {(): Promise<string[][]>}
    subject: Observable<number>
}

// Сервис парсинга базовых данных импорта товаров ТНВЭД
export interface TnvedProductsPreparingServiceInterface {
    // Парсинг базовых данных и формирование контента для импорта
    PrepareData(baseData: string[][], parameters: ParsingParameters): PrepareDataResult
}