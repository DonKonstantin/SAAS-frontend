import {EntityListStoreLoaderInterfaces} from "./interfaces";
import {EntityListStoreLoader} from "./EntityListStoreLoader";
import {listSchemaConfiguration} from "../../settings/pages";
import {listDataLoader} from "../listDataLoader";

// Фабрика сервиса
export const entityListStoreLoader: {(token?: string): EntityListStoreLoaderInterfaces} = (token?: string): EntityListStoreLoaderInterfaces => (
    new EntityListStoreLoader(
        listSchemaConfiguration,
        listDataLoader(token),
    )
)