import {Loaders, ServerSideReduxStoreLoaderInterface} from "./system";
import {ServerSideReduxStoreLoader} from "./system/ServerSideReduxStoreLoader";
import {AuthorizationLoader} from "./authorization";
import {EntityListLoader} from "./entityList";
import {EntityEditLoader} from "./entityEdit";
import {DebugLoader} from "./debug";
import {LanguagesStoreLoader} from "./languages";
import {RouteCalculationStoreLoader} from "./routeCalculationStore";

// Зарегистрированные загрузчики
const loaders: Loaders = {
    Authorization: new AuthorizationLoader(),
    EntityList: new EntityListLoader(),
    EntityEdit: new EntityEditLoader(),
    Debug: new DebugLoader(),
    LanguagesStore: new LanguagesStoreLoader(),
    RouteCalculation: new RouteCalculationStoreLoader(),
};

// Фабрика загрузчика данных со стороны сервера
export const serverSideReduxStoreLoader: () => ServerSideReduxStoreLoaderInterface = () => {
    return new ServerSideReduxStoreLoader(loaders)
};