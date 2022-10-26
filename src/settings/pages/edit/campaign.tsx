import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";
import { getCurrentState } from "../../../context/AuthorizationContext";
import CampaignInfoGroup
  from "../../../components/EditPageCustomFields/CampaignGroup/CampaignSchedule/CampaignInfoGroup";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IntField from "components/EditPage/Fields/IntField";
import DateField from "components/EditPage/Fields/DateField";
import TimeField from "../../../components/EditPage/Fields/TimeField";
import CampaignDaysGroup
  from "../../../components/EditPageCustomFields/CampaignGroup/CampaignSchedule/CampaignDaysGroup";
import RadioEnumButton from "../../../components/EditPage/Fields/RadioEnumButton";
import EnumField from "../../../components/EditPage/Fields/EnumField";
import { MinimalLengthValidator } from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import QueueIntField from "components/EditPage/Fields/QueueIntField";
import { ValueExistsValidator } from "../../../services/validation/validators/valueExists";

export class CampaignEditPageConfig implements EditPageConfiguration<"campaign"> {
  groups: EditFormGroup<"campaign">[] = [
    {
      sizes: { xs: 12 },
      component: CampaignInfoGroup,
      fields: [
        {
          field: "name",
          title: "",
          defaultValue: "",
          validation: [
            MinimalLengthValidator({minimalLength: 1})
          ],
          component: StringField,
        },
        {
          field: "campaign_type",
          title: "",
          defaultValue: "mute",
          validation: [],
          component: RadioEnumButton,
        },
        {
          field: "timeQueue", //TODO Изменить когда будет добавлено описание в graph
          title: "",
          defaultValue: 0,
          validation: [],
          component: QueueIntField,
          startIcon: AccessTimeIcon
        },
        {
          field: "campaign_end_type",
          title: "",
          defaultValue: "break",
          validation: [],
          component: RadioEnumButton,
        },
        {
          field: "campaign_priority",
          title: "",
          defaultValue: "higher",
          validation: [
            ValueExistsValidator({errorMessage: "pages.campaign.edit.fields.campaign-priority-enum.priority-enum-error"})
          ],
          component: EnumField,
        },
        {
          field: "campaign_low_priority_end_type",
          title: "",
          defaultValue: "break",
          validation: [],
          component: RadioEnumButton,
        },
        {
          field: "campaign_play_type",
          title: "",
          defaultValue: "continuous",
          validation: [],
          component: RadioEnumButton,
        },
        {
          field: "campaign_play_tracks_quantity",
          title: "",
          defaultValue: 1,
          validation: [
            MinimalLengthValidator({minimalLength: 1})
          ],
          component: IntField,
        },
        {
          field: "campaign_play_tracks_period_value",
          title: "",
          defaultValue: 1,
          validation: [
            MinimalLengthValidator({minimalLength: 1})
          ],
          component: IntField,
        },
        {
          field: "campaign_play_tracks_period_type",
          title: "",
          defaultValue: "minutes",
          validation: [],
          component: EnumField,
        },
        {
          field: "campaign_period_start",
          title: "",
          defaultValue: "",
          validation: [],
          component: DateField,
        },
        {
          field: "campaign_period_stop",
          title: "",
          defaultValue: "",
          validation: [],
          component: DateField,
        },
        {
          field: "campaign_all_days_start_minutes",
          title: "",
          defaultValue: "",
          validation: [],
          component: TimeField,
        },
        {
          field: "campaign_all_days_stop_minutes",
          title: "",
          defaultValue: "",
          validation: [],
          component: TimeField,
        },
        {
          field: "campaign_days_type",
          title: "",
          defaultValue: "daily",
          validation: [],
          component: RadioEnumButton,
        },
        {
          field: "days",
          title: "",
          defaultValue: "",
          validation: [],
          component: CampaignDaysGroup,
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