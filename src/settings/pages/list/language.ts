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
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";

export class LanguageConfiguration implements ListPageConfiguration<"language"> {
    filter: FilterFieldsConfiguration<"language"> = {
        code: new class implements BaseFilterFieldConfiguration<"language", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "language" = "language";
            title: string = "Код языка";
        },
        name: new class implements BaseFilterFieldConfiguration<"language", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "language" = "language";
            title: string = "Название языка";
        },
        is_default: new class implements BaseFilterFieldConfiguration<"language", "is_default", "Switch"> {
            field: "is_default" = "is_default";
            filterType: "Switch" = "Switch";
            schema: "language" = "language";
            title: string = "По умолчанию";
        },
        is_secondary_default_for_admin: new class implements BaseFilterFieldConfiguration<"language", "is_secondary_default_for_admin", "Switch"> {
            field: "is_secondary_default_for_admin" = "is_secondary_default_for_admin";
            filterType: "Switch" = "Switch";
            schema: "language" = "language";
            title: string = "По умолчанию (2й язык админки)";
        },
        is_right_text_align: new class implements BaseFilterFieldConfiguration<"language", "is_right_text_align", "Switch"> {
            field: "is_right_text_align" = "is_right_text_align";
            filterType: "Switch" = "Switch";
            schema: "language" = "language";
            title: string = "Ориентация текста по правому краю";
        }
    };
    listFields: ListFieldsConfiguration<"language"> = {
        fields: {
            code: new class implements ListFieldConfiguration<"language", "code"> {
                field: "code" = "code";
                title: string = "Код языка";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"language", "name"> {
                field: "name" = "name";
                title: string = "Название языка";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            is_default: new class implements ListFieldConfiguration<"language", "is_default"> {
                field: "is_default" = "is_default";
                title: string = "По умолчанию";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            is_secondary_default_for_admin: new class implements ListFieldConfiguration<"language", "is_secondary_default_for_admin"> {
                field: "is_secondary_default_for_admin" = "is_secondary_default_for_admin";
                title: string = "По умолчанию (2й язык админки)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            is_right_text_align: new class implements ListFieldConfiguration<"language", "is_right_text_align"> {
                field: "is_right_text_align" = "is_right_text_align";
                title: string = "Ориентация текста по правому краю";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "language" = "language";
    elementsPerPage: number = 30;
    readPermission: string = "READ_LANGUAGES";
    editPermission: string = "CHANGE_LANGUAGES";
    title: string = "Управление языками";
    header: string = "Управление языками";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/language/edit/${primaryKey}`, href: `/language/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/language/add`};
}