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

export class TransportTypeConfiguration implements ListPageConfiguration<"transport_type"> {
    filter: FilterFieldsConfiguration<"transport_type"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_type", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_type" = "transport_type";
            title: string = "Название (умол.)";
        },
        transporting_default_name: new class implements BaseFilterFieldConfiguration<"transport_type", "transporting_default_name", "Like"> {
            field: "transporting_default_name" = "transporting_default_name";
            filterType: "Like" = "Like";
            schema: "transport_type" = "transport_type";
            title: string = "Название типа перевозки (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_type"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_type", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 42;
                align: AlignRow = "center";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_type", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_type", "localized_names"> {
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
            transporting_default_name: new class implements ListFieldConfiguration<"transport_type", "transporting_default_name"> {
                field: "transporting_default_name" = "transporting_default_name";
                title: string = "Название типа перевозки (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            transporting_names: new class implements ListFieldConfiguration<"transport_type", "transporting_names"> {
                field: "transporting_names" = "transporting_names";
                title: string = "Название типа перевозки";
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
    schema: "transport_type" = "transport_type";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_TYPES";
    editPermission: string = "CHANGE_TRANSPORT_TYPES";
    title: string = "Управление типами транспорта";
    header: string = "Управление типами транспорта";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/types/edit/${primaryKey}`, href: `/transport/types/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}