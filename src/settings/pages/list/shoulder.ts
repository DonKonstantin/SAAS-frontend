import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
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
import ListPageShoulderOffersListActions from "../../../custom/containers/ListPageShoulderOffersListActions";
import {ListPageShoulderOffersListComponent} from "../../../custom/containers/ListPageShoulderOffersListComponent";

export class TransportShoulderConfiguration implements ListPageConfiguration<"transport_shoulder"> {
    filter: FilterFieldsConfiguration<"transport_shoulder"> = {
        shoulder_type: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "shoulder_type", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"transport_shoulder_type"> = {
                schema: "transport_shoulder_type",
                visibleFields: ["default_name"]
            };
            field: "shoulder_type" = "shoulder_type";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Тип";
        },
        from_location_ids: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "from_location_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"locations"> = {
                schema: "locations",
                visibleFields: ["default_name"]
            };
            field: "from_location_ids" = "from_location_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Откуда";
        },
        from_terminal_ids: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "from_terminal_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"transport_terminal"> = {
                schema: "transport_terminal",
                visibleFields: ["default_name"]
            };
            field: "from_terminal_ids" = "from_terminal_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Откуда (терм)";
        },
        to_location_ids: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "to_location_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"locations"> = {
                schema: "locations",
                visibleFields: ["default_name"]
            };
            field: "to_location_ids" = "to_location_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Куда";
        },
        to_terminal_ids: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "to_terminal_ids", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"transport_terminal"> = {
                schema: "transport_terminal",
                visibleFields: ["default_name"]
            };
            field: "to_terminal_ids" = "to_terminal_ids";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Куда (терм)";
        },
        contractor_id: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "contractor_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"contractor"> = {
                schema: "contractor",
                visibleFields: ["default_name"]
            };
            field: "contractor_id" = "contractor_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Подрядчик";
        },
        carrier_id: new class implements RelationFilterFieldConfiguration<"transport_shoulder", "carrier_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"carrier"> = {
                schema: "carrier",
                visibleFields: ["default_name"]
            };
            field: "carrier_id" = "carrier_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "transport_shoulder" = "transport_shoulder";
            title: string = "Перевозчик";
        },
    };
    listFields: ListFieldsConfiguration<"transport_shoulder"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_shoulder", "id"> {
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
            shoulder_type: new class implements ListFieldConfiguration<"transport_shoulder", "shoulder_type"> {
                field: "shoulder_type" = "shoulder_type";
                title: string = "Тип";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 70;
                padding: Padding = "none";
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"transport_shoulder_type">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/shoulder-types/edit/${id}`, href: `/transport/shoulder-types/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_LEG_TYPES"
                    ),
                    type: "Relation"
                }
            },
            from_location_ids: new class implements ListFieldConfiguration<"transport_shoulder", "from_location_ids"> {
                field: "from_location_ids" = "from_location_ids";
                title: string = "Откуда";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 140;
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
            from_terminal_ids: new class implements ListFieldConfiguration<"transport_shoulder", "from_terminal_ids"> {
                field: "from_terminal_ids" = "from_terminal_ids";
                title: string = "Откуда (терм)";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 140;
                padding: Padding = "none";
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"transport_terminal">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/transport/terminal/edit/${id}`, href: `/transport/terminal/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_TERMINALS"
                    ),
                    type: "MultipleRelation"
                }
            },
            to_location_ids: new class implements ListFieldConfiguration<"transport_shoulder", "to_location_ids"> {
                field: "to_location_ids" = "to_location_ids";
                title: string = "Куда";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 140;
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
            to_terminal_ids: new class implements ListFieldConfiguration<"transport_shoulder", "to_terminal_ids"> {
                field: "to_terminal_ids" = "to_terminal_ids";
                title: string = "Куда (терм)";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 140;
                padding: Padding = "none";
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"transport_terminal">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/transport/terminal/edit/${id}`, href: `/transport/terminal/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_TERMINALS"
                    ),
                    type: "MultipleRelation"
                }
            },
            contractor_id: new class implements ListFieldConfiguration<"transport_shoulder", "contractor_id"> {
                field: "contractor_id" = "contractor_id";
                title: string = "Подрядчик";
                isEnabled: boolean = true;
                align: AlignRow = "right";
                padding: Padding = "none";
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
            carrier_id: new class implements ListFieldConfiguration<"transport_shoulder", "carrier_id"> {
                field: "carrier_id" = "carrier_id";
                title: string = "Перевозчик";
                isEnabled: boolean = true;
                align: AlignRow = "right";
                padding: Padding = "none";
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
        },
        actions: ListPageShoulderOffersListActions,
        ...ListPageShoulderOffersListComponent({
            addPageUrlGenerator: shoulderId => ({
                href: `/transport/shoulder/[shoulderId]/offer/add`,
                as: `/transport/shoulder/${shoulderId}/offer/add`,
            }),
            editPageUrlGenerator: (primaryKey, shoulderId) => ({
                href: `/transport/shoulder/[shoulderId]/offer/edit/[entityId]`,
                as: `/transport/shoulder/${shoulderId}/offer/edit/${primaryKey}`,
            })
        }),
    };
    schema: "transport_shoulder" = "transport_shoulder";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_SHOULDERS";
    editPermission: string = "CHANGE_TRANSPORT_SHOULDERS";
    title: string = "Плечи";
    header: string = "Плечи";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/shoulder/edit/${primaryKey}`, href: `/transport/shoulder/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/shoulder/add`};
}