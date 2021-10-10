import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {call, put} from "@redux-saga/core/effects";
import {LoadCollection} from "../../../services/helpers/LoadCollection";
import {RouteWidgetParameters} from "../../stores/RouteCalculationStore";
import {currencyLoader} from "../../../services/searchLoaders/currencyLoader";
import {containersLoader} from "../../../services/searchLoaders/containersLoader";
import {endTransportingConditionsLoader} from "../../../services/searchLoaders/endTransportingConditionsLoader";
import {startTransportingConditionsLoader} from "../../../services/searchLoaders/startTransportingConditionsLoader";
import {carriersLoader} from "../../../services/searchLoaders/carriersLoader";
import {contractorLoader} from "../../../services/searchLoaders/contractorLoader";
import {shoulderTypesLoader} from "../../../services/searchLoaders/shouldeTypesLoader";
import {allowanceLoader} from "../../../services/searchLoaders/allowanceLoader";
import {CurrencyData} from "../../../services/searchLoaders/currencyLoader/CurrencyLoaderQuery";
import {unitLoader} from "../../../services/searchLoaders/unitLoader";
import {unitGroupsLoader} from "../../../services/searchLoaders/unitGroupsLoader";
import {UnitData} from "../../../services/searchLoaders/unitLoader/UnitLoaderQuery";

/**
 * Сага загрузки базовых данных виджета маршрутов
 */
export class RouteCalculationReloadSaga implements Saga<"ROUTE_CALCULATION_LOAD_BASE_DATA"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Перезагрузка хранилища
     */
    * handle(_: ReduxAction<"ROUTE_CALCULATION_LOAD_BASE_DATA">): IterableIterator<Effects> {
        yield put<ReduxAction<"ROUTE_CALCULATION_CHANGE_LOADING_STATE">>({
            payload: true,
            type: "ROUTE_CALCULATION_CHANGE_LOADING_STATE",
        });

        // @ts-ignore
        let data: RouteWidgetParameters = yield call(async () => await LoadCollection<RouteWidgetParameters>({
            currencies: currencyLoader().Load(),
            containers: containersLoader().Load(),
            endTransportingConditions: endTransportingConditionsLoader().Load(),
            startTransportingConditions: startTransportingConditionsLoader().Load(),
            carriers: carriersLoader().Load(),
            contractors: contractorLoader().Load(),
            shoulderTypes: shoulderTypesLoader().Load(),
            allowancesData: allowanceLoader().Load(),
            units: unitLoader().Load(),
            unitGroups: unitGroupsLoader().Load(),
        }));

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_TARGET_CURRENCY_ID">>({
            payload: (data.currencies.find(c => c.is_default_for_transport) as CurrencyData).id,
            type: "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_TARGET_CURRENCY_ID",
        });

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_TRANSPORTING_CONDITION">>({
            payload: data.endTransportingConditions[0].id,
            type: "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_TRANSPORTING_CONDITION",
        });

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION">>({
            payload: data.startTransportingConditions[0].id,
            type: "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION",
        });

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_ID">>({
            payload: data.containers[0].id,
            type: "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_ID",
        });

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PALLET_PARAMETERS">>({
            payload: {
                type: (data.units.find(u => u.is_default_for_group && u.unit_group === "4") as UnitData).id,
                quantity: 1,
                normativeHeightOfStacking: 1,
                weight: 10,
            },
            type: "ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PALLET_PARAMETERS",
        });

        yield put<ReduxAction<"ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA">>({
            payload: data,
            type: "ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA",
        });
    }
}