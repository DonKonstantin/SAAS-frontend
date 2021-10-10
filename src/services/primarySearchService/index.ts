import {PrimarySearchServiceInterface} from "./interfaces";
import {PrimarySearchService} from "./PrimarySearchService";
import {SearchConfig} from "../../settings/search/system/types";
import {searchConfig} from "../../settings/search";

// Фабрика сервиса
export const primarySearchService: {(config?: SearchConfig): PrimarySearchServiceInterface} = (config?: SearchConfig) => {
    return new PrimarySearchService(config || searchConfig())
};