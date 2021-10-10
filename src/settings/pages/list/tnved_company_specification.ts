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
    RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";

export class TnvedCompanySpecificationConfiguration implements ListPageConfiguration<"tnved_company_specification"> {
    filter: FilterFieldsConfiguration<"tnved_company_specification"> = {
        id: new class implements BaseFilterFieldConfiguration<"tnved_company_specification", "id", "EqualsString"> {
            field: "id" = "id";
            filterType: "EqualsString" = "EqualsString";
            schema: "tnved_company_specification" = "tnved_company_specification";
            title: string = "ID спецификации";
        },
    };
    listFields: ListFieldsConfiguration<"tnved_company_specification"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"tnved_company_specification", "id"> {
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
            company_id: new class implements ListFieldConfiguration<"tnved_company_specification", "company_id"> {
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
            base_data_file_id: new class implements ListFieldConfiguration<"tnved_company_specification", "base_data_file_id"> {
                field: "base_data_file_id" = "base_data_file_id";
                title: string = "Базовый файл";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"excel_file">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
            base_specification_file_id: new class implements ListFieldConfiguration<"tnved_company_specification", "base_specification_file_id"> {
                field: "base_specification_file_id" = "base_specification_file_id";
                title: string = "Файл базовой спецификации";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"excel_file">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
            detail_specification_file_id: new class implements ListFieldConfiguration<"tnved_company_specification", "detail_specification_file_id"> {
                field: "detail_specification_file_id" = "detail_specification_file_id";
                title: string = "Файл детальной спецификации";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"excel_file">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
        },
    };
    schema: "tnved_company_specification" = "tnved_company_specification";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TNVED_SPECIFICATIONS";
    editPermission: string = "CHANGE_TNVED_SPECIFICATIONS";
    title: string = "Управление спецификациями ТНВЭД";
    header: string = "Управление спецификациями ТНВЭД";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/tnved/company-specifications/edit/${primaryKey}`,
        href: `/tnved/company-specifications/edit/[entityId]`
    });
    addPageUrl: PageUrl = {href: `/tnved/company-specifications/add`};
}