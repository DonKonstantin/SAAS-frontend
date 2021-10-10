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
import ImportProgressCell from "../../../custom/components/Tools/ImportProgressCell";
import {IconButton, Tooltip} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import React, {useCallback} from "react";
import {useRouter} from "next/router";

export class TnvedProductImportTaskConfiguration implements ListPageConfiguration<"tnved_products_import_task"> {
    filter: FilterFieldsConfiguration<"tnved_products_import_task"> = {
        status: new class implements BaseFilterFieldConfiguration<"tnved_products_import_task", "status", "EnumSelector"> {
            field: "status" = "status";
            filterType: "EnumSelector" = "EnumSelector";
            schema: "tnved_products_import_task" = "tnved_products_import_task";
            title: string = "Статус";
        }
    };
    listFields: ListFieldsConfiguration<"tnved_products_import_task"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"tnved_products_import_task", "id"> {
                field: "id" = "id";
                title: string = "#";
                width: number = 42;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            status: new class implements ListFieldConfiguration<"tnved_products_import_task", "status"> {
                field: "status" = "status";
                title: string = "Статус";
                isEnabled: boolean = true;
                align: AlignRow = "center";
                fieldType: FieldType<"Enum"> = {
                    config: undefined,
                    type: "Enum",
                    customComponent: ImportProgressCell,
                }
            },
            processed_objects_quantity: new class implements ListFieldConfiguration<"tnved_products_import_task", "processed_objects_quantity"> {
                field: "processed_objects_quantity" = "processed_objects_quantity";
                title: string = "";
                isEnabled: boolean = true;
                fieldType: FieldType<"Hidden"> = {
                    config: undefined,
                    type: "Hidden"
                }
            },
            total_objects_quantity: new class implements ListFieldConfiguration<"tnved_products_import_task", "total_objects_quantity"> {
                field: "total_objects_quantity" = "total_objects_quantity";
                title: string = "";
                isEnabled: boolean = true;
                fieldType: FieldType<"Hidden"> = {
                    config: undefined,
                    type: "Hidden"
                }
            },
        },
        defaultOrderDirection: "desc",
        actions: props => {
            const {item: {primaryKeyValue}} = props;
            const router = useRouter();

            // Callback для перехода на страницу просмотра
            const handleView = useCallback(() => {
                router.push(`/tools/tnved-products-import/task/[taskId]`, `/tools/tnved-products-import/task/${primaryKeyValue}`);
            }, [primaryKeyValue]);

            return <>
                <Tooltip title="Просмотр задания">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={handleView}
                    >
                        <VisibilityIcon fontSize="default"/>
                    </IconButton>
                </Tooltip>
            </>
        },
    };
    schema: "tnved_products_import_task" = "tnved_products_import_task";
    elementsPerPage: number = 30;
    readPermission: string = "IMPORT_TNVED_PRODUCTS";
    editPermission: string = "IMPORT_TNVED_PRODUCTS";
    title: string = "Импорт товаров ТНВЭД";
    header: string = "Импорт товаров ТНВЭД";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = () => ({as: `/`, href: `/`});
    addPageUrl: PageUrl = {href: `/tools/tnved-products-import/create`};
}