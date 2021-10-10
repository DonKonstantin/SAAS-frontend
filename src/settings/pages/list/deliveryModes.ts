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

export class TransportDeliveryModesConfiguration implements ListPageConfiguration<"transport_delivery_mod"> {
    filter: FilterFieldsConfiguration<"transport_delivery_mod"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_delivery_mod", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_delivery_mod" = "transport_delivery_mod";
            title: string = "Название (умол.)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_delivery_mod"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_delivery_mod", "id"> {
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
            default_name: new class implements ListFieldConfiguration<"transport_delivery_mod", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_delivery_mod", "localized_names"> {
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
        },
    };
    schema: "transport_delivery_mod" = "transport_delivery_mod";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_DELIVERY_MODES";
    editPermission: string = "CHANGE_TRANSPORT_DELIVERY_MODES";
    title: string = "Управление режимами перевозки";
    header: string = "Управление режимами перевозки";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/delivery-modes/edit/${primaryKey}`, href: `/transport/delivery-modes/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}