import {ActionDispatcher, DispatcherFactory} from "./ActionDispatcher";
import {ReduxActionDispatcher} from "./ReduxActionDispatcher";
import {ReduxActionFactoryCallback} from "../system/BaseReduxAction";
import {store} from "../system";

export const dispatcher: DispatcherFactory =
    (): ActionDispatcher => new ReduxActionDispatcher(
        ReduxActionFactoryCallback,
        store().dispatch,
    )
;
