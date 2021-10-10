import {ReduxActionTypes} from "../../../ReduxStore";
import {
    ContainerRouteCalculationParameters, CustomCargoRouteCalculationParameters,
    RouteCalculationStore,
    RouteCalculationStoreActionTypes
} from "../../../stores/RouteCalculationStore";
import {ActionHandler} from "../system/ActionHandler";

/**
 * Reducer изменения значения параметров виджета
 */
export class ChangeWidgetParameter<Action extends keyof RouteCalculationStoreActionTypes, Field extends keyof ContainerRouteCalculationParameters | keyof CustomCargoRouteCalculationParameters> implements ActionHandler<RouteCalculationStore, Action> {
    private readonly field: Field;

    /**
     * Конструктор reducer
     * @param field
     */
    constructor(field: Field) {
        this.field = field
    }

    /**
     * Обработка события
     * @param store
     * @param payload
     */
    handle(store: RouteCalculationStore, payload: ReduxActionTypes[Action]): RouteCalculationStore {
        let newStore: RouteCalculationStore = JSON.parse(JSON.stringify(store));

        // @ts-ignore
        newStore.ContainerParameters[this.field] = payload;
        // @ts-ignore
        newStore.CustomCargoParameters[this.field] = payload;

        return newStore;
    }
}