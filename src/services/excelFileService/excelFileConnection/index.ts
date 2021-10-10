import {ExcelFileConnectionInterface} from "./interface";
import {ExcelFileConnection} from "./ExcelFileConnection";
import getConfig from 'next/config';

// Фабрика канала взаимодействия с WS
export const excelFileConnection: {(): ExcelFileConnectionInterface} = () => {
    const {publicRuntimeConfig} = getConfig();

    return new ExcelFileConnection(publicRuntimeConfig.excelFileWsEndpoint);
};