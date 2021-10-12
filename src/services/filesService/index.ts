import {FilesServiceInterface} from "./interface";
import {FilesService} from "./FilesService";
import {loggerFactory} from "../logger";
import getConfig from "next/dist/next-server/lib/runtime-config";
import {getAuthorizationToken} from "../../context/AuthorizationContext";

// Фабрика сервиса
export const filesService: { (): FilesServiceInterface } = () => {
    const {publicRuntimeConfig: {fileUploadingEndpoint, fileViewEndpoint}} = getConfig();

    return new FilesService(
        loggerFactory(),
        fileUploadingEndpoint,
        fileViewEndpoint,
        getAuthorizationToken(),
    )
};