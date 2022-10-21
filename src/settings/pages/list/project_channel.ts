import {
  EditPageLinkGenerator,
  ListPageConfiguration,
  PageUrl,
} from "../system/list";
import { getCurrentState } from "context/AuthorizationContext";
import { FilterFieldsConfiguration } from "services/listDataLoader/filterLoader/types";
import { ListFieldsConfiguration } from "services/listDataLoader/listLoader/types";
import PlayerCodeActions from "components/ListPageCustom/PlayerCodeActions";
import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import { ListRowProps } from "components/ListPageParts/List/ListBody/ListRow";
import { FC } from "react";
import PlayerCodeRow from "components/ListPageCustom/PlayerCodeRow";
import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import { loggerFactory } from "services/logger";
import { playerCodeService } from "services/playerCodeService";
import ActivePlayersProjectChannel from "components/ListPageCustom/ProjectChannel/ActivePlayersProjectChannel";

/**
 * Конфигурация листинга кодов плееров
 */
export class ProjectChannelListingConfiguration
  implements ListPageConfiguration<"project_channel">
{
  filter: FilterFieldsConfiguration<"project_channel"> = {
   /* code: {
      field: "code",
      filterType: "Like",
      schema: "player_code",
      title: "project_channel.list.headers.code",
    },
    is_active: {
      field: "is_active",
      filterType: "Switch",
      schema: "player_code",
      title: "project_channel.list.headers.is_active",
    },*/
  };
  listFields: ListFieldsConfiguration<"project_channel"> = {
    fields: {
      name: {
        field: "name",
        title: "pages.project_channel.list.headers.name",
        isEnabled: true,
        width: 233,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      is_active: {
        field: "is_active",
        title: "pages.project_channel.list.headers.is_active",
        isEnabled: true,
        align: "left",
        fieldType: {
          config: undefined,
          type: "Simple",
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
  };
  schema: "project_channel" = "project_channel";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project_channel/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/project_channel/edit/${pk}`,
    };
  };
  addPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project_channel/add",
      as: `/domain/${domain}/project/${project}/project_channel/add`,
    };
  };
  hidePagination = true;
}
