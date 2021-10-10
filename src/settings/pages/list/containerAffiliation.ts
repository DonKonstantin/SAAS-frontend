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

export class TransportContainerAffiliationConfiguration implements ListPageConfiguration<"transport_container_affiliation"> {
    filter: FilterFieldsConfiguration<"transport_container_affiliation"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_container_affiliation", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_container_affiliation" = "transport_container_affiliation";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_container_affiliation"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_container_affiliation", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 42;
                align: AlignRow = "center";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_container_affiliation", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_container_affiliation", "localized_names"> {
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
    schema: "transport_container_affiliation" = "transport_container_affiliation";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_CONTAINER_AFFILIATION";
    editPermission: string = "CHANGE_TRANSPORT_CONTAINER_AFFILIATION";
    title: string = "Управление принадлежностью контейнеров";
    header: string = "Управление принадлежностью контейнеров";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/container-affiliation/edit/${primaryKey}`, href: `/transport/container-affiliation/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}