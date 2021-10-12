import {Loaders, ServerSideReduxStoreLoaderInterface} from "./system";
import {ServerSideReduxStoreLoader} from "./system/ServerSideReduxStoreLoader";
import {EntityListLoader} from "./entityList";
import {EntityEditLoader} from "./entityEdit";
import {DebugLoader} from "./debug";

// Зарегистрированные загрузчики
const loaders: Loaders = {
    EntityList: new EntityListLoader(),
    EntityEdit: new EntityEditLoader(),
    Debug: new DebugLoader(),
};

// Фабрика загрузчика данных со стороны сервера
export const serverSideReduxStoreLoader: () => ServerSideReduxStoreLoaderInterface = () => {
    return new ServerSideReduxStoreLoader(loaders)
};