import {ExcelFileServiceInterface} from "./interface";
import {ExcelFileService} from "./ExcelFileService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const excelFileService: {(): ExcelFileServiceInterface} = () => {
    return new ExcelFileService(
        graphQLClient(),
        loggerFactory(),
    )
};