import {ImportSettingsBaseServiceInterface} from "./interfaces";
import {ImportSettingsBaseService} from "./ImportSettingsBaseService";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Конструктор сервиса
export const importSettingsBaseService: {(): ImportSettingsBaseServiceInterface} = () => {
    return new ImportSettingsBaseService(
        graphQLClient(),
        loggerFactory(),
    );
};