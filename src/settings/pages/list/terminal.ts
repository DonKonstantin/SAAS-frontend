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
import {Padding} from "@material-ui/core/Table";
import ListPageTerminalOffersListActions from "../../../custom/containers/ListPageTerminalOffersListActions";
import {ListPageTerminalOffersListComponent} from "../../../custom/containers/ListPageTerminalOffersListComponent";

export class TransportTerminalConfiguration implements ListPageConfiguration<"transport_terminal"> {
    filter: FilterFieldsConfiguration<"transport_terminal"> = {
        default_name: new class implements BaseFilterFieldConfiguration<"transport_terminal", "default_name", "Like"> {
            field: "default_name" = "default_name";
            filterType: "Like" = "Like";
            schema: "transport_terminal" = "transport_terminal";
            title: string = "Название (умол.)";
        },
        default_abbreviation: new class implements BaseFilterFieldConfiguration<"transport_terminal", "default_abbreviation", "Like"> {
            field: "default_abbreviation" = "default_abbreviation";
            filterType: "Like" = "Like";
            schema: "transport_terminal" = "transport_terminal";
            title: string = "Аббревиатура (умол.)";
        },
        location_id: new class implements RelationFilterFieldConfiguration<"transport_terminal", "location_id", "RelationAutocompleteSearch"> {
            relationConfiguration: RelationConfiguration<"locations"> = {
                schema: "locations",
                visibleFields: ["default_name", "symbol_code"]
            };
            searchFields: string[] = ["default_name"];
            field: "location_id" = "location_id";
            filterType: "RelationAutocompleteSearch" = "RelationAutocompleteSearch";
            schema: "transport_terminal" = "transport_terminal";
            title: string = "Местоположение терминала";
        },
    };
    listFields: ListFieldsConfiguration<"transport_terminal"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_terminal", "id"> {
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
            location_id: new class implements ListFieldConfiguration<"transport_terminal", "location_id"> {
                field: "location_id" = "location_id";
                title: string = "Местоположение";
                isEnabled: boolean = true;
                align: AlignRow = "left";
                width: number = 140;
                padding: Padding = "none";
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"locations">>{
                        relatedFields: ["default_name"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/locations/edit/${id}`, href: `/locations/edit/[entityId]`}),
                        "CHANGE_LOCATIONS"
                    ),
                    type: "Relation"
                }
            },
            default_name: new class implements ListFieldConfiguration<"transport_terminal", "default_name"> {
                field: "default_name" = "default_name";
                title: string = "Название (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_names: new class implements ListFieldConfiguration<"transport_terminal", "localized_names"> {
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
            default_abbreviation: new class implements ListFieldConfiguration<"transport_terminal", "default_abbreviation"> {
                field: "default_abbreviation" = "default_abbreviation";
                title: string = "Аббревиатура (умол.)";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            localized_abbreviations: new class implements ListFieldConfiguration<"transport_terminal", "localized_abbreviations"> {
                field: "localized_abbreviations" = "localized_abbreviations";
                title: string = "Аббревиатура";
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
        actions: ListPageTerminalOffersListActions,
        ...ListPageTerminalOffersListComponent({
            addPageUrlGenerator: terminalId => ({
                href: `/transport/terminal/[terminalId]/offer/add`,
                as: `/transport/terminal/${terminalId}/offer/add`,
            }),
            editPageUrlGenerator: (primaryKey, terminalId) => ({
                href: `/transport/terminal/[terminalId]/offer/edit/[entityId]`,
                as: `/transport/terminal/${terminalId}/offer/edit/${primaryKey}`,
            })
        }),
    };
    schema: "transport_terminal" = "transport_terminal";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_TERMINALS";
    editPermission: string = "CHANGE_TRANSPORT_TERMINALS";
    title: string = "Управление терминалами";
    header: string = "Управление терминалами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/terminal/edit/${primaryKey}`, href: `/transport/terminal/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/terminal/add`};
}