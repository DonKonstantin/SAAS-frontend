import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import {rolesCloneService} from "../../../services/rolesCloneService";

export class RoleListingConfiguration implements ListPageConfiguration<"file"> {
    filter: FilterFieldsConfiguration<"file"> = {

    };
    listFields: ListFieldsConfiguration<"file"> = {
        fields: {

        },
        actions: ListPageEditDeleteButtons,
    };
    schema: "file" = "file";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/file/add"};
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/file/edit/[entityId]",
        as: `/file/edit/${pk}`
    });
    onCopyRows: { (primaryKeys: string[]): Promise<void> } = async rows => {
        await rolesCloneService().CloneRoles(rows)
    }
}
