import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration, RelationConfig,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CustomActiveCell from "../../../components/CustomActiveCell";

export class ProjectListingConfiguration implements ListPageConfiguration<"project"> {
    filter: FilterFieldsConfiguration<"project"> = {
        name: {
            field: "name",
            filterType: "Like",
            schema: "project",
            title: "pages.project.list.filters.name"
        },
        parent: {
            relationConfiguration: {
                schema: "domain",
                visibleFields: ["name"]
            },
            field: "parent",
            filterType: "RelationAutocompleteSelector",
            schema: "project",
            title: "pages.project.list.filters.parent",
        },
        active: {
            field: "active",
            filterType: "Switch",
            schema: "project",
            title: "pages.project.list.filters.active",
        },
    };
    listFields: ListFieldsConfiguration<"project"> = {
        fields: {
            name: {
                field: "name",
                title: "pages.project.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            parent: {
                field: "parent",
                title: "pages.project.list.fields.parent",
                isEnabled: true,
                align: "left",
                fieldType: {
                    config: <RelationConfig<"domain">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
            active: {
                field: "active",
                align: "left",
                width: 126,
                title: "pages.project.list.fields.active",
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
    schema: "project" = "project";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/"};
    editPageUrl: EditPageLinkGenerator = () => ({href: "/"});
}