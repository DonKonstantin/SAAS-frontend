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

export class TransportShoulderOfferConfiguration implements ListPageConfiguration<"transport_shoulder_offer"> {
    filter: FilterFieldsConfiguration<"transport_shoulder_offer"> = {};
    listFields: ListFieldsConfiguration<"transport_shoulder_offer"> = {
        fields: {
            id: new class implements ListFieldConfiguration<"transport_shoulder_offer", "id"> {
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
    schema: "transport_shoulder_offer" = "transport_shoulder_offer";
    elementsPerPage: number = 30;
    readPermission: string = "READ_TRANSPORT_SHOULDERS";
    editPermission: string = "CHANGE_TRANSPORT_SHOULDERS";
    title: string = "Управление ценовыми предложениями";
    header: string = "Управление ценовыми предложениями";
    editPageUrl: EditPageLinkGenerator = () => ({href: `/`});
    addPageUrl: PageUrl = {href: ``};
}