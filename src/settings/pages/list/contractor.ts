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
import {Padding} from "@material-ui/core";

export class ContractorConfiguration implements ListPageConfiguration<"contractor"> {
    filter: FilterFieldsConfiguration<"contractor"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"contractor", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "contractor" = "contractor";
            title: string = "Название (умол.)";
        },
        default_abbreviation: new class implements BaseFilterFieldConfiguration<"contractor", "default_abbreviation", "Like"> {
            field: "default_abbreviation" = "default_abbreviation";
            filterType: "Like" = "Like";
            schema: "contractor" = "contractor";
            title: string = "Аббревиатура (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"contractor"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"contractor", "id"> {
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
            default_name: new class implements ListFieldConfiguration<"contractor", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"contractor", "localized_names"> {
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
            default_abbreviation: new class implements ListFieldConfiguration<"contractor", "default_abbreviation"> {
                field: "default_abbreviation" = "default_abbreviation";
                title: string = "Аббревиатура (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_abbreviations: new class implements ListFieldConfiguration<"contractor", "localized_abbreviations"> {
                field: "localized_abbreviations" = "localized_abbreviations";
                title: string = "Аббревиатура";
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
    schema: "contractor" = "contractor";
    elementsPerPage: number = 30;
    readPermission: string = "READ_CONTRACTORS";
    editPermission: string = "CHANGE_CONTRACTORS";
    title: string = "Управление подрядчиками";
    header: string = "Управление подрядчиками";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/contractor/edit/${primaryKey}`, href: `/contractor/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/contractor/add`};
}