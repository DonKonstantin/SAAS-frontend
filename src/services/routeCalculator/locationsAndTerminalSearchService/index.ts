import {LocationsAndTerminalSearchServiceInterface} from "./types";
import {LocationsAndTerminalSearchService} from "./LocationsAndTerminalSearchService";

// Фабрика сервиса
export const locationsAndTerminalSearchService: {(token?: string): LocationsAndTerminalSearchServiceInterface} = token => {
    return new LocationsAndTerminalSearchService(token);
};