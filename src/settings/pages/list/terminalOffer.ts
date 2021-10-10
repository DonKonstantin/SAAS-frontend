import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {FilterFieldsConfiguration} from "../../../services/listDataLoader/filterLoader/types";
import {
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";

export class TransportTerminalOfferConfiguration implements ListPageConfiguration<"transport_terminal_offer"> {
    filter: FilterFieldsConfiguration<"transport_terminal_offer"> = {};
    listFields: ListFieldsConfiguration<"transport_terminal_offer"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_terminal_offer", "id"> {
                field: "id" = "id";
                title: string = "№";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "transport_terminal_offer" = "transport_terminal_offer";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_TERMINALS";
    editPermission: string = "CHANGE_TRANSPORT_TERMINALS";
    title: string = "Управление терминальными предложениями";
    header: string = "Управление терминальными предложениями";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/transport/terminal/offer/edit/${primaryKey}`, href: `/transport/terminal/offer/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/transport/terminal/offer/add`};
}