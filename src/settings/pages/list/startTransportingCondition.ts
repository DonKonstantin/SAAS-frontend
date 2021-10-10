import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {Padding} from "@material-ui/core/Table";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";

export class TransportStartTransportingConditionsConfiguration implements ListPageConfiguration<"transport_start_transporting_condition"> {
    filter: FilterFieldsConfiguration<"transport_start_transporting_condition"> = {
        code: new class implements BaseFilterFieldConfiguration<"transport_start_transporting_condition", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "transport_start_transporting_condition" = "transport_start_transporting_condition";
            title: string = "Символьный код";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"transport_start_transporting_condition", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_start_transporting_condition" = "transport_start_transporting_condition";
            title: string = "Название (умол.)";
        },
        is_terminal_required: new class implements BaseFilterFieldConfiguration<"transport_start_transporting_condition", "is_terminal_required", "Checkbox"> {
            field: "is_terminal_required" = "is_terminal_required";
            filterType: "Checkbox" = "Checkbox";
            schema: "transport_start_transporting_condition" = "transport_start_transporting_condition";
            title: string = "Терминал обязателен?";
        },
    };
    listFields: ListFieldsConfiguration<"transport_start_transporting_condition"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_start_transporting_condition", "id"> {
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
            code: new class implements ListFieldConfiguration<"transport_start_transporting_condition", "code"> {
                field: "code" = "code";
                title: string = "Символьный код";
                width: number = 180;
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_start_transporting_condition", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_start_transporting_condition", "localized_names"> {
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
            is_terminal_required: new class implements ListFieldConfiguration<"transport_start_transporting_condition", "is_terminal_required"> {
                field: "is_terminal_required" = "is_terminal_required";
                title: string = "Терминал";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "transport_start_transporting_condition" = "transport_start_transporting_condition";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_START_TRANSPORTING_CONDITIONS";
    editPermission: string = "CHANGE_TRANSPORT_START_TRANSPORTING_CONDITIONS";
    title: string = "Условия начала перевозки";
    header: string = "Условия начала перевозки";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/start-transporting-conditions/edit/${primaryKey}`, href: `/transport/start-transporting-conditions/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/start-transporting-conditions/add`};
}