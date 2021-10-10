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
    RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {LocalizedFieldCell} from "../../../components/ListPage/List/ListBody/ListCells/LocalizedField";
import {Padding} from "@material-ui/core";
import ChildrenLocationsLink from "../../../custom/components/ChildrenLocationsLink";

export class LocationsConfiguration implements ListPageConfiguration<"locations"> {
    filter: FilterFieldsConfiguration<"locations"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"locations", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "locations" = "locations";
            title: string = "Название по умолчанию";
        },
        symbol_code: new class implements BaseFilterFieldConfiguration<"locations", "symbol_code", "EqualsString"> {
            field: "symbol_code" = "symbol_code";
            filterType: "EqualsString" = "EqualsString";
            schema: "locations" = "locations";
            title: string = "ISO";
        },
    };
    listFields: ListFieldsConfiguration<"locations"> = {
        fields: {
            children: new class implements ListFieldConfiguration<"locations", "children"> {
                field: "children" = "children";
                title: string = "";
                width: number = 48;
                isEnabled: boolean = true;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"localized_message">>{
                        relatedFields: ["id"]
                    },
                    type: "MultipleRelation",
                    customComponent: ChildrenLocationsLink
                }
            },
            id: new class implements ListFieldConfiguration<"locations", "id"> {
                field: "id" = "id";
                title: string = "№";
                width: number = 120;
                align: AlignRow = "center";
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            import_id: new class implements ListFieldConfiguration<"locations", "import_id"> {
                field: "import_id" = "import_id";
                title: string = "ID (импорт)";
                align: AlignRow = "left";
                width: number = 140;
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            symbol_code: new class implements ListFieldConfiguration<"locations", "symbol_code"> {
                field: "symbol_code" = "symbol_code";
                title: string = "ISO";
                width: number = 100;
                align: AlignRow = "left";
                padding: Padding = "none";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            default_name: new class implements ListFieldConfiguration<"locations", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название(ум.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"locations", "localized_names"> {
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
    schema: "locations" = "locations";
    deleteSchema: "location" = "location";
    elementsPerPage: number = 30;
    disableMultiChoose: boolean = true;
    readPermission: string = "READ_LOCATIONS";
    editPermission: string = "CHANGE_LOCATIONS";
    title: string = "Управление гео-объектами";
    header: string = "Управление гео-объектами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/locations/edit/${primaryKey}`,
        href: `/locations/edit/[entityId]`
    });
    addPageUrl: PageUrl = {href: `/locations/add`};
}