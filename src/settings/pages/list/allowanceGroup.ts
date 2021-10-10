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

export class TransportAllowanceGroupConfiguration implements ListPageConfiguration<"transport_allowance_group"> {
    filter: FilterFieldsConfiguration<"transport_allowance_group"> = {
        code: new class implements BaseFilterFieldConfiguration<"transport_allowance_group", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "transport_allowance_group" = "transport_allowance_group";
            title: string = "Символьный код";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"transport_allowance_group", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_allowance_group" = "transport_allowance_group";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_allowance_group"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_allowance_group", "id"> {
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
            code: new class implements ListFieldConfiguration<"transport_allowance_group", "code"> {
                field: "code" = "code";
                title: string = "Символьный код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_allowance_group", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_allowance_group", "localized_names"> {
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
    schema: "transport_allowance_group" = "transport_allowance_group";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_ALLOWANCE_GROUPS";
    editPermission: string = "CHANGE_TRANSPORT_ALLOWANCE_GROUPS";
    title: string = "Управление группами надбавок";
    header: string = "Управление группами надбавок";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/allowance-group/edit/${primaryKey}`, href: `/transport/allowance-group/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}