import ChanelsMultiselector from "components/EditPage/Fields/ChanelsMultiselector";
import HiddenField from "components/EditPage/Fields/HiddenField";
import PlayerCodeField from "components/EditPage/Fields/PlayerCodeField";
import PlayerCodeStatus from "components/EditPage/Fields/PlayerCodeStatus";
import TimeField from "components/EditPage/Fields/TimeField";
import PlayerCodeAddComponent from "components/EditPageCustomFields/PlayerCodeAddComponent";
import { getCurrentState } from "context/AuthorizationContext";
import { loggerFactory } from "services/logger";
import { playerCodeService } from "services/playerCodeService";
import { EmptyArrayValidator } from "services/validation/validators/emptyArrayValidator";
import { MinimalLengthValidator } from "services/validation/validators/minimalLength";
import { ValueExistsValidator } from "services/validation/validators/valueExists";
import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";

export class PlayerCodeEditPageConfig
  implements EditPageConfiguration<"player_code">
{
  readonly projectId = getCurrentState().project;

  groups: EditFormGroup<"player_code">[] = [
    {
      sizes: { xs: 12 },
      fields: [
        {
          field: "open_time",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: TimeField,
        },
        {
          field: "close_time",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: TimeField,
        },
        {
          field: "reload_time",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: TimeField,
        },
        {
          field: "code",
          title: "",
          size: { xs: 12 },
          defaultValue: "",
          validation: [
            MinimalLengthValidator({
              minimalLength: 3,
              errorMessage: "player-codes.add.validation.minimal-length",
            }),
          ],
          component: PlayerCodeField,
        },
        {
          field: "is_active",
          title: "",
          size: { xs: 12 },
          defaultValue: true,
          validation: [],
          component: PlayerCodeStatus,
        },
        {
          field: "project_channels",
          title: "",
          size: { xs: 12 },
          defaultValue: [],
          validation: [EmptyArrayValidator({})],
          component: ChanelsMultiselector,
          additionData: async () => {
            const logger = loggerFactory().make("Edit player code");

            const { project } = getCurrentState();

            try {
              const checkResult = await playerCodeService().getChannels(
                project
              );

              logger.Debug(
                "Edit player code addition data response: ",
                checkResult
              );

              return checkResult;
            } catch (error) {
              logger.Error("Edit player code addition data error: ", error);

              return [];
            }
          },
        },
        {
          field: "project_id",
          title: "",
          size: { xs: 12 },
          defaultValue: "13",
          validation: [],
          component: HiddenField,
        },
      ],
      component: PlayerCodeAddComponent,
    },
  ];
  schema: "player_code" = "player_code";
  listPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-codes/",
      as: `/domain/${domain}/project/${project}/player-codes/`,
    };
  };
  isCopyEnabled: boolean = true;
  isSaveAndCloseEnabled: boolean = true;
  isSaveEnabled: boolean = true;
  editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-codes/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/player-codes/edit/${pk}`,
    };
  };
}
