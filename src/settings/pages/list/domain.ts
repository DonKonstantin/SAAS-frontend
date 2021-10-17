import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CustomActiveCell from "../../../components/CustomActiveCell";
import DomainSelectCell from "../../../components/DomainSelectCell";

export class DomainListingConfiguration implements ListPageConfiguration<"domain"> {
    filter: FilterFieldsConfiguration<"domain"> = {
        name: {
            field: "name",
            filterType: "Like",
            schema: "domain",
            title: "pages.domain.list.filters.name"
        },
        active: {
            field: "active",
            filterType: "Switch",
            schema: "domain",
            title: "pages.domain.list.filters.active",
        },
    };
    listFields: ListFieldsConfiguration<"domain"> = {
        fields: {
            name: {
                field: "name",
                title: "pages.domain.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: DomainSelectCell
                }
            },
            active: {
                field: "active",
                align: "left",
                width: 126,
                title: "pages.domain.list.fields.active",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: CustomActiveCell
                }
            },
        },
        actions: ListPageEditDeleteButtons,
    };
    schema: "domain" = "domain";
    elementsPerPage: number = 25;
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/domain/edit/[entityId]",
        as: `/domain/edit/${pk}`
    });
    addPageUrl: PageUrl = {href: "/domain/add"};
}