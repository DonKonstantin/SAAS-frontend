import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";
import StringField from "../../../components/EditPage/Fields/StringField";
import {
  getCurrentState,
} from "../../../context/AuthorizationContext";
import { ValueExistsValidator } from "services/validation/validators/valueExists";
import { EditProjectPlaylist } from "components/EditPageCustomFields/EditProjectPlaylist";
import CheckboxField from "components/EditPage/Fields/CheckboxField";
import VolumeSliderField from "components/EditPage/Fields/VolumeSliderField";
import { loggerFactory } from "services/logger";
import projectPlaylistService from "services/projectPlaylistService";
import { ProjectPlayListFile, ProjectPlayListFileInputObject } from 'services/projectPlaylistService/interfaces';


/**
 * Конфигурация страницы редактирования плэйлиста
 */
export class ProjectPlaylistEditPageConfig
  implements EditPageConfiguration<"project_playlist">
{
  private readonly logger = loggerFactory().make("Edit project playlist");

  groups: EditFormGroup<"project_playlist">[] = [
    {
      sizes: { xs: 12 },
      fields: [
        {
          field: "name",
          title: "",
          size: { xs: 4 },
          defaultValue: "",
          validation: [
            ValueExistsValidator({}),
          ],
          component: StringField,
        },
        {
          field: "is_overall_volume",
          title: "project-playlists.edit.field.is-overall-volume",
          size: { xs: 4 },
          defaultValue: true,
          validation: [],
          component: CheckboxField,
        },
        {
          field: "overall_volume",
          title: "",
          size: { xs: 4 },
          defaultValue: 100,
          validation: [],
          component: VolumeSliderField,
        },
        {
          field: "id",
          title: "",
          size: { xs: 4 },
          defaultValue: true,
          validation: [],
          component: CheckboxField,
          additionData: async data => {
            const playlistId = data.id;

            try {
              const files = await projectPlaylistService().getFiles(playlistId as string);

              return {
                files
              };
            } catch (error) {
              this.logger.Info("Edit playlist additional data error: ", error);

              return {};
            }
          },
          onAfterSave: async (_, values, additionData) => {
            this.logger.Info("values: ", values);
            this.logger.Info("additionData: ", additionData);

            const { project } = getCurrentState();

            const files: ProjectPlayListFileInputObject[] = additionData.id.files.map((file: ProjectPlayListFile) => ({
              id: file.id,
              volume: file.volume,
              fileId: file.file_id,
              sort: file.sort,
            }));

            this.logger.Info("files:", files)

            const playlistData = {
              id: values.id as number,
              projectId: Number(project),
              name: values.name as string,
              isOverallVolume: values.is_overall_volume as boolean,
              overallVolume: values.overall_volume as number,
              files,
            };

            try {
              await projectPlaylistService().storePlaylistChanges(playlistData);
            } catch (error) {
              this.logger.Info("error:", error)
            }
            
          },
        },
      ],
      component: EditProjectPlaylist,
    },
  ];
  schema: "project_playlist" = "project_playlist";
  listPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project-playlist",
      as: `/domain/${domain}/project/${project}/project-playlist`,
    };
  };
  isCopyEnabled: boolean = true;
  isSaveAndCloseEnabled: boolean = false;
  isSaveEnabled: boolean = false;
  editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/project-playlist/edit",
      as: `/domain/${domain}/project/${project}/project-playlist/${pk}/edit`,
    };
  };
}
