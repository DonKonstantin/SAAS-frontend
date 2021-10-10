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

export class TransportUnloadingConditionsConfiguration implements ListPageConfiguration<"transport_unloading_condition"> {
    filter: FilterFieldsConfiguration<"transport_unloading_condition"> = {
        code: new class implements BaseFilterFieldConfiguration<"transport_unloading_condition", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "transport_unloading_condition" = "transport_unloading_condition";
            title: string = "Символьный код";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"transport_unloading_condition", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_unloading_condition" = "transport_unloading_condition";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_unloading_condition"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_unloading_condition", "id"> {
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
            code: new class implements ListFieldConfiguration<"transport_unloading_condition", "code"> {
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
            default_name: new class implements ListFieldConfiguration<"transport_unloading_condition", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_unloading_condition", "localized_names"> {
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
    schema: "transport_unloading_condition" = "transport_unloading_condition";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_UNLOADING_CONDITIONS";
    editPermission: string = "CHANGE_TRANSPORT_UNLOADING_CONDITIONS";
    title: string = "Условия разгрузки";
    header: string = "Условия разгрузки";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/unloading-conditions/edit/${primaryKey}`, href: `/transport/unloading-conditions/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/unloading-conditions/add`};
}