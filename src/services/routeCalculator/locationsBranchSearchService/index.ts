import {LocationsBranchServiceInterface} from "./interfaces";
import {LocationsBranchService} from "./LocationsBranchService";
import {locationsAndTerminalSearchService} from "../locationsAndTerminalSearchService";
import {loggerFactory} from "../../logger";
import {LoadByLocationBranchProcessor} from "./LoadByLocationBranchProcessor";
import {LoadByTerminalProcessor} from "./LoadByTerminalProcessor";

// Фабрика сервиса
export const locationsBranchService: {(token?:string): LocationsBranchServiceInterface} = token => {
    return new LocationsBranchService(
        locationsAndTerminalSearchService(),
        loggerFactory(),
        new LoadByLocationBranchProcessor(token),
        new LoadByTerminalProcessor(token),
    )
};