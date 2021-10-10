/**
 * Сущность точки отправления/назначения маршрута.
 */
import {
    CustomCargoBaseParameters,
    CustomCargoPalletParameters,
    CustomCargoVolumeParameters
} from "../../../reduxStore/stores/RouteCalculationStore";

export interface RoutePoint {
    location: number
    terminal: number
}

/**
 * Сущность точек отправления и назначения маршрута.
 */
export interface RoutePoints {
    from: RoutePoint
    to: RoutePoint
}

/**
 * Сущность параметров груза, по которым произведен расчет списка маршрутов.
 */
export interface CustomCargoParameters {
    routePoints: RoutePoints
    parametersType: "base" | "pallet" | "volume"
    baseParameters: CustomCargoBaseParameters
    palletParameters: CustomCargoPalletParameters
    volumeParameters: CustomCargoVolumeParameters
    startTransportingCondition: string
    endTransportingCondition: string
    isNeedContainerRent: boolean
    isDangerousCargo: boolean
    isArchiveCalculation: boolean
    targetCurrencyId: string
    isNeedLogs: boolean
    isNeedPrekeridge: boolean
}

/**
 * Сущность идентификатора надбавки.
 */
export interface AllowanceOfferIdentifier {
    allowanceOffer: string
    allowanceOfferCondition: string
}

/**
 * Сущность идентификатора шага маршрута.
 */
export interface RouteStepIdentifier {
    endTerminal: string
    endTerminalAllowances: AllowanceOfferIdentifier[]
    endTerminalLoadingUnloadingOffer: string
    endTerminalOffer: string
    endTerminalPrice: string
    shoulder: string
    shoulderAllowances: AllowanceOfferIdentifier[]
    shoulderOffer: string
    shoulderOfferPriceCondition: string
    startTerminal: string
    startTerminalAllowances: AllowanceOfferIdentifier[]
    startTerminalLoadingUnloadingOffer: string
    startTerminalOffer: string
    startTerminalPrice: string
    stepNumber: number
}

/**
 * Сущность идентификатора маршрута.
 */
export interface CustomCargoRouteIdentifier {
    steps: RouteStepIdentifier[]
}

/**
 * Сущность лога генерации маршрута.
 */
export interface ComputeLogMessage {
    message: string
    routeId: CustomCargoRouteIdentifier
    type: "Info" | "Success" | "Warning" | "Error"
}

/**
 * Результат расчетов стоимости перевозки/услуги
 */
export interface CalculatedPrice {
    basePrice: number
    computedAmount: number
    conversionFee: number
    fullPriceInTargetCurrency: number
    priceInTargetCurrency: number
    taxInTargetCurrency: number
}

/**
 * Сущность ценового предложения для надбавки.
 */
export interface AllowanceOffer {
    allowance_id: string
    id: string
    offer_conditions: string[]
}

/**
 * Сущность условия ценового предложения.
 */
export interface TransportOfferCondition {
    currency_id: string
    group_num: number
    id: string
    information_price: number
    is_fixed_price: boolean
    is_max_value_not_limited: boolean
    is_min_value_not_limited: boolean
    is_tax_included_in_price: boolean
    max_value: number
    min_value: number
    minimal_payment_price: number
    price: number
    tax_id: number | null
    unit_id: string
}

/**
 * Данные для предложения надбавки
 */
export interface CalculatedAllowanceOffer {
    allowanceOffer: AllowanceOffer
    allowanceOfferCondition: TransportOfferCondition
    calculatedPrice: CalculatedPrice
}

/**
 * Сущность терминала.
 */
export interface TransportTerminal {
    default_abbreviation: string
    default_name: string
    id: string
    localized_abbreviations: string[]
    localized_names: string[]
    location_id: string
}

/**
 * Сущность условия ПРР для ценового предложения терминала.
 */
export interface TransportTerminalLoadingUnloadingOffer {
    allowance_offers: string[]
    id: string
    is_loading_to_unknown_transport: boolean
    is_unloading_from_unknown_transport: boolean
    loading_shoulder_types: string[]
    offer_conditions: string[]
    service_type: "loading_and_unloading" | "loading" | "unloading"
    unloading_shoulder_types: string[]
}

/**
 * Сущность ценового предложения для терминала.
 */
export interface TransportTerminalOffer {
    cargo_type_group: string
    containers: string[]
    delivery_modes: string[]
    id: string
    loading_offers: string[]
    terminal_id: string
}

/**
 * Сущность условия ценового предложения.
 */
export interface TransportOfferCondition {
    currency_id: string
    group_num: number
    id: string
    information_price: number
    is_fixed_price: boolean
    is_max_value_not_limited: boolean
    is_min_value_not_limited: boolean
    is_tax_included_in_price: boolean
    max_value: number
    min_value: number
    minimal_payment_price: number
    price: number
    tax_id: number | null
    unit_id: string
}

/**
 * Варианты выбора единицы измерения расстояния перевозки
 */
export interface TransportShoulder {
    carrier_id: string
    contractor_id: string
    distance: number
    distance_unit: "km" | "nm"
    from_location_ids: string[]
    from_terminal_ids: string[]
    id: string
    shoulder_type: string
    to_location_ids: string[]
    to_terminal_ids: string[]
}

/**
 * Сущность ценового предложения для плеча.
 */
export interface TransportShoulderOffer {
    active_from: string
    active_to: string
    allowance_offers: string[]
    cargo_type_group: string
    container_affiliation_id: number | null
    container_nominal_weight: number
    containers: string[]
    delivery_modes: string[]
    delivery_time: number
    free_time_storage_at_terminal: number
    id: string
    is_danger_cargo_allowed: boolean
    is_empty_container_collecting_included: boolean
    is_empty_container_returning_included: boolean
    loading_condition_id: string
    offer_conditions: string[]
    shoulder_id: string
    start_transporting_conditions: string[]
    stop_transporting_conditions: string[]
    unloading_condition_id: string
}

/**
 * Сущность шага маршрута
 */
export interface RouteStep {
    endTerminal: TransportTerminal
    endTerminalAllowances: CalculatedAllowanceOffer[]
    endTerminalCalculatedPrice: CalculatedPrice
    endTerminalLoadingUnloadingOffer: TransportTerminalLoadingUnloadingOffer | null
    endTerminalOffer: TransportTerminalOffer
    endTerminalPrice: TransportOfferCondition | null
    shoulder: TransportShoulder
    shoulderAllowances: CalculatedAllowanceOffer[]
    shoulderOffer: TransportShoulderOffer
    shoulderOfferCalculatedPrice: CalculatedPrice
    shoulderOfferPriceCondition: TransportOfferCondition
    startTerminal: TransportTerminal
    startTerminalAllowances: CalculatedAllowanceOffer[]
    startTerminalCalculatedPrice: CalculatedPrice
    startTerminalLoadingUnloadingOffer: TransportTerminalLoadingUnloadingOffer | null
    startTerminalOffer: TransportTerminalOffer
    startTerminalPrice: TransportOfferCondition | null
    stepNumber: number
}

/**
 * Сущность маршрута перевозки сборного груза
 */
export interface CustomCargoRoute {
    fullPrice: number
    routeId: string
    steps: RouteStep[]
}

/**
 * Результат выполнения расчета списка маршрутов по переданным параметрам.
 */
export interface CustomCargoRouteResult {
    cargoParameters: CustomCargoParameters | null
    computeLog: ComputeLogMessage[] | null
    routes: CustomCargoRoute[] | null
}
