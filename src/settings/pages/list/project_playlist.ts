import {
  EditPageLinkGenerator,
  ListPageConfiguration,
  PageUrl,
} from "../system/list";
import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import { getCurrentState } from "context/AuthorizationContext";
import { FilterFieldsConfiguration } from "services/listDataLoader/filterLoader/types";
import { ListFieldsConfiguration } from "services/listDataLoader/listLoader/types";
import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import { loggerFactory } from "services/logger";
import projectPlaylistService from "services/projectPlaylistService";
import PlaylistCampaignsCell from "components/ListPageCustom/PlaylistCampaignsCell";
import PlaylistHeaderActions from "components/ListPageCustom/PlaylistHeaderActions";
import PlaylistActions from "components/ListPageCustom/PlaylistActions";
import PlailistCampignsField from "components/ListPageParts/Filter/PlailistCampignsField";
import CampaignDataField from "components/ListPageCustom/CampaignDataField";

/**
 * Конфигурация листинга плейлистов
 */
export class PlaylistListingConfiguration
  implements ListPageConfiguration<"project_playlist">
{
  filter: FilterFieldsConfiguration<"project_playlist"> = {
    name: {
      field: "name",
      filterType: "Like",
      schema: "project_playlist",
      title: "project-playlists.list.filter.name",
    },
    id: {
      field: "id",
      filterType: "VariantsSelectorFloat",
      schema: "project_playlist",
      title: "project-playlists.list.filter.campaign",
      customComponent: PlailistCampignsField,
    },
    created_at: {
      field: "created_at",
      filterType: "DateTimeRange",
      schema: "project_playlist",
      title: "project-playlists.list.filter.created-at",
    },
    updated_at: {
      field: "updated_at",
      filterType: "DateTimeRange",
      schema: "project_playlist",
      title: "project-playlists.list.filter.updated-at",
    },
  };
  listFields: ListFieldsConfiguration<"project_playlist"> = {
    fields: {
      name: {
        field: "name",
        title: "project-playlists.list.header.name",
        isEnabled: true,
        isHidden: false,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      id: {
        field: "id",
        title: "project-playlists.list.header.campaign",
        isEnabled: true,
        isHidden: false,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlaylistCampaignsCell,
        },
      },
      created_at: {
        field: "created_at",
        title: "project-playlists.list.header.created-at",
        isEnabled: true,
        isHidden: false,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: CampaignDataField,
        },
      },
      updated_at: {
        field: "updated_at",
        title: "project-playlists.list.header.updated-at",
        isEnabled: true,
        isHidden: false,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: CampaignDataField,
        },
      },
      duration: {
        field: "duration",
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
      is_overall_volume: {
        field: "is_overall_volume",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      overall_volume: {
        field: "overall_volume",
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
    additionDataLoader: async (rows) => {
      const logger = loggerFactory().make("Playlist listing additional data");

      //@ts-ignore
      const playlistsId = rows.map(
        (row) => row.columnValues.id.value
      ) as string[];

      if (!playlistsId.length) {
        return null;
      }

      try {
        const playlistCampaigns = await projectPlaylistService().getCampaigns(
          playlistsId
        );

        logger.Debug("Playlist listing projects response: ", playlistCampaigns);

        return { playlistCampaigns };
      } catch (error) {
        logger.Error("Playlist listing additional data error: ", error);

        return null;
      }
    },
  };
  schema: "project_playlist" = "project_playlist";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project-playlist/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/project-playlist/edit/${pk}`,
    };
  };
  addPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project-playlist/add",
      as: `/domain/${domain}/project/${project}/project-playlist/add`,
    };
  };
  hidePagination = false;
  hideFilter = false;
  action: React.ComponentType<ListHeaderProps> = PlaylistActions;
  headerActions: React.ComponentType<ListHeaderProps> = PlaylistHeaderActions;
}
