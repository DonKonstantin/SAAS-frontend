import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ContainerRouteCalculationParameters} from "../../../reduxStore/stores/RouteCalculationStore";
import {ComputeLogMessage, ContainerParameters, ContainerRoute} from "./types";
import {loggerFactory} from "../../logger";

/**
 * Результат выполнения запроса
 */
export interface ContainerRoutesCalculationQueryResponse {
    calculateContainerRoutes: {
        cargoParameters: ContainerParameters | null
        computeLog: ComputeLogMessage[] | null
        routes: ContainerRoute[] | null
    }
}

/**
 * Запрос расчета списка маршрутов
 */
export class ContainerRoutesCalculationQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(parameters: ContainerRouteCalculationParameters) {
        this.variables = null;
        if (!parameters.startLocation || !parameters.endLocation) {
            return
        }

        const query = `
            query _CONTAINER_ROUTES_ {
              calculateContainerRoutes(
                routePoints: {
                   from: {${parameters.startLocation.type}: ${parameters.startLocation.id}},
                   to: {${parameters.endLocation.type}: ${parameters.endLocation.id}}
                }
                containerId: ${parameters.containerId}
                containerQuantity: ${parameters.containerQuantity}
                eachContainerWeight: ${parameters.eachContainerWeight}
                date: "${parameters.date}"
                startTransportingConditionId: ${parameters.startTransportingCondition}
                endTransportingConditionId: ${parameters.endTransportingCondition}
                isNeedContainerRent: ${parameters.isNeedContainerRent ? "true" : "false"}
                isDangerousCargo: ${parameters.isDangerousCargo ? "true" : "false"}
                isArchiveCalculation: ${parameters.isArchiveCalculation ? "true" : "false"}
                targetCurrencyId: ${parameters.targetCurrencyId}
                isNeedLogs: ${parameters.isNeedLogs ? "true" : "false"}
                isNeedPrekeridge: ${parameters.isNeedPrekeridge ? "true" : "false"}
              ) {
                routes {
                  steps {
                    endTerminal {
                      default_abbreviation
                      default_name
                      id
                      localized_abbreviations
                      localized_names
                      location_id
                    }
                    endTerminalAllowances {
                      allowanceOffer {
                        allowance_id
                        id
                        offer_conditions
                      }
                      allowanceOfferCondition {
                        currency_id
                        group_num
                        id
                        information_price
                        is_fixed_price
                        is_max_value_not_limited
                        is_min_value_not_limited
                        is_tax_included_in_price
                        max_value
                        min_value
                        minimal_payment_price
                        price
                        tax_id
                        unit_id
                      }
                      calculatedPrice {
                        basePrice
                        computedAmount
                        conversionFee
                        fullPriceInTargetCurrency
                        priceInTargetCurrency
                        taxInTargetCurrency
                      }
                    }
                    endTerminalCalculatedPrice {
                      basePrice
                      computedAmount
                      conversionFee
                      fullPriceInTargetCurrency
                      priceInTargetCurrency
                      taxInTargetCurrency
                    }
                    endTerminalLoadingUnloadingOffer {
                      allowance_offers
                      id
                      is_loading_to_unknown_transport
                      is_unloading_from_unknown_transport
                      loading_shoulder_types
                      offer_conditions
                      service_type
                      unloading_shoulder_types
                    }
                    endTerminalOffer {
                      cargo_type_group
                      containers
                      delivery_modes
                      id
                      loading_offers
                      terminal_id
                    }
                    endTerminalPrice {
                      currency_id
                      group_num
                      id
                      information_price
                      is_fixed_price
                      is_max_value_not_limited
                      is_min_value_not_limited
                      is_tax_included_in_price
                      max_value
                      min_value
                      minimal_payment_price
                      price
                      tax_id
                      unit_id
                    }
                    startTerminal {
                      default_abbreviation
                      default_name
                      id
                      localized_abbreviations
                      localized_names
                      location_id
                    }
                    startTerminalAllowances {
                      allowanceOffer {
                        allowance_id
                        id
                        offer_conditions
                      }
                      allowanceOfferCondition {
                        currency_id
                        group_num
                        id
                        information_price
                        is_fixed_price
                        is_max_value_not_limited
                        is_min_value_not_limited
                        is_tax_included_in_price
                        max_value
                        min_value
                        minimal_payment_price
                        price
                        tax_id
                        unit_id
                      }
                      calculatedPrice {
                        basePrice
                        computedAmount
                        conversionFee
                        fullPriceInTargetCurrency
                        priceInTargetCurrency
                        taxInTargetCurrency
                      }
                    }
                    startTerminalCalculatedPrice {
                      basePrice
                      computedAmount
                      conversionFee
                      fullPriceInTargetCurrency
                      priceInTargetCurrency
                      taxInTargetCurrency
                    }
                    startTerminalLoadingUnloadingOffer {
                      allowance_offers
                      id
                      is_loading_to_unknown_transport
                      is_unloading_from_unknown_transport
                      loading_shoulder_types
                      offer_conditions
                      service_type
                      unloading_shoulder_types
                    }
                    startTerminalOffer {
                      cargo_type_group
                      containers
                      delivery_modes
                      id
                      loading_offers
                      terminal_id
                    }
                    startTerminalPrice {
                      currency_id
                      group_num
                      id
                      information_price
                      is_fixed_price
                      is_max_value_not_limited
                      is_min_value_not_limited
                      is_tax_included_in_price
                      max_value
                      min_value
                      minimal_payment_price
                      price
                      tax_id
                      unit_id
                    }
                    shoulder {
                      carrier_id
                      contractor_id
                      distance
                      distance_unit
                      from_location_ids
                      from_terminal_ids
                      id
                      shoulder_type
                      to_location_ids
                      to_terminal_ids
                    }
                    shoulderAllowances {
                      allowanceOffer {
                        allowance_id
                        id
                        offer_conditions
                      }
                      allowanceOfferCondition {
                        currency_id
                        group_num
                        id
                        information_price
                        is_fixed_price
                        is_max_value_not_limited
                        is_min_value_not_limited
                        is_tax_included_in_price
                        max_value
                        min_value
                        minimal_payment_price
                        price
                        tax_id
                        unit_id
                      }
                      calculatedPrice {
                        basePrice
                        computedAmount
                        conversionFee
                        fullPriceInTargetCurrency
                        priceInTargetCurrency
                        taxInTargetCurrency
                      }
                    }
                    shoulderOffer {
                      active_from
                      active_to
                      allowance_offers
                      cargo_type_group
                      container_affiliation_id
                      container_nominal_weight
                      containers
                      delivery_modes
                      delivery_time
                      free_time_for_container_usage_on_start_terminal
                      free_time_for_container_usage_on_end_terminal
                      id
                      is_danger_cargo_allowed
                      is_empty_container_collecting_included
                      is_empty_container_returning_included
                      loading_condition_id
                      offer_conditions
                      shoulder_id
                      unloading_condition_id
                    }
                    shoulderOfferCalculatedPrice {
                      basePrice
                      computedAmount
                      conversionFee
                      fullPriceInTargetCurrency
                      priceInTargetCurrency
                      taxInTargetCurrency
                    }
                    shoulderOfferPriceCondition {
                      currency_id
                      group_num
                      id
                      information_price
                      is_fixed_price
                      is_max_value_not_limited
                      is_min_value_not_limited
                      is_tax_included_in_price
                      max_value
                      min_value
                      minimal_payment_price
                      price
                      tax_id
                      unit_id
                    }
                    stepNumber
                  }
                  routeId
                  fullPrice
                  dropOff {
                    carrier_id
                    container_ids
                    contractor_id
                    currency_id
                    from_location_ids
                    id
                    is_container_usage_in_another_contractor_service_allowed
                    is_tax_included
                    price
                    tax_id
                    to_location_ids
                  }
                  dropOffCalculatedPrice {
                    basePrice
                    computedAmount
                    conversionFee
                    fullPriceInTargetCurrency
                    priceInTargetCurrency
                    taxInTargetCurrency
                  }
                  pickOn {
                    carrier_id
                    container_ids
                    contractor_id
                    currency_id
                    from_location_ids
                    id
                    is_container_usage_in_another_contractor_service_allowed
                    is_tax_included
                    price
                    tax_id
                    to_location_ids
                  }
                  pickOnCalculatedPrice {
                    basePrice
                    computedAmount
                    conversionFee
                    fullPriceInTargetCurrency
                    priceInTargetCurrency
                    taxInTargetCurrency
                  }
                  containerRent {
                    carrier_id
                    container_ids
                    contractor_id
                    currency_id
                    from_location_ids
                    id
                    is_container_usage_in_another_contractor_service_allowed
                    is_tax_included
                    price
                    tax_id
                    to_location_ids
                  }
                  containerRentCalculatedPrice {
                    basePrice
                    computedAmount
                    conversionFee
                    fullPriceInTargetCurrency
                    priceInTargetCurrency
                    taxInTargetCurrency
                  }
                }
                cargoParameters {
                  routePoints {
                    from {
                      location
                      terminal
                    }
                    to {
                      location
                      terminal
                    }
                  }
                  containerId
                  containerQuantity
                  eachContainerWeight
                  startTransportingConditionId
                  endTransportingConditionId
                  isNeedContainerRent
                  isArchiveCalculation
                  isDangerousCargo
                  targetCurrencyId
                }
                computeLog {
                  message
                  type
                  routeId {
                    containerRent
                    dropOff
                    pickOn
                    steps {
                      stepNumber
                      shoulder
                      shoulderOffer
                      shoulderOfferPriceCondition
                      shoulderAllowances {
                        allowanceOffer
                        allowanceOfferCondition
                      }
                      startTerminal
                      startTerminalOffer
                      startTerminalLoadingUnloadingOffer
                      startTerminalPrice
                      startTerminalAllowances {
                        allowanceOffer
                        allowanceOfferCondition
                      }
                      endTerminal
                      endTerminalOffer
                      endTerminalLoadingUnloadingOffer
                      endTerminalPrice
                      endTerminalAllowances {
                        allowanceOffer
                        allowanceOfferCondition
                      }
                    }
                  }
                }
              }
            }
        `;

        loggerFactory().make(`query`).Debug(query);
        this.query = gql`${query}`
    }
}