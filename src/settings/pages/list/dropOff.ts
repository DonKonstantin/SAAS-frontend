import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration, RelationConfiguration, RelationFilterFieldConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";
import {Padding} from "@material-ui/core/Table";
import {MultipleRelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/MultipleRelationWithLink";

export class TransportDropOffConfiguration implements ListPageConfiguration<"transport_dropoff"> {
    filter: FilterFieldsConfiguration<"transport_dropoff"> = {
        contractor_id: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "contractor_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"contractor"> = {
                schema: "contractor",
                visibleFields: ["default_name"]
            };
            field: "contractor_id" = "contractor_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Подрядчик";
        },
        carrier_id: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "carrier_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"carrier"> = {
                schema: "carrier",
                visibleFields: ["default_name"]
            };
            field: "carrier_id" = "carrier_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Переводчик";
        },
        from_location_ids: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "from_location_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"locations"> = {
                schema: "locations",
                visibleFields: ["default_name"]
            };
            field: "from_location_ids" = "from_location_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Места получения";
        },
        to_location_ids: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "to_location_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"locations"> = {
                schema: "locations",
                visibleFields: ["default_name"]
            };
            field: "to_location_ids" = "to_location_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Места сдачи";
        },
        price: new class implements BaseFilterFieldConfiguration<"transport_dropoff", "price", "FloatSlider"> {
            field: "price" = "price";
            filterType: "FloatSlider" = "FloatSlider";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Стоимость";
        },
        currency_id: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "currency_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"currency"> = {
                schema: "currency",
                visibleFields: ["default_name"]
            };
            field: "currency_id" = "currency_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Валюта";
        },
        container_ids: new class implements RelationFilterFieldConfiguration<"transport_dropoff", "container_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"transport_container"> = {
                schema: "transport_container",
                visibleFields: ["default_name"]
            };
            field: "container_ids" = "container_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_dropoff" = "transport_dropoff";
            title: string = "Контейнеры";
        },
    };
    listFields: ListFieldsConfiguration<"transport_dropoff"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_dropoff", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 42;
                align: AlignRow = "center";
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            contractor_id: new class implements ListFieldConfiguration<"transport_dropoff", "contractor_id"> {
                field: "contractor_id" = "contractor_id";
                title: string = "Подрядчик";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"contractor">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/contractor/edit/${id}`, href: `/contractor/edit/[entityId]`}),
                        "CHANGE_CONTRACTORS"
                    ),
                    type: "Relation"
                }
            },
            carrier_id: new class implements ListFieldConfiguration<"transport_dropoff", "carrier_id"> {
                field: "carrier_id" = "carrier_id";
                title: string = "Перевозчик";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"carrier">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/carrier/edit/${id}`, href: `/transport/carrier/edit/[entityId]`}),
                        "CHANGE_CARRIERS"
                    ),
                    type: "Relation"
                }
            },
            from_location_ids: new class implements ListFieldConfiguration<"transport_dropoff", "from_location_ids"> {
                field: "from_location_ids" = "from_location_ids";
                title: string = "Места получения";
                isEnabled: boolean = true;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"locations">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/locations/edit/${id}`, href: `/locations/edit/[entityId]`}),
                        "CHANGE_LOCATIONS"
                    ),
                    type: "MultipleRelation"
                }
            },
            to_location_ids: new class implements ListFieldConfiguration<"transport_dropoff", "to_location_ids"> {
                field: "to_location_ids" = "to_location_ids";
                title: string = "Места сдачи";
                isEnabled: boolean = true;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"locations">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/locations/edit/${id}`, href: `/locations/edit/[entityId]`}),
                        "CHANGE_LOCATIONS"
                    ),
                    type: "MultipleRelation"
                }
            },
            price: new class implements ListFieldConfiguration<"transport_dropoff", "price"> {
                field: "price" = "price";
                title: string = "Стоимость";
                width: number = 132;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            currency_id: new class implements ListFieldConfiguration<"transport_dropoff", "currency_id"> {
                field: "currency_id" = "currency_id";
                title: string = "Валюта";
                isEnabled: boolean = true;
                width: number = 85;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"currency">>{
                        relatedFields: ["code"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/currency/edit/${id}`, href: `/currency/edit/[entityId]`}),
                        "CHANGE_CURRENCIES"
                    ),
                    type: "Relation"
                }
            },
            container_ids: new class implements ListFieldConfiguration<"transport_dropoff", "container_ids"> {
                field: "container_ids" = "container_ids";
                title: string = "Контейнеры";
                isEnabled: boolean = true;
                width: number = 116;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"transport_container">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/transport/containers/edit/${id}`, href: `/transport/containers/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_CONTAINERS"
                    ),
                    type: "MultipleRelation"
                }
            },
        },
    };
    schema: "transport_dropoff" = "transport_dropoff";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_DROPOFF";
    editPermission: string = "CHANGE_TRANSPORT_DROPOFF";
    title: string = "DropOff";
    header: string = "DropOff";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/dropoff/edit/${primaryKey}`, href: `/transport/dropoff/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/dropoff/add`};
}