import {Schemas} from "../../settings/schema";
import {SearchUntypedLoaderInterface} from "./interfaces";
import {SearchUntypedLoader} from "./SearchUntypedLoader";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const searchUntypedLoader: {<T extends keyof Schemas>(token?: string): SearchUntypedLoaderInterface<T>} = (token?: string) => (
    new SearchUntypedLoader(loggerFactory(), token)
);