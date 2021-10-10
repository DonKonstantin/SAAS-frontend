import {TnvedSpecificationParsingServiceInterface} from "./interface";
import {TnvedSpecificationParsingService} from "./TnvedSpecificationParsingService";

// Фабрика сервиса
export const tnvedSpecificationParsingService: {(): TnvedSpecificationParsingServiceInterface} = () => {
    return new TnvedSpecificationParsingService()
};