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
import PlaylistProjectCell from "components/ListPageCustom/PlaylistProjectCell";
import PlaylistHeaderActions from "components/ListPageCustom/PlaylistHeaderActions";
import PlaylistActions from "components/ListPageCustom/PlaylistActions";

/**
 * Конфигурация листинга плейлистов
 */
export class PlaylistListingConfiguration
  implements ListPageConfiguration<"project_playlist">
{
  filter: FilterFieldsConfiguration<"project_playlist"> = {};
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
      project_id: {
        field: "project_id",
        title: "project-playlists.list.header.project",
        isEnabled: true,
        isHidden: false,
        fieldType: {
          config: undefined,
          type: "Simple",
          customComponent: PlaylistProjectCell
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
    additionDataLoader: async ([rows]) => {
      const logger = loggerFactory().make("Playlist listing additional data");

      console.log(rows, "useEntityList rows");

      try {
        //@ts-ignore
        const playlistIDs = rows.map(row => row.id) as string[];

        //@ts-ignore
        const projectIds = rows.map(row => row.id) as string[];

        const playlistFiles = await projectPlaylistService().getFiles(playlistIDs);

        const playlistProjects = await projectPlaylistService().getProjects(projectIds);

        logger.Debug(
          "Playlist listing files response: ",
          playlistFiles
        );

        logger.Debug(
          "Playlist listing projects response: ",
          playlistProjects
        );

        return {playlistFiles, playlistProjects};
      } catch (error) {
        logger.Error("Playlist listing additional data error: ", error);

        return [];
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
