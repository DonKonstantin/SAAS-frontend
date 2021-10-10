import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
} from "../../../services/listDataLoader/filterLoader/types";
import {
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";

export class CurrencyConfiguration implements ListPageConfiguration<"currency"> {
    filter: FilterFieldsConfiguration<"currency"> = {
        code: new class implements BaseFilterFieldConfiguration<"currency", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "currency" = "currency";
            title: string = "Код валюты";
        },
        default_name: new class implements BaseFilterFieldConfiguration<"currency", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "currency" = "currency";
            title: string = "Название по умолчанию";
        },
        course: new class implements BaseFilterFieldConfiguration<"currency", "course", "FloatSlider"> {
            field: "course" = "course";
            filterType: "FloatSlider" = "FloatSlider";
            schema: "currency" = "currency";
            title: string = "Курс";
        },
    };
    listFields: ListFieldsConfiguration<"currency"> = {
        fields: {
            code: new class implements ListFieldConfiguration<"currency", "code"> {
                field: "code" = "code";
                title: string = "Код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"currency", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название по умолчанию";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"currency", "localized_names"> {
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
            course: new class implements ListFieldConfiguration<"currency", "course"> {
                field: "course" = "course";
                title: string = "Курс";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            last_update_date: new class implements ListFieldConfiguration<"currency", "last_update_date"> {
                field: "last_update_date" = "last_update_date";
                title: string = "Последнее обновление";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "currency" = "currency";
    elementsPerPage: number = 30;
    readPermission: string = "READ_CURRENCIES";
    editPermission: string = "CHANGE_CURRENCIES";
    title: string = "Управление валютами";
    header: string = "Управление валютами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/currency/edit/${primaryKey}`, href: `/currency/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/currency/add`};
}