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

export class TransportCargoTypeConfiguration implements ListPageConfiguration<"transport_cargo_type"> {
    filter: FilterFieldsConfiguration<"transport_cargo_type"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_cargo_type", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_cargo_type" = "transport_cargo_type";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_cargo_type"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_cargo_type", "id"> {
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
            default_name: new class implements ListFieldConfiguration<"transport_cargo_type", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_cargo_type", "localized_names"> {
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
            priority: new class implements ListFieldConfiguration<"transport_cargo_type", "priority"> {
                field: "priority" = "priority";
                title: string = "Порядок отображения";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "transport_cargo_type" = "transport_cargo_type";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_CARGO_TYPES";
    editPermission: string = "CHANGE_TRANSPORT_CARGO_TYPES";
    title: string = "Управление типами груза";
    header: string = "Управление типами груза";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/cargo-type/edit/${primaryKey}`, href: `/transport/cargo-type/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}