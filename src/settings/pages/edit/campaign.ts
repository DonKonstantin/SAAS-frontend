import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";
import { getCurrentState } from "../../../context/AuthorizationContext";

export class CampaignEditPageConfig implements EditPageConfiguration<"campaign"> {
    groups: EditFormGroup<"campaign">[] = [];
    schema: "campaign" = "campaign";
    listPageUrl: PageUrl = {href: "/campaign"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => {
        const {domain, project, menuType} = getCurrentState()
        switch (true) {
            case menuType === `project`:
                return {
                    href: "/domain/[domainId]/project/[projectId]/campaign/edit/[entityId]",
                    as: `/domain/${domain}/project/${project}/campaign/edit/${pk}`
                }
            case menuType === `domain`:
                return {
                    href: "/domain/[domainId]/campaign/edit/[entityId]",
                    as: `/domain/${domain}/campaign/edit/${pk}`
                }
            default:
                return {
                    href: "/campaign/edit/[entityId]",
                    as: `/campaign/edit/${pk}`
                }
        }
    };
}