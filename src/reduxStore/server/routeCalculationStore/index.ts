import {LoadingParams, StoreLoader} from "../system";
import {DeepPartial} from "../../../services/types";
import {ReduxStore} from "../../ReduxStore";
import {DefaultRouteCalculationStore} from "../../reducers/defaults";
import {LoadCollection} from "../../../services/helpers/LoadCollection";
import {currencyLoader} from "../../../services/searchLoaders/currencyLoader";
import {RouteWidgetParameters} from "../../stores/RouteCalculationStore";
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
 * Загрузка базовых данных для виджета
 */
export class RouteCalculationStoreLoader implements StoreLoader<"RouteCalculation"> {
    async Load(params: LoadingParams): Promise<DeepPartial<ReduxStore["RouteCalculation"]>> {
        let result = new DefaultRouteCalculationStore();
        if (!params.token || params.token.length === 0 || !params.initialProps.pageProps?.isNeedLoadRouteCalculatorData) {
            return result
        }

        result.BaseData = await LoadCollection<RouteWidgetParameters>({
            currencies: currencyLoader(params.token).Load(),
            containers: containersLoader(params.token).Load(),
            endTransportingConditions: endTransportingConditionsLoader(params.token).Load(),
            startTransportingConditions: startTransportingConditionsLoader(params.token).Load(),
            carriers: carriersLoader(params.token).Load(),
            contractors: contractorLoader(params.token).Load(),
            shoulderTypes: shoulderTypesLoader(params.token).Load(),
            allowancesData: allowanceLoader(params.token).Load(),
            units: unitLoader(params.token).Load(),
            unitGroups: unitGroupsLoader(params.token).Load(),
        });

        result.ContainerParameters.containerId = result.BaseData.containers[0].id;
        result.ContainerParameters.startTransportingCondition = result.BaseData.startTransportingConditions[0].id;
        result.CustomCargoParameters.startTransportingCondition = result.BaseData.startTransportingConditions[0].id;
        result.ContainerParameters.endTransportingCondition = result.BaseData.endTransportingConditions[0].id;
        result.CustomCargoParameters.endTransportingCondition = result.BaseData.endTransportingConditions[0].id;
        result.ContainerParameters.targetCurrencyId = (result.BaseData.currencies.find(c => c.is_default_for_transport) as CurrencyData).id;
        result.CustomCargoParameters.targetCurrencyId = result.ContainerParameters.targetCurrencyId;
        result.CustomCargoParameters.palletParameters.type = (result.BaseData.units.find(u => u.is_default_for_group && u.unit_group === "4") as UnitData).id;

        return result
    }
}