import {ExcelFileInterface} from "./interface";
import {ExcelFile} from "./ExcelFile";
import {Authorization} from "../../../reduxStore/stores/Authorization";
import {excelFileConnection} from "../excelFileConnection";
import {commandReceiver} from "./commandReceiver";

/**
 * Фабрика сервисов для работы с Excel файлами
 *
 * При работе обязательно ставить блок try catch, т.к. в случае,
 * если при создании прилетит Exception, то все пойдет по пизде.
 *
 * @param fileId
 * @param user
 */
export const excelFile: {(fileId: string, user: Authorization,): ExcelFileInterface} = (fileId, user) => {
    return new ExcelFile(
        fileId,
        user,
        excelFileConnection(),
        commandReceiver(),
    );
};