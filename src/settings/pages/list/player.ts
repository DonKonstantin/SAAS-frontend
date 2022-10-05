import {
  EditPageLinkGenerator,
  ListPageConfiguration,
  PageUrl,
} from "../system/list";
import { FilterFieldsConfiguration } from "../../../services/listDataLoader/filterLoader/types";
import {
  ListFieldRow,
  ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import { getCurrentState } from "context/AuthorizationContext";
import { playerListService } from "services/playerList";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import EmptyActions from "components/ListPageCustom/EmptyActions";
import PlayerStatusCell from "components/ListPageCustom/PlayerStatusCell";
import PlayerChannelCell from "components/ListPageCustom/PlayerChannelCell";
import PlayerUploadingStatus from "components/ListPageCustom/PlayerUploadingStatus";
import PlayerLastUpdateCell from "components/ListPageCustom/PlayerLastUpdateCell";

/**
 * Конфигурация листинга плееров
 */
export class PlayersListingConfiguration
  implements ListPageConfiguration<"player">
{
  private readonly logger: Logger = loggerFactory().make(`PlayerListService`);

  filter: FilterFieldsConfiguration<"player"> = {
    name: {
      field: "name",
      filterType: "Like",
      schema: "player",
      title: "player-list.list.header.name",
    },
    is_active: {
      field: "is_active",
      filterType: "Switch",
      schema: "player",
      title: "player-list.list.header.is-active",
    },
    last_update: {
      field: "last_update",
      filterType: "DateTimeRange",
      schema: "player",
      title: "player-list.list.header.last-update",
    },
  };
  listFields: ListFieldsConfiguration<"player"> = {
    fields: {
      id: {
        field: "id",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      name: {
        field: "name",
        title: "player-list.list.header.name",
        isEnabled: true,
        width: 230,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      is_active: {
        field: "is_active",
        title: "player-list.list.header.is-active",
        isEnabled: true,
        align: 'left',
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlayerStatusCell,
        },
      },
      last_update: {
        field: "last_update",
        title: "player-list.list.header.last-update",
        isEnabled: true,
        align: 'left',
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlayerLastUpdateCell,
        },
      },
      project_id: {
        field: "project_id",
        title: "player-list.list.header.project-id",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlayerChannelCell,
        },
      },
      guid: {
        field: "guid",
        title: "player-list.list.header.uploading-status",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlayerUploadingStatus,
        },
      },
    },
    actions: ListPageEditDeleteButtons,
    additionDataLoader: async (listData: ListFieldRow<"player">[]) => {
      this.logger.Info(listData, "listData");
      
      const playerIDs = listData.map(item => item.columnValues.id.value);

      const { project } = getCurrentState();

      if (!playerIDs.length) {
        return {};
      }

      const campaigns = playerListService().getCampaigns(playerIDs, project);

      return {
        campaigns,
      };
      
    }
  };
  schema: "player" = "player";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-list/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/player-list/edit/${pk}`,
    };
  };
  addPageUrl: PageUrl = { href: "" };
  action: React.ComponentType<ListHeaderProps> = EmptyActions;
}
