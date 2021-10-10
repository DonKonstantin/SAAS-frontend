import {RelationVariantsDataLoaderInterface} from "./interfaces";
import {RelationVariantsDataLoader} from "./RelationVariantsDataLoader";

// Фабрика сервиса
export const relationVariantsDataLoader: {(token?: string): RelationVariantsDataLoaderInterface} = (token?: string) => new RelationVariantsDataLoader(token)