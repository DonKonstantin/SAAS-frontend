import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";
import {Padding} from "@material-ui/core/Table";

export class TransportContainerTypesConfiguration implements ListPageConfiguration<"transport_container_type"> {
    filter: FilterFieldsConfiguration<"transport_container_type"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_container_type", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_container_type" = "transport_container_type";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_container_type"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_container_type", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 42;
                padding: Padding = "none";
                align: AlignRow = "center";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_container_type", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_container_type", "localized_names"> {
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
        },
    };
    schema: "transport_container_type" = "transport_container_type";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_CONTAINER_TYPES";
    editPermission: string = "CHANGE_TRANSPORT_CONTAINER_TYPES";
    title: string = "Управление типами контейнеров";
    header: string = "Управление типами контейнеров";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/container-types/edit/${primaryKey}`, href: `/transport/container-types/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/container-types/add`};
}