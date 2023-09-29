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

/**
 * Конфигурация листинга кодов плееров
 */
export class PlayerCodeListingConfiguration
  implements ListPageConfiguration<"player_code">
{
  filter: FilterFieldsConfiguration<"player_code"> = {
    code: {
      field: "code",
      filterType: "Like",
      schema: "player_code",
      title: "player-codes.list.headers.code",
    },
    is_active: {
      field: "is_active",
      filterType: "Switch",
      schema: "player_code",
      title: "player-codes.list.headers.is_active",
    },
  };
  listFields: ListFieldsConfiguration<"player_code"> = {
    fields: {
      close_time: {
        field: "close_time",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      code: {
        field: "code",
        title: "player-codes.list.headers.code",
        isEnabled: true,
        width: 233,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      is_active: {
        field: "is_active",
        title: "player-codes.list.headers.is_active",
        isEnabled: true,
        width: 233,
        align: "left",
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      open_time: {
        field: "open_time",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      project_id: {
        field: "project_id",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      reload_time: {
        field: "reload_time",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
    },
    actions: ListPageEditDeleteButtons,
    additionDataLoader: async (listData) => {
      const logger = loggerFactory().make("Edit player code");

      const { project } = getCurrentState();

      const playerCodeKeys = listData.map((item) => item.primaryKeyValue);

      if (!playerCodeKeys.length) {
        return [];
      }

      try {
        const checkResult = await playerCodeService().getPlayersForPlayerCodes(
          project,
          playerCodeKeys
        );

        logger.Debug("Edit player code addition data response: ", checkResult);

        return checkResult;
      } catch (error) {
        logger.Error("Edit player code addition data error: ", error);

        return [];
      }
    },
  };
  schema: "player_code" = "player_code";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-code/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/player-code/edit/${pk}`,
    };
  };
  addPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-code/add",
      as: `/domain/${domain}/project/${project}/player-code/add`,
    };
  };
  hidePagination = false;
  action: React.ComponentType<ListHeaderProps> = PlayerCodeActions;
  customRow: FC<ListRowProps> = PlayerCodeRow;
}
