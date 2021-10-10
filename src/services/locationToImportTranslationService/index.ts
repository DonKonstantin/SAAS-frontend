import {LocationToImportTranslationServiceInterface} from "./interface";
import {LocationToImportTranslationService} from "./LocationToImportTranslationService";
import {translationService} from "../translationService";
import getConfig from "next/dist/next-server/lib/runtime-config";

// Фабрика сервиса
export const locationToImportTranslationService: {(): LocationToImportTranslationServiceInterface} = () => {
    const {publicRuntimeConfig} = getConfig();
    return new LocationToImportTranslationService(
        translationService(),
        parseInt(publicRuntimeConfig.translationMaxQueriesPerTime),
    )
};