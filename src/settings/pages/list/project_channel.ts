import {
  EditPageLinkGenerator,
  ListPageConfiguration,
  PageUrl,
} from "../system/list";
import { getCurrentState } from "context/AuthorizationContext";
import { FilterFieldsConfiguration } from "services/listDataLoader/filterLoader/types";
import { ListFieldsConfiguration } from "services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import ActivePlayersProjectChannel from "components/ListPageCustom/ProjectChannel/ActivePlayersProjectChannel";
import NameWithToggleCell from "../../../components/ListPageCustom/ProjectChannel/NameWithToggleCell";
import ProjectChannelPlayers from "../../../components/ListPageCustom/ProjectChannel/ProjectChannelPlayers";
import EmptyCell from "../../../components/ListPageCustom/EmptyCell";

/**
 * Конфигурация листинга кодов плееров
 */
export class ProjectChannelListingConfiguration
  implements ListPageConfiguration<"project_channel">
{
  filter: FilterFieldsConfiguration<"project_channel"> = {
    code: {
      field: "name",
      filterType: "Like",
      schema: "project_channel",
      title: "pages.project_channel.list.headers.name",
    },
    is_active: {
      field: "is_active",
      filterType: "Switch",
      schema: "project_channel",
      title: "pages.project_channel.list.headers.is_active",
    }
  };
  listFields: ListFieldsConfiguration<"project_channel"> = {
    fields: {
      id: {
        field: "id",
        title: "pages.project_channel.list.headers.id",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Hidden",
        },
      },
      name: {
        field: "name",
        title: "pages.project_channel.list.headers.name",
        isEnabled: true,
        width: 233,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: NameWithToggleCell
        },
      },
      is_active: {
        field: "is_active",
        title: "pages.project_channel.list.headers.is_active",
        isEnabled: true,
        align: "left",
        width: 233,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: EmptyCell
        },
      },
      players: {
        field: "players",
        title: "pages.project_channel.list.headers.players",
        isEnabled: true,
        align: "left",
        fieldType: {
          config: {
            relatedScheme: "Player_Without_Relations"
          },
          type: "Schema",
          customComponent: ActivePlayersProjectChannel
        },
      }
    },
    actions: ListPageEditDeleteButtons,
    rowHigher: ProjectChannelPlayers,
    defaultSortField: "name",
  };
  schema: "project_channel" = "project_channel";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/channel/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/channel/edit/${pk}`,
    };
  };
  addPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/channel/add",
      as: `/domain/${domain}/project/${project}/channel/add`,
    };
  };
  hidePagination = true;

}
