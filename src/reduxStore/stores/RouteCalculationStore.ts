import {ContainersData} from "../../services/searchLoaders/containersLoader/ContainersLoaderQuery";
import {CurrencyData} from "../../services/searchLoaders/currencyLoader/CurrencyLoaderQuery";
import {StartTransportingCondition} from "../../services/searchLoaders/startTransportingConditionsLoader/StartTransportingConditionsQuery";
import {EndTransportingCondition} from "../../services/searchLoaders/endTransportingConditionsLoader/EndTransportingConditionsQuery";
import {ContractorData} from "../../services/searchLoaders/contractorLoader/ContractorLoaderQuery";
import {CarrierData} from "../../services/searchLoaders/carriersLoader/CarrierLoaderQuery";
import {ShoulderTypesData} from "../../services/searchLoaders/shouldeTypesLoader/ShoulderTypesLoaderQuery";
import {AllowanceData} from "../../services/searchLoaders/allowanceLoader/AllowanceLoaderQuery";
import {UnitData} from "../../services/searchLoaders/unitLoader/UnitLoaderQuery";
import {UnitGroupData} from "../../services/searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {LocationOrTerminalValue} from "../../custom/hoc/LocationTerminalSearch/LocationTerminalSearch";

// Параметры, заданные через виджет подбора маршрутов контейнерной перевозки
export interface ContainerRouteCalculationParameters {
    startLocation: LocationOrTerminalValue | undefined
    endLocation: LocationOrTerminalValue | undefined
    containerId: string
    containerQuantity: number
    eachContainerWeight: number
    date: Date
    startTransportingCondition: string
    endTransportingCondition: string
    isNeedContainerRent: boolean
    isDangerousCargo: boolean
    isArchiveCalculation: boolean
    targetCurrencyId: string
    isNeedLogs: boolean
    isNeedPrekeridge: boolean
}

// Базовые параметры сборных грузов
export interface CustomCargoBaseParameters {
    quantity: number
    length: number
    width: number
    height: number
    weight: number
}

// Параметры паллет сборного груза
export interface CustomCargoPalletParameters {
    type: string
    quantity: number
    normativeHeightOfStacking: number
    weight: number
}

// Параметры сборного груза для расчета по объему
export interface CustomCargoVolumeParameters {
    volume: number
    weight: number
}

// Параметры, заданные через виджет подбора маршрутов сборных грузов
export interface CustomCargoRouteCalculationParameters {
    startLocation: LocationOrTerminalValue | undefined
    endLocation: LocationOrTerminalValue | undefined
    parametersType: "base" | "pallet" | "volume"
    baseParameters: CustomCargoBaseParameters
    palletParameters: CustomCargoPalletParameters
    volumeParameters: CustomCargoVolumeParameters
    startTransportingCondition: string
    endTransportingCondition: string
    date: Date
    isNeedContainerRent: boolean
    isDangerousCargo: boolean
    isArchiveCalculation: boolean
    targetCurrencyId: string
    isNeedLogs: boolean
    isNeedPrekeridge: boolean
}

// Загруженные данные для виджета
export interface RouteWidgetParameters {
    containers: ContainersData[]
    currencies: CurrencyData[]
    startTransportingConditions: StartTransportingCondition[]
    endTransportingConditions: EndTransportingCondition[]
    contractors: ContractorData[]
    carriers: CarrierData[]
    shoulderTypes: ShoulderTypesData[]
    allowancesData: AllowanceData[]
    units: UnitData[]
    unitGroups: UnitGroupData[]
}

// Хранилище данных виджета подбора маршрутов
export interface RouteCalculationStore {
    ContainerParameters: ContainerRouteCalculationParameters
    CustomCargoParameters: CustomCargoRouteCalculationParameters
    BaseData: RouteWidgetParameters | undefined
    IsLoading: boolean
    LastCalculationRequestTime: number
}

// Акции, связанные с хранилищем данных виджета подбора маршрутов
export interface RouteCalculationStoreActionTypes {
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_LOCATION: LocationOrTerminalValue | undefined
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_LOCATION: LocationOrTerminalValue | undefined
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_ID: string
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_CONTAINER_QUANTITY: number
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_EACH_CONTAINER_WEIGHT: number
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PARAMETERS_TYPE: "base" | "pallet" | "volume"
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_BASE_PARAMETERS: CustomCargoBaseParameters
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_PALLET_PARAMETERS: CustomCargoPalletParameters
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_VOLUME_PARAMETERS: CustomCargoVolumeParameters
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_START_TRANSPORTING_CONDITION: string
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_END_TRANSPORTING_CONDITION: string
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_CONTAINER_RENT: boolean
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_DATE: Date
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_DANGEROUS_CARGO: boolean
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_ARCHIVE_CALCULATION: boolean
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_TARGET_CURRENCY_ID: string
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_LOGS: boolean
    ROUTE_CALCULATION_STORE_WIDGET_PARAMETERS_CHANGE_IS_NEED_PREKERIDGE: boolean
    ROUTE_CALCULATION_LOAD_BASE_DATA: null
    ROUTE_CALCULATION_STORE_WIDGET_BASE_DATA: RouteWidgetParameters
    ROUTE_CALCULATION_CHANGE_LOADING_STATE: boolean
}