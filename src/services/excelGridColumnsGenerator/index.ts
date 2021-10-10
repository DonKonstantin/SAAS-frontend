import {ExcelGridColumnsGeneratorInterface} from "./interface";
import {ExcelGridColumnsGenerator} from "./ExcelGridColumnsGenerator";

// Фабрика генератора
export const excelGridColumnsGenerator: {(): ExcelGridColumnsGeneratorInterface} = () => {
    return new ExcelGridColumnsGenerator();
};