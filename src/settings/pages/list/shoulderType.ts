import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration, RelationConfiguration, RelationFilterFieldConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";

export class TransportShoulderTypeConfiguration implements ListPageConfiguration<"transport_shoulder_type"> {
    filter: FilterFieldsConfiguration<"transport_shoulder_type"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_shoulder_type", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_shoulder_type" = "transport_shoulder_type";
            title: string = "Название (умол.)";
        },
        transport_type: new class implements RelationFilterFieldConfiguration<"transport_shoulder_type", "transport_type", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"transport_type"> = {
                schema: "transport_type",
                visibleFields: ["default_name"]
            };
            field: "transport_type" = "transport_type";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "transport_shoulder_type" = "transport_shoulder_type";
            title: string = "Тип транспорта";
        },
    };
    listFields: ListFieldsConfiguration<"transport_shoulder_type"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_shoulder_type", "id"> {
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
            default_name: new class implements ListFieldConfiguration<"transport_shoulder_type", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_shoulder_type", "localized_names"> {
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
            transport_type: new class implements ListFieldConfiguration<"transport_shoulder_type", "transport_type"> {
                field: "transport_type" = "transport_type";
                title: string = "Тип транспорта";
                isEnabled: boolean = true;
                align: AlignRow = "right";
                width: number = 110;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"transport_type">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/transport/types/edit/${id}`, href: `/transport/types/edit/[entityId]`}),
                        "CHANGE_TRANSPORT_TYPES"
                    ),
                    type: "Relation"
                }
            },
        },
    };
    schema: "transport_shoulder_type" = "transport_shoulder_type";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_LEG_TYPES";
    editPermission: string = "CHANGE_TRANSPORT_LEG_TYPES";
    title: string = "Управление типами плеч";
    header: string = "Управление типами плеч";
    disableMultiChoose: boolean = true;
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/shoulder-types/edit/${primaryKey}`, href: `/transport/shoulder-types/edit/[entityId]`});
    addPageUrl: PageUrl = {href: ``};
}