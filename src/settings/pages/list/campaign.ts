import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldRow, ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
// import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import {getCurrentState} from "../../../context/AuthorizationContext";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CampaignDataField from "../../../components/ListPageCustom/CampaignDataField";
import CampaignLastVersionField from "../../../components/ListPageCustom/CampaignLastVersionField";
import {campaignListService} from "../../../services/campaignListService";

export class CampaignListingConfiguration implements ListPageConfiguration<"campaign"> {
  filter: FilterFieldsConfiguration<"campaign"> = {
    name: {
      field: "name",
      filterType: "Like",
      schema: "campaign",
      title: "pages.campaign.list.filters.name"
    },
    campaign_priority: {
      field: "campaign_priority",
      filterType: "EnumSelector",
      schema: "campaign",
      title: "pages.campaign.list.filters.campaign-priority",
    },
    campaign_period_start: {
      field: "campaign_period_start",
      filterType: "DateTimeRange",
      schema: "campaign",
      title: "pages.campaign.list.filters.campaign-period-start",
    },
    campaign_period_stop: {
      field: "campaign_period_stop",
      filterType: "DateTimeRange",
      schema: "campaign",
      title: "pages.campaign.list.filters.campaign-period-stop",
    },
  };
  listFields: ListFieldsConfiguration<"campaign"> = {
    fields: {
      name: {
        field: "name",
        title: "pages.campaign.list.fields.name",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple"
        }
      },
      id: {
        field: "id",
        title: "",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Hidden"
        }
      },
      version: {
        field: "version",
        title: "pages.campaign.list.fields.version",
        isEnabled: true,
        align: "center",
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: CampaignLastVersionField
        }
      },
      campaign_priority: {
        field: "campaign_priority",
        title: "pages.campaign.list.fields.campaign-priority",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Enum"
        }
      },
      campaign_period_start: {
        field: "campaign_period_start",
        title: "pages.campaign.list.fields.campaign-period-start",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: CampaignDataField
        }
      },
      campaign_period_stop: {
        field: "campaign_period_stop",
        title: "pages.campaign.list.fields.campaign-period-stop",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: CampaignDataField
        }
      },
    },
    actions: ListPageEditDeleteButtons,
    additionDataLoader: async (listData: ListFieldRow<"campaign">[]) => {
      const arrayOfCampaign = listData.map(campaign => campaign.columnValues.id.value)

      return await campaignListService().getCampaignByArrayId(arrayOfCampaign)
    }
  };
  schema: "campaign" = "campaign";
  elementsPerPage: number = 25;
  addPageUrl: {(): PageUrl} = () => {
    const { domain, project, menuType } = getCurrentState()
    switch (true) {
      case menuType === `project`:
        return {
          href: "/domain/[domainId]/project/[projectId]/campaign/add",
          as: `/domain/${domain}/project/${project}/campaign/add`
        }
      case menuType === `domain`:
        return {
          href: "/domain/[domainId]/campaign/add",
          as: `/domain/${domain}/campaign/add`
        }
      default:
        return {
          href: "/campaign/add",
          as: `/campaign/add`
        }
    }
  };
  editPageUrl: EditPageLinkGenerator = pk => {
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