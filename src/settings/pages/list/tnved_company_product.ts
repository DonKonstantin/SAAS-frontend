import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
    RelationConfiguration,
    RelationFilterFieldConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
    RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";

export class TnvedCompanyProductConfiguration implements ListPageConfiguration<"tnved_company_product"> {
    filter: FilterFieldsConfiguration<"tnved_company_product"> = {
        sku: new class implements BaseFilterFieldConfiguration<"tnved_company_product", "sku", "Like"> {
            field: "sku" = "sku";
            filterType: "Like" = "Like";
            schema: "tnved_company_product" = "tnved_company_product";
            title: string = "Артикул";
        },
        name: new class implements BaseFilterFieldConfiguration<"tnved_company_product", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "tnved_company_product" = "tnved_company_product";
            title: string = "Название";
        },
        category_id: new class implements RelationFilterFieldConfiguration<"tnved_company_product", "category_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"tnved_company_category"> = {
                schema: "tnved_company_category",
                visibleFields: ["name"]
            };
            field: "category_id" = "category_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "tnved_company_product" = "tnved_company_product";
            title: string = "Категория ТНВЭД";
        },
        tnved_code: new class implements BaseFilterFieldConfiguration<"tnved_company_product", "tnved_code", "Like"> {
            field: "tnved_code" = "tnved_code";
            filterType: "Like" = "Like";
            schema: "tnved_company_product" = "tnved_company_product";
            title: string = "Код ТНВЭД";
        },
    };
    listFields: ListFieldsConfiguration<"tnved_company_product"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"tnved_company_product", "id"> {
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
            company_id: new class implements ListFieldConfiguration<"tnved_company_product", "company_id"> {
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
            category_id: new class implements ListFieldConfiguration<"tnved_company_product", "category_id"> {
                field: "category_id" = "category_id";
                title: string = "Категория ТНВЭД";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"tnved_company_category">>{
                        relatedFields: ["name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/tnved/company-categories/edit/${id}`, href: `/tnved/company-categories/edit/[entityId]`}),
                        "CHANGE_TNVED_CATEGORIES",
                        option => option?.relationFieldValues?.name[0] || "-",
                    ),
                    type: "Relation"
                }
            },
            sku: new class implements ListFieldConfiguration<"tnved_company_product", "sku"> {
                field: "sku" = "sku";
                title: string = "Артикул";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            tnved_code: new class implements ListFieldConfiguration<"tnved_company_product", "tnved_code"> {
                field: "tnved_code" = "tnved_code";
                title: string = "ТНВЭД код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"tnved_company_product", "name"> {
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
    schema: "tnved_company_product" = "tnved_company_product";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TNVED_PRODUCTS";
    editPermission: string = "CHANGE_TNVED_PRODUCTS";
    title: string = "Управление товарами ТНВЭД";
    header: string = "Управление товарами ТНВЭД";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/tnved/company-products/edit/${primaryKey}`,
        href: `/tnved/company-products/edit/[entityId]`
    });
    addPageUrl: PageUrl = {href: `/tnved/company-products/add`};
}