import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";
import { getCurrentState } from "../../../context/AuthorizationContext";
import HeaderField from "components/EditPage/Fields/HeaderField";
import AdditionalDataPassportSelector from "components/EditPage/Fields/AdditionalDataPassportSelector";
import { playerListService } from "services/playerList";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import DividerField from "components/EditPage/Fields/DividerField";
import PlayerSaveButtonField from "components/EditPage/Fields/PlayerSaveButtonField";

/**
 * Конфигурация страницы редактирования плеера
 */
export class PlayerEditPageConfiguration
  implements EditPageConfiguration<"player">
{
  private readonly logger: Logger = loggerFactory().make(`PlayerListService`);

  groups: EditFormGroup<"player">[] = [
    {
      sizes: { xs: 12 },
      fields: [
        {
          field: "id",
          title: "player-list.edit.field-header",
          size: { xs: 4 },
          defaultValue: "",
          validation: [],
          component: HeaderField,
        },
        {
          field: "project_id",
          title: "",
          size: { xs: 8 },
          defaultValue: "",
          validation: [],
          component: AdditionalDataPassportSelector,
          additionData: async (data) => {
            const { project } = getCurrentState();

            this.logger.Debug("ID плеера: ", data.id);

            this.logger.Debug("ID проекта: ", project);

            const platerObjectPassport =
              await playerListService().loadPlayerObjectPassport(
                data.id as string
              );

            const playerObjectPassports =
              await playerListService().loadPlayerObjectPassports(project);

            this.logger.Debug(
              "Паспорт привязанный к плееру: ",
              platerObjectPassport
            );

            this.logger.Debug(
              "Паспорта доступные для привязки к плееру: ",
              playerObjectPassports
            );

            return {
              platerObjectPassport,
              playerObjectPassports,
            };
          },
        },
        {
          field: "",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: DividerField,
        },
        {
          field: "",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: PlayerSaveButtonField,
        },
      ],
    },
  ];
  schema: "player" = "player";
  listPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-list",
      as: `/domain/${domain}/project/${project}/player-list`,
    };
  };
  isCopyEnabled: boolean = false;
  isSaveAndCloseEnabled: boolean = false;
  isSaveEnabled: boolean = false;
  editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-list/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/player-list/edit/${pk}`,
    };
  };
}
