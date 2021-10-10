import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";

export class TnvedCompanyCategoryConfiguration implements ListPageConfiguration<"tnved_company_category"> {
    filter: FilterFieldsConfiguration<"tnved_company_category"> = {
        code: new class implements BaseFilterFieldConfiguration<"tnved_company_category", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "tnved_company_category" = "tnved_company_category";
            title: string = "Символьный код";
        },
        name: new class implements BaseFilterFieldConfiguration<"tnved_company_category", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "tnved_company_category" = "tnved_company_category";
            title: string = "Название";
        }
    };
    listFields: ListFieldsConfiguration<"tnved_company_category"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"tnved_company_category", "id"> {
                field: "id" = "id";
                title: string = "#";
                align: AlignRow = "left";
                width: number = 80;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            company_id: new class implements ListFieldConfiguration<"tnved_company_category", "company_id"> {
                field: "company_id" = "company_id";
                title: string = "ID компании";
                width: number = 200;
                align: AlignRow = "left";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            code: new class implements ListFieldConfiguration<"tnved_company_category", "code"> {
                field: "code" = "code";
                title: string = "Код категории";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"tnved_company_category", "name"> {
                field: "name" = "name";
                title: string = "Название";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "tnved_company_category" = "tnved_company_category";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TNVED_CATEGORIES";
    editPermission: string = "CHANGE_TNVED_CATEGORIES";
    title: string = "Управление категориями ТНВЭД";
    header: string = "Управление категориями ТНВЭД";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/tnved/company-categories/edit/${primaryKey}`,
        href: `/tnved/company-categories/edit/[entityId]`
    });
    addPageUrl: PageUrl = {href: `/tnved/company-categories/add`};
}