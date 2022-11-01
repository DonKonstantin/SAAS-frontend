import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";
import { getCurrentState } from "../../../context/AuthorizationContext";
import CampaignInfoGroup
  from "../../../components/EditPageCustomFields/CampaignGroup/CampaignSchedule/CampaignInfoGroup";
import EnumField from "../../../components/EditPage/Fields/EnumField";
import { campaignListService } from "services/campaignListService";
import { Logger } from "services/logger/Logger";
import { loggerFactory } from "services/logger";


export class CampaignEditPageConfig implements EditPageConfiguration<"campaign"> {
  private readonly logger: Logger = loggerFactory().make('CampaignEditPageConfig');

  groups: EditFormGroup<"campaign">[] = [
    {
      sizes: { xs: 12 },
      component: CampaignInfoGroup,
      fields: [
        {
          field: "channels",
          title: "",
          defaultValue: [],
          validation: [],
          component: EnumField,
          additionData: async (_, primaryKey) => {
            const { project } = getCurrentState();

            this.logger.Debug("primaryKey: ", primaryKey);
            this.logger.Debug("project ID: ", project);

            if (!project || !primaryKey) {
              return {};
            }

            try {
              const channels = await campaignListService().getChannelsForCampaign(project, primaryKey);

              return {
                channels
              }
            } catch (error) {
              return {};
            }
          },
        },
      ]
    },
  ];
  schema: "campaign" = "campaign";
  listPageUrl: PageUrl = { href: "/campaign" };
  isCopyEnabled: boolean = false;
  isSaveAndCloseEnabled: boolean = true;
  isSaveEnabled: boolean = true;

  editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => {
    const { domain, project, menuType } = getCurrentState()
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