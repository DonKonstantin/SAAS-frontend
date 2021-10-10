import {Schemas} from "../schema";
import {ListPageConfiguration} from "./system/list";
import {PermissionConfiguration} from "./list/permission";
import {RoleConfiguration} from "./list/role";
import {UserConfiguration} from "./list/user";
import {EditPageConfiguration} from "./system/edit";
import {PermissionEdit} from "./edit/permission";
import {RoleEdit} from "./edit/role";
import {UserEdit} from "./edit/user";
import {LanguageEdit} from "./edit/language";
import {LanguageConfiguration} from "./list/language";
import {CurrencyConfiguration} from "./list/currency";
import {CurrencyEdit} from "./edit/currency";
import {LocationsConfiguration} from "./list/locations";
import {LocationsEdit} from "./edit/locations";
import {TaxConfiguration} from "./list/tax";
import {TaxEdit} from "./edit/tax";
import {ContractorConfiguration} from "./list/contractor";
import {ContractorEdit} from "./edit/contractor";
import {TransportCargoTypeGroupConfiguration} from "./list/cargoTypeGroup";
import {TransportCargoTypeGroupEdit} from "./edit/cargoTypeGroup";
import {TransportCargoTypeConfiguration} from "./list/cargoType";
import {TransportCargoTypeEdit} from "./edit/cargoType";
import {TransportUnitGroupConfiguration} from "./list/unitGroup";
import {TransportUnitGroupEdit} from "./edit/unitGroup";
import {CarrierConfiguration} from "./list/carrier";
import {CarrierEdit} from "./edit/carrier";
import {TransportUnitConfiguration} from "./list/unit";
import {TransportUnitEdit} from "./edit/unit";
import {TransportAllowanceGroupConfiguration} from "./list/allowanceGroup";
import {TransportAllowanceGroupEdit} from "./edit/allowanceGroup";
import {TransportAllowanceEdit} from "./edit/allowance";
import {TransportAllowanceConfiguration} from "./list/allowance";
import {TransportContainerAffiliationConfiguration} from "./list/containerAffiliation";
import {TransportContainerAffiliationEdit} from "./edit/containerAffiliation";
import {TransportContainerTypesConfiguration} from "./list/containerType";
import {TransportContainerTypesEdit} from "./edit/containerTypes";
import {TransportContainersConfiguration} from "./list/containers";
import {TransportContainersEdit} from "./edit/containers";
import {TransportDeliveryModesEdit} from "./edit/deliveryModes";
import {TransportDeliveryModesConfiguration} from "./list/deliveryModes";
import {TransportDropOffConfiguration} from "./list/dropOff";
import {TransportDropOffEdit} from "./edit/dropOff";
import {TransportPickOnEdit} from "./edit/pickOn";
import {TransportPickOnConfiguration} from "./list/pickOn";
import {TransportLoadingConditionsConfiguration} from "./list/loadingCondition";
import {TransportLoadingConditionEdit} from "./edit/loadingCondition";
import {TransportUnloadingConditionEdit} from "./edit/unloadingCondition";
import {TransportUnloadingConditionsConfiguration} from "./list/unloadingCondition";
import {TransportTypeGroupEdit} from "./edit/transportTypes";
import {TransportTypeConfiguration} from "./list/transportType";
import {TransportShoulderTypeConfiguration} from "./list/shoulderType";
import {TransportShoulderTypeEdit} from "./edit/shoulderTypes";
import {TransportTerminalConfiguration} from "./list/terminal";
import {TransportTerminalEdit} from "./edit/terminal";
import {TransportTerminalOfferConfiguration} from "./list/terminalOffer";
import {TransportTerminalOfferEdit} from "./edit/terminalOffer";
import {TransportShoulderConfiguration} from "./list/shoulder";
import {TransportShoulderEdit} from "./edit/shoulder";
import {TransportShoulderOfferConfiguration} from "./list/shoulderOffer";
import {TransportShoulderOfferEdit} from "./edit/shoulderOffer";
import {TransportStartTransportingConditionsConfiguration} from "./list/startTransportingCondition";
import {TransportStopTransportingConditionsConfiguration} from "./list/stopTransportingCondition";
import {TransportStartTransportingConditionEdit} from "./edit/startTransportingCondition";
import {TransportStopTransportingConditionEdit} from "./edit/stopTransportingCondition";
import {TransportContainerRentEdit} from "./edit/containerRent";
import {TransportContainerRentConfiguration} from "./list/containerRent";
import {LocationImportTaskConfiguration} from "./list/locationImportTask";
import {ShoulderImportTaskConfiguration} from "./list/shoulderImportTask";
import {OrderConfiguration} from "./list/order";
import {PreOrderConfiguration} from "./list/preOrder";
import {TnvedCompanyCategoryConfiguration} from "./list/tnved_company_category";
import {TnvedCompanyCategoryEdit} from "./edit/tnved_company_category";
import {TnvedCompanyProductConfiguration} from "./list/tnved_company_product";
import {TnvedCompanyProductEdit} from "./edit/tnved_company_product";
import {TnvedCompanySpecificationConfiguration} from "./list/tnved_company_specification";
import {TnvedCodeConfiguration} from "./list/tnved_code";
import {TnvedCodeEdit} from "./edit/tnved_code";
import {TnvedProductImportTaskConfiguration} from "./list/tnvedProductImportTask";

// Параметры конфигурации листинга сущностей
export type ListSchemaConfiguration = {[P in keyof Schemas]?: ListPageConfiguration<P>}
export const listSchemaConfiguration: {(): ListSchemaConfiguration} = (): ListSchemaConfiguration => {
    return {
        permission: new PermissionConfiguration(),
        role: new RoleConfiguration(),
        user: new UserConfiguration(),
        language: new LanguageConfiguration(),
        currency: new CurrencyConfiguration(),
        locations: new LocationsConfiguration(),
        tax: new TaxConfiguration(),
        contractor: new ContractorConfiguration(),
        transport_cargo_type_group: new TransportCargoTypeGroupConfiguration(),
        transport_cargo_type: new TransportCargoTypeConfiguration(),
        transport_unit_group: new TransportUnitGroupConfiguration(),
        carrier: new CarrierConfiguration(),
        transport_unit: new TransportUnitConfiguration(),
        transport_allowance_group: new TransportAllowanceGroupConfiguration(),
        transport_allowance: new TransportAllowanceConfiguration(),
        transport_container_affiliation: new TransportContainerAffiliationConfiguration(),
        transport_container_type: new TransportContainerTypesConfiguration(),
        transport_container: new TransportContainersConfiguration(),
        transport_delivery_mod: new TransportDeliveryModesConfiguration(),
        transport_dropoff: new TransportDropOffConfiguration(),
        transport_pickon: new TransportPickOnConfiguration(),
        transport_container_rent: new TransportContainerRentConfiguration(),
        transport_loading_condition: new TransportLoadingConditionsConfiguration(),
        transport_unloading_condition: new TransportUnloadingConditionsConfiguration(),
        transport_type: new TransportTypeConfiguration(),
        transport_shoulder_type: new TransportShoulderTypeConfiguration(),
        transport_terminal: new TransportTerminalConfiguration(),
        transport_terminal_offer: new TransportTerminalOfferConfiguration(),
        transport_shoulder: new TransportShoulderConfiguration(),
        transport_shoulder_offer: new TransportShoulderOfferConfiguration(),
        transport_start_transporting_condition: new TransportStartTransportingConditionsConfiguration(),
        transport_stop_transporting_condition: new TransportStopTransportingConditionsConfiguration(),
        location_import_task: new LocationImportTaskConfiguration(),
        shoulder_import_task: new ShoulderImportTaskConfiguration(),
        order: new OrderConfiguration(),
        pre_order: new PreOrderConfiguration(),
        tnved_company_category: new TnvedCompanyCategoryConfiguration(),
        tnved_company_product: new TnvedCompanyProductConfiguration(),
        tnved_company_specification: new TnvedCompanySpecificationConfiguration(),
        tnved_code: new TnvedCodeConfiguration(),
        tnved_products_import_task: new TnvedProductImportTaskConfiguration(),
    }
};

// Параметры конфигурации страниц редактирования сущностей
export type EditSchemaConfiguration = {[P in keyof Schemas]?: EditPageConfiguration<P>}
export const editSchemaConfiguration: {(): EditSchemaConfiguration} = (): EditSchemaConfiguration => {
    return {
        permission: new PermissionEdit(),
        role: new RoleEdit(),
        user: new UserEdit(),
        language: new LanguageEdit(),
        currency: new CurrencyEdit(),
        locations: new LocationsEdit(),
        tax: new TaxEdit(),
        contractor: new ContractorEdit(),
        transport_cargo_type_group: new TransportCargoTypeGroupEdit(),
        transport_cargo_type: new TransportCargoTypeEdit(),
        transport_unit_group: new TransportUnitGroupEdit(),
        carrier: new CarrierEdit(),
        transport_unit: new TransportUnitEdit(),
        transport_allowance_group: new TransportAllowanceGroupEdit(),
        transport_allowance: new TransportAllowanceEdit(),
        transport_container_affiliation: new TransportContainerAffiliationEdit(),
        transport_container_type: new TransportContainerTypesEdit(),
        transport_container: new TransportContainersEdit(),
        transport_delivery_mod: new TransportDeliveryModesEdit(),
        transport_dropoff: new TransportDropOffEdit(),
        transport_pickon: new TransportPickOnEdit(),
        transport_container_rent: new TransportContainerRentEdit(),
        transport_loading_condition: new TransportLoadingConditionEdit(),
        transport_unloading_condition: new TransportUnloadingConditionEdit(),
        transport_type: new TransportTypeGroupEdit(),
        transport_shoulder_type: new TransportShoulderTypeEdit(),
        transport_terminal: new TransportTerminalEdit(),
        transport_terminal_offer: new TransportTerminalOfferEdit(),
        transport_shoulder: new TransportShoulderEdit(),
        transport_shoulder_offer: new TransportShoulderOfferEdit(),
        transport_start_transporting_condition: new TransportStartTransportingConditionEdit(),
        transport_stop_transporting_condition: new TransportStopTransportingConditionEdit(),
        tnved_company_category: new TnvedCompanyCategoryEdit(),
        tnved_company_product: new TnvedCompanyProductEdit(),
        tnved_code: new TnvedCodeEdit(),
    }
};