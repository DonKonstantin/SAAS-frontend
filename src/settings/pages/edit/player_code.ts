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
import { ProjectChannel } from "services/playerCodeService/interfaces";

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
              // const checkResult = await playerCodeService().getChannels(
              //   project
              // );

              const checkResult: ProjectChannel[] = [
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test",
                  id: "1",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 2",
                  id: "2",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 3",
                  id: "3",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 4",
                  id: "4",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 5",
                  id: "5",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 6",
                  id: "6",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 7",
                  id: "7",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 8",
                  id: "8",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 9",
                  id: "9",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 10",
                  id: "10",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 11",
                  id: "12",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 12",
                  id: "13",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 13",
                  id: "14",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 14",
                  id: "15",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 15",
                  id: "16",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 16",
                  id: "17",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 17",
                  id: "18",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 18",
                  id: "19",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 19",
                  id: "20",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 20",
                  id: "21",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 21",
                  id: "22",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 22",
                  id: "23",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 23",
                  id: "24",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Test 24",
                  id: "25",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Fest 25",
                  id: "26",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Fest 26",
                  id: "27",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Fest 27",
                  id: "28",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Sest 28",
                  id: "29",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Sest 29",
                  id: "30",
                },
                {
                  is_active: true,
                  project_id: "1",
                  name: "Aest 30",
                  id: "31",
                },
              ];

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
          defaultValue: this.projectId,
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
      href: "/domain/[domainId]/project/[projectId]/player-code/",
      as: `/domain/${domain}/project/${project}/player-code/`,
    };
  };
  isCopyEnabled: boolean = true;
  isSaveAndCloseEnabled: boolean = true;
  isSaveEnabled: boolean = true;
  editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/player-code/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/player-code/edit/${pk}`,
    };
  };
}
