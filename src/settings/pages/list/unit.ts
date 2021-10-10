import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration, RelationConfiguration, RelationFilterFieldConfiguration,
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";
import {Padding} from "@material-ui/core";

export class TransportUnitConfiguration implements ListPageConfiguration<"transport_unit"> {
    filter: FilterFieldsConfiguration<"transport_unit"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_unit", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_unit" = "transport_unit";
            title: string = "Название (умол.)";
        },
        unit_symbol: new class implements BaseFilterFieldConfiguration<"transport_unit", "unit_symbol", "Like"> {
            field: "unit_symbol" = "unit_symbol";
            filterType: "Like" = "Like";
            schema: "transport_unit" = "transport_unit";
            title: string = "Обозначение";
        },
        unit_group: new class implements RelationFilterFieldConfiguration<"transport_unit", "unit_group", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"transport_unit_group"> = {
                schema: "transport_unit_group",
                visibleFields: ["default_name"]
            };
            field: "unit_group" = "unit_group";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "transport_unit" = "transport_unit";
            title: string = "Группа единиц измерения";
        },
        is_default_for_group: new class implements BaseFilterFieldConfiguration<"transport_unit", "is_default_for_group", "Switch"> {
            field: "is_default_for_group" = "is_default_for_group";
            filterType: "Switch" = "Switch";
            schema: "transport_unit" = "transport_unit";
            title: string = "По умолчанию для группы";
        },
        accuracy_in: new class implements BaseFilterFieldConfiguration<"transport_unit", "accuracy_in", "IntegerSlider"> {
            field: "accuracy_in" = "accuracy_in";
            filterType: "IntegerSlider" = "IntegerSlider";
            schema: "transport_unit" = "transport_unit";
            title: string = "Точность округления (В эту единицу)";
        },
        rounding_rule_in: new class implements BaseFilterFieldConfiguration<"transport_unit", "rounding_rule_in", "EnumSelector"> {
            field: "rounding_rule_in" = "rounding_rule_in";
            filterType: "EnumSelector" = "EnumSelector";
            schema: "transport_unit" = "transport_unit";
            title: string = "Правило округления (В эту единицу)";
        },
        accuracy_out: new class implements BaseFilterFieldConfiguration<"transport_unit", "accuracy_out", "IntegerSlider"> {
            field: "accuracy_out" = "accuracy_out";
            filterType: "IntegerSlider" = "IntegerSlider";
            schema: "transport_unit" = "transport_unit";
            title: string = "Точность округления (Из этой единицы)";
        },
        rounding_rule_out: new class implements BaseFilterFieldConfiguration<"transport_unit", "rounding_rule_out", "EnumSelector"> {
            field: "rounding_rule_out" = "rounding_rule_out";
            filterType: "EnumSelector" = "EnumSelector";
            schema: "transport_unit" = "transport_unit";
            title: string = "Правило округления (Из этой единицы)";
        },
    };
    listFields: ListFieldsConfiguration<"transport_unit"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_unit", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 42;
                align: AlignRow = "center";
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_unit", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_unit", "localized_names"> {
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
            unit_group: new class implements ListFieldConfiguration<"transport_unit", "unit_group"> {
                field: "unit_group" = "unit_group";
                title: string = "Группа";
                isEnabled: boolean = true;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"transport_unit_group">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/unit-group/edit/${id}`, href: `/transport/unit-group/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_UNIT_GROUPS"
                    ),
                    type: "Relation"
                }
            },
            unit_symbol: new class implements ListFieldConfiguration<"transport_unit", "unit_symbol"> {
                field: "unit_symbol" = "unit_symbol";
                title: string = "Обозначение";
                isEnabled: boolean = true;
                width: number = 160;
                align: AlignRow = "right";
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            is_default_for_group: new class implements ListFieldConfiguration<"transport_unit", "is_default_for_group"> {
                field: "is_default_for_group" = "is_default_for_group";
                title: string = "По умолчанию (группа)";
                isEnabled: boolean = true;
                width: number = 160;
                align: AlignRow = "right";
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "transport_unit" = "transport_unit";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_UNITS";
    editPermission: string = "CHANGE_TRANSPORT_UNITS";
    title: string = "Управление единицами измерения";
    header: string = "Управление единицами измерения";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/unit/edit/${primaryKey}`, href: `/transport/unit/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/unit/add`};
}