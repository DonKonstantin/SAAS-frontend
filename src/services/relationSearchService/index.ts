import {RelationSearchServiceInterface} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {RelationSearchService} from "./RelationSearchService";

// Фабрика сервиса
export const relationSearchService: {<T extends keyof Schemas>(token?: string): RelationSearchServiceInterface<T>} = (token?: string) => (
    new RelationSearchService(token)
);