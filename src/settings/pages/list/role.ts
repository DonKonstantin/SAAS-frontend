import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import {domainsAndProjectsLoader} from "../../../services/loaders/domainsAndProjects";
import StructureCell from "../../../components/ListPageCustom/StructureCell";
import {rolesCloneService} from "../../../services/rolesCloneService";
import {getCurrentState} from "../../../context/AuthorizationContext";

export class RoleListingConfiguration implements ListPageConfiguration<"role"> {
    filter: FilterFieldsConfiguration<"role"> = {
        level: {
            field: "level",
            filterType: "EnumSelector",
            schema: "role",
            title: "pages.role.list.filters.level"
        },
        name: {
            field: "name",
            filterType: "Like",
            schema: "role",
            title: "pages.role.list.filters.name"
        },
        permissions_id: {
            relationConfiguration: {
                schema: "permission",
                visibleFields: ["name"]
            },
            field: "permissions_id",
            filterType: "RelationVariantsSelector",
            schema: "role",
            title: "pages.role.list.filters.permissions_id"
        },
    };
    listFields: ListFieldsConfiguration<"role"> = {
        fields: {
            name: {
                field: "name",
                title: "pages.role.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            structure_item_id: {
                field: "structure_item_id",
                title: "pages.role.list.fields.structure_item_id",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: StructureCell
                }
            },
            level: {
                field: "level",
                title: "pages.role.list.fields.level",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Enum"
                }
            },
        },
        actions: ListPageEditDeleteButtons,
        additionDataLoader: async items => {
            const ids = items.map(role => role.columnValues['structure_item_id'].value)

            return await domainsAndProjectsLoader().Load(ids)
        }
    };
    schema: "role" = "role";
    elementsPerPage: number = 25;
    onCopyRows: { (primaryKeys: string[]): Promise<void> } = async rows => {
        await rolesCloneService().CloneRoles(rows)
    }
    addPageUrl: {(): PageUrl} = () => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/roles/add",
            as: `/domain/${domain}/roles/add`
        }
    };
    editPageUrl: EditPageLinkGenerator = pk => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/roles/edit/[entityId]",
            as: `/domain/${domain}/roles/edit/${pk}`
        }
    };
}