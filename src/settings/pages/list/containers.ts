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
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";
import {Padding} from "@material-ui/core/Table";

export class TransportContainersConfiguration implements ListPageConfiguration<"transport_container"> {
    filter: FilterFieldsConfiguration<"transport_container"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_container", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_container" = "transport_container";
            title: string = "Название (умол.)";
        },
        container_type: new class implements RelationFilterFieldConfiguration<"transport_container", "container_type", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"transport_container_type"> = {
                schema: "transport_container_type",
                visibleFields: ["default_name"]
            };
            field: "container_type" = "container_type";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "transport_container" = "transport_container";
            title: string = "Тип контейнера";
        },
    };
    listFields: ListFieldsConfiguration<"transport_container"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_container", "id"> {
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
            container_type: new class implements ListFieldConfiguration<"transport_container", "container_type"> {
                field: "container_type" = "container_type";
                title: string = "Тип";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"transport_container_type">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/allowance-types/edit/${id}`, href: `/transport/allowance-types/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_CONTAINER_TYPES"
                    ),
                    type: "Relation"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_container", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_container", "localized_names"> {
                field: "localized_names" = "localized_names";
                title: string = "Название";
                isEnabled: boolean = true;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"localized_message">>{
                        relatedFields: ["message", "lang_id"]
                    },
                    type: "MultipleRelation",
                    customComponent: LocalizedFieldCell
                }
            },
            is_default_for_container_type: new class implements ListFieldConfiguration<"transport_container", "is_default_for_container_type"> {
                field: "is_default_for_container_type" = "is_default_for_container_type";
                title: string = "По умолчанию";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "transport_container" = "transport_container";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_CONTAINERS";
    editPermission: string = "CHANGE_TRANSPORT_CONTAINERS";
    title: string = "Управление контейнерами";
    header: string = "Управление контейнерами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/containers/edit/${primaryKey}`, href: `/transport/containers/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/containers/add`};
}