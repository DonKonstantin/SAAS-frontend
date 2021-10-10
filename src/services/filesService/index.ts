import {FilesServiceInterface} from "./interface";
import {FilesService} from "./FilesService";
import {loggerFactory} from "../logger";
import getConfig from "next/dist/next-server/lib/runtime-config";
import {getToken} from "../graphQLClient";

// Фабрика сервиса
export const filesService: {(token?: string): FilesServiceInterface} = token => {
    const {publicRuntimeConfig: {fileUploadingEndpoint, fileViewEndpoint}} = getConfig();

    return new FilesService(
        loggerFactory(),
        fileUploadingEndpoint,
        fileViewEndpoint,
        getToken(token),
    )
};