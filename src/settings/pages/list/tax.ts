import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";

export class TaxConfiguration implements ListPageConfiguration<"tax"> {
    filter: FilterFieldsConfiguration<"tax"> = {
        code: new class implements BaseFilterFieldConfiguration<"tax", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "tax" = "tax";
            title: string = "Код";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"tax", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "tax" = "tax";
            title: string = "Название (умол.)";
        },
        amount: new class implements BaseFilterFieldConfiguration<"tax", "amount", "IntegerSlider"> {
            field: "amount" = "amount";
            filterType: "IntegerSlider" = "IntegerSlider";
            schema: "tax" = "tax";
            title: string = "Значение";
        },
        is_default: new class implements BaseFilterFieldConfiguration<"tax", "is_default", "Switch"> {
            field: "is_default" = "is_default";
            filterType: "Switch" = "Switch";
            schema: "tax" = "tax";
            title: string = "По умолчанию";
        },
    };
    listFields: ListFieldsConfiguration<"tax"> = {
        fields: {
            code: new class implements ListFieldConfiguration<"tax", "code"> {
                field: "code" = "code";
                title: string = "Код налога";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"tax", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"tax", "localized_names"> {
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
            is_default: new class implements ListFieldConfiguration<"tax", "is_default"> {
                field: "is_default" = "is_default";
                title: string = "По умолчанию";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            amount: new class implements ListFieldConfiguration<"tax", "amount"> {
                field: "amount" = "amount";
                title: string = "Значение";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "tax" = "tax";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TAXES";
    editPermission: string = "CHANGE_TAXES";
    title: string = "Управление налогами";
    header: string = "Управление налогами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/tax/edit/${primaryKey}`, href: `/tax/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/tax/add`};
}