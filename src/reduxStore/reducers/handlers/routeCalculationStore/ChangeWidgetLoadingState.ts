import {ActionHandler} from "../system/ActionHandler";
import {RouteCalculationStore} from "../../../stores/RouteCalculationStore";
import {ReduxActionTypes} from "../../../ReduxStore";

/**
 * Изменение состояния загрузки виджета
 */
export class ChangeWidgetLoadingState implements ActionHandler<RouteCalculationStore, "ROUTE_CALCULATION_CHANGE_LOADING_STATE"> {
    handle(store: RouteCalculationStore, payload: ReduxActionTypes["ROUTE_CALCULATION_CHANGE_LOADING_STATE"]): RouteCalculationStore {
        let newStore: RouteCalculationStore = JSON.parse(JSON.stringify(store));
        newStore.IsLoading = payload;

        return newStore;
    }
}