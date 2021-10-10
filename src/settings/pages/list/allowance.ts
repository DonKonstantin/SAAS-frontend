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

export class TransportAllowanceConfiguration implements ListPageConfiguration<"transport_allowance"> {
    filter: FilterFieldsConfiguration<"transport_allowance"> = {
        code: new class implements BaseFilterFieldConfiguration<"transport_allowance", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "transport_allowance" = "transport_allowance";
            title: string = "Символьный код";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"transport_allowance", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_allowance" = "transport_allowance";
            title: string = "Название (умол.)";
        },
        allowance_group: new class implements RelationFilterFieldConfiguration<"transport_allowance", "allowance_group", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"transport_allowance_group"> = {
                schema: "transport_allowance_group",
                visibleFields: ["default_name"]
            };
            field: "allowance_group" = "allowance_group";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "transport_allowance" = "transport_allowance";
            title: string = "Группа надбавок";
        },
    };
    listFields: ListFieldsConfiguration<"transport_allowance"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_allowance", "id"> {
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
            code: new class implements ListFieldConfiguration<"transport_allowance", "code"> {
                field: "code" = "code";
                title: string = "Символьный код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_allowance", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            allowance_group: new class implements ListFieldConfiguration<"transport_allowance", "allowance_group"> {
                field: "allowance_group" = "allowance_group";
                title: string = "Группа";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"transport_allowance_group">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/allowance-group/edit/${id}`, href: `/transport/allowance-group/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_ALLOWANCE_GROUPS"
                    ),
                    type: "Relation"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_allowance", "localized_names"> {
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
    schema: "transport_allowance" = "transport_allowance";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_ALLOWANCE";
    editPermission: string = "CHANGE_TRANSPORT_ALLOWANCE";
    title: string = "Управление надбавками";
    header: string = "Управление надбавками";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/allowance/edit/${primaryKey}`, href: `/transport/allowance/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/allowance/add`};
}