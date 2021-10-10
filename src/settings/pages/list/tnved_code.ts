import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";
import {Padding} from "@material-ui/core";
import ChildrenTnvedLink from "../../../custom/components/ChildrenTnvedLink";

export class TnvedCodeConfiguration implements ListPageConfiguration<"tnved_code"> {
    filter: FilterFieldsConfiguration<"tnved_code"> = {
        name: new class implements BaseFilterFieldConfiguration<"tnved_code", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "tnved_code" = "tnved_code";
            title: string = "Название";
        },
        code: new class implements BaseFilterFieldConfiguration<"tnved_code", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "tnved_code" = "tnved_code";
            title: string = "Код";
        },
    };
    listFields: ListFieldsConfiguration<"tnved_code"> = {
        fields: {
            path: new class implements ListFieldConfiguration<"tnved_code", "path"> {
                field: "path" = "path";
                title: string = "";
                width: number = 48;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple",
                    customComponent: ChildrenTnvedLink
                }
            },
            id: new class implements ListFieldConfiguration<"tnved_code", "id"> {
                field: "id" = "id";
                title: string = "#";
                align: AlignRow = "left";
                width: number = 80;
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            code: new class implements ListFieldConfiguration<"tnved_code", "code"> {
                field: "code" = "code";
                title: string = "Код";
                align: AlignRow = "left";
                width: number = 140;
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"tnved_code", "name"> {
                field: "name" = "name";
                title: string = "Название";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            description: new class implements ListFieldConfiguration<"tnved_code", "description"> {
                field: "description" = "description";
                title: string = "Описание";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "tnved_code" = "tnved_code";
    deleteSchema: "tnved_code_edit" = "tnved_code_edit";
    elementsPerPage: number = 30;
    disableMultiChoose: boolean = true;
    readPermission: string = "EDIT_TNVED_CODES";
    editPermission: string = "EDIT_TNVED_CODES";
    title: string = "Управление кодами ТНВЭД";
    header: string = "Управление кодами ТНВЭД";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/tnved/code/edit/${primaryKey}`,
        href: `/tnved/code/edit/[entityId]`
    });
    addPageUrl: PageUrl = {href: `/tnved/code/add`};
}