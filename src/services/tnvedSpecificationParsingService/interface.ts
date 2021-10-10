import {Observable} from "rxjs";

// Название полей
export const specificationParametersNames: {[T in keyof Required<ParsingParameters>]: string} = {
    sku: "Артикул",
    name: "Название товара",
    tnvedCode: "Код ТНВЭД",
    tnvedName: "Название ТНВЭД",
    categoryCode: "Код категории",
    categoryName: "Название категории",
    unit: "Количество (Ед. изм.)",
    quantity: "Количетсво",
    quantityBase: "Количество (шт)",
    weightNetto: "Вес НЕТТО",
    weightBrutto: "Вес БРУТТО",
    price: "Стоимость",
};

// Параметры парсинга базового файла импорта
export type ParsingParameters = Partial<{
    sku: number             // Артикул
    name: number            // Название товара
    tnvedCode: number       // Код ТНВЭД товара
    tnvedName: number       // Название ТНВЭД товара
    categoryCode: number    // Код категории товара ТНВЭД
    categoryName: number    // Название категории ТНВЭД
    unit: number            // Единица измерения для колонки Количество
    quantity: number        // Колонка Количетсво
    quantityBase: number    // Колонка Количество (шт)
    weightNetto: number     // Вес НЕТТО
    weightBrutto: number    // Вес БРУТТО
    price: number           // Стоимость
}>;

// Результаты подготовки данных
export type PrepareDataResult = {
    callback: {(): Promise<string[][]>}
    subject: Observable<number>
}

// Результаты генерации данных спецификации
export type GenerateSpecificationDataResult = {
    callback: {(): Promise<string[][]>}
    subject: Observable<number>
};

// Параметры генерации спецификации
export type GenerationParameters = {
    GroupByColumn: number
    Columns: number[]
    ColumnsToSum: number[]
    GroupNameColumn: number
}

// Параметры парсинга для спецификации с 6 цифрами
export class BaseSpecParameters implements GenerationParameters {
    Columns: number[] = [1, 0, 2, 6, 7, 8, 0, 9, 10, 11];
    ColumnsToSum: number[] = [7, 8, 9, 10, 11];
    GroupByColumn: number = 4;
    GroupNameColumn: number = 5;
}

// Параметры парсинга для спецификации с 10 цифрами
export class DetailSpecParameters implements GenerationParameters {
    Columns: number[] = [1, 0, 2, 6, 7, 8, 0, 9, 10, 11];
    ColumnsToSum: number[] = [7, 8, 9, 10, 11];
    GroupByColumn: number = 2;
    GroupNameColumn: number = 5;
}

// Сервис парсинга базовых данных спецификации ТНВЭД
export interface TnvedSpecificationParsingServiceInterface {
    // Парсинг базовых данных и формирование контента для импорта
    PrepareData(baseData: string[][], parameters: ParsingParameters): PrepareDataResult

    // Валидация параметров парсинга
    ValidateParsingParameters(baseData: string[][], parameters: ParsingParameters): ParsingParameters

    // Генерация данных спецификации по переданным параметрам
    GenerateSpecificationData(baseData: string[][], params: GenerationParameters): GenerateSpecificationDataResult
}