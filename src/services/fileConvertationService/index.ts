import {FileConvertationServiceInterface} from "./interfaces";
import {FileConvertationService} from "./FileConvertationService";
import getConfig from "next/dist/next-server/lib/runtime-config";

// Фабрика сервиса
export const fileConvertationService: {(): FileConvertationServiceInterface} = () => {
    const {publicRuntimeConfig: { fileConvertationCsvEndpoint, fileConvertationXlsxEndpoint }} = getConfig();

    return new FileConvertationService(
        fileConvertationCsvEndpoint,
        fileConvertationXlsxEndpoint,
    )
};