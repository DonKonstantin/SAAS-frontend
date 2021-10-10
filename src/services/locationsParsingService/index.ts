import {LocationsParsingService} from "./LocationsParsingService";
import {LocationsParsingServiceInterface} from "./interface";
import {ConvertFilesToBaseLocationToImport} from "./ConvertFilesToBaseLocationToImport";
import {ConvertColumnProcessor} from "./convertFilesProcessors/ConvertColumnProcessor";
import {ConvertReferenceProcessor} from "./convertFilesProcessors/ConvertReferenceProcessor";
import {ConvertRegularProcessor} from "./convertFilesProcessors/ConvertRegularProcessor";
import {ConvertUuidProcessor} from "./convertFilesProcessors/ConvertUuidProcessor";
import {SendCompleteEvent} from "./SendCompleteEvent";
import {locationsSearchService} from "./locationsSearchService";
import {LoadLocationsByImportId} from "./LoadLocationsByImportId";
import {SetCorrectRelations} from "./SetCorrectRelations";
import {SetRelationsByRealData} from "./SetRelationsByRealData";
import {ConvertCompareProcessor} from "./convertFilesProcessors/ConvertCompareProcessor";
import {ConvertRelationWithCompareProcessor} from "./convertFilesProcessors/ConvertRelationWithCompareProcessor";

// Фабрика сервиса
export const locationsParsingService: {(): LocationsParsingServiceInterface} = () => {
    return new LocationsParsingService([
        new ConvertFilesToBaseLocationToImport([
            new ConvertColumnProcessor(),
            new ConvertReferenceProcessor(),
            new ConvertRegularProcessor(),
            new ConvertUuidProcessor(),
            new ConvertCompareProcessor(),
            new ConvertRelationWithCompareProcessor(),
        ]),
        new LoadLocationsByImportId(locationsSearchService()),
        new SetRelationsByRealData(locationsSearchService()),
        new SetCorrectRelations(),
        new SendCompleteEvent(),
    ]);
};
