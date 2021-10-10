import {ActionHandler} from "../system/ActionHandler";
import {RouteCalculationStore} from "../../../stores/RouteCalculationStore";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Обработчик изменения базовых данных виджета
 */
export class StoreWidgetBaseData implements ActionHandler<RouteCalculationStore, "ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA"> {
    handle(store: RouteCalculationStore, payload: ReduxActionTypes["ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA"]): RouteCalculationStore {
        let newStore: RouteCalculationStore = JSON.parse(JSON.stringify(store));
        newStore.BaseData = payload;
        newStore.IsLoading = false;

        return newStore;
    }
}