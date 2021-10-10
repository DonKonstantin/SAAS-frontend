import {ReduxActionTypes} from "../../../ReduxStore";
import {
    RouteCalculationStore,
} from "../../../stores/RouteCalculationStore";
import {ActionHandler} from "../system/ActionHandler";

/**
 * Reducer изменения значения параметров виджета
 */
export class ChangeStartTransportingCondition implements ActionHandler<RouteCalculationStore, "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION"> {
    /**
     * Обработка события
     * @param store
     * @param payload
     */
    handle(store: RouteCalculationStore, payload: ReduxActionTypes["ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION"]): RouteCalculationStore {
        let newStore: RouteCalculationStore = JSON.parse(JSON.stringify(store));

        newStore.ContainerParameters.startTransportingCondition = payload;
        newStore.ContainerParameters.isNeedPrekeridge = false;

        newStore.CustomCargoParameters.startTransportingCondition = payload;
        newStore.CustomCargoParameters.isNeedPrekeridge = false;

        return newStore;
    }
}