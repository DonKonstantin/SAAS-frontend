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

export class TransportUnitGroupConfiguration implements ListPageConfiguration<"transport_unit_group"> {
    filter: FilterFieldsConfiguration<"transport_unit_group"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_unit_group", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_unit_group" = "transport_unit_group";
            title: string = "Название (умол.)";
        },
        unit_symbol: new class implements BaseFilterFieldConfiguration<"transport_unit_group", "unit_symbol", "Like"> {
            field: "unit_symbol" = "unit_symbol";
            filterType: "Like" = "Like";
            schema: "transport_unit_group" = "transport_unit_group";
            title: string = "Обозначение группы";
        },
        accuracy: new class implements BaseFilterFieldConfiguration<"transport_unit_group", "accuracy", "IntegerSlider"> {
            field: "accuracy" = "accuracy";
            filterType: "IntegerSlider" = "IntegerSlider";
            schema: "transport_unit_group" = "transport_unit_group";
            title: string = "Точность округления";
        },
        rounding_rule: new class implements BaseFilterFieldConfiguration<"transport_unit_group", "rounding_rule", "EnumSelector"> {
            field: "rounding_rule" = "rounding_rule";
            filterType: "EnumSelector" = "EnumSelector";
            schema: "transport_unit_group" = "transport_unit_group";
            title: string = "Правило округления";
        },
    };
    listFields: ListFieldsConfiguration<"transport_unit_group"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_unit_group", "id"> {
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
            default_name: new class implements ListFieldConfiguration<"transport_unit_group", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_unit_group", "localized_names"> {
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
            unit_symbol: new class implements ListFieldConfiguration<"transport_unit_group", "unit_symbol"> {
                field: "unit_symbol" = "unit_symbol";
                title: string = "Обозначение группы";
                isEnabled: boolean = true;
                width: number = 160;
                align: AlignRow = "right";
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            accuracy: new class implements ListFieldConfiguration<"transport_unit_group", "accuracy"> {
                field: "accuracy" = "accuracy";
                title: string = "Точность округления";
                isEnabled: boolean = true;
                width: number = 160;
                align: AlignRow = "right";
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            rounding_rule: new class implements ListFieldConfiguration<"transport_unit_group", "rounding_rule"> {
                field: "rounding_rule" = "rounding_rule";
                title: string = "Правило округления";
                isEnabled: boolean = true;
                width: number = 200;
                align: AlignRow = "right";
                fieldType: FieldType<"Enum"> = {
                    config: undefined,
                    type: "Enum"
                }
            },
        },
    };
    schema: "transport_unit_group" = "transport_unit_group";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_UNIT_GROUPS";
    editPermission: string = "CHANGE_TRANSPORT_UNIT_GROUPS";
    title: string = "Управление группами единиц измерения";
    header: string = "Управление группами единиц измерения";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/unit-group/edit/${primaryKey}`, href: `/transport/unit-group/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}