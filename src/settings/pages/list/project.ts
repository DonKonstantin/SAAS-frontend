import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration, RelationConfig,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CustomActiveCell from "../../../components/ListPageCustom/CustomActiveCell";
import ProjectSelectCell from "../../../components/ListPageCustom/ProjectSelectCell";
import {getCurrentState} from "../../../context/AuthorizationContext";

export class ProjectListingConfiguration implements ListPageConfiguration<"project"> {
    filter: FilterFieldsConfiguration<"project"> = {
        name: {
            field: "name",
            filterType: "Like",
            schema: "project",
            title: "pages.project.list.filters.name"
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
                    type: "Simple",
                    customComponent: ProjectSelectCell,
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
    disableMultiChoose: boolean = true;
    addPageUrl: {(): PageUrl} = () => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/project/add",
            as: `/domain/${domain}/project/add`
        }
    };
    editPageUrl: EditPageLinkGenerator = pk => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/project/[projectId]/edit",
            as: `/domain/${domain}/project/${pk}/edit`
        }
    };
}