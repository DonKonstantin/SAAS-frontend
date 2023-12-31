import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {getCurrentState} from "../../../context/AuthorizationContext";
import ProjectChannelGroup from "../../../components/EditPageCustomFields/project_channel/ProjectChannelGroup";
import ProjectStatusField from "../../../components/EditPageCustomFields/project_channel/ProjectStatusField";
import StringFieldWithoutLabel from "../../../components/EditPage/Fields/StringFieldWithoutLabel";
import HiddenField from "components/EditPage/Fields/HiddenField";

export class ProjectChannelEditPageConfig implements EditPageConfiguration<"project_channel"> {
    groups: EditFormGroup<"project_channel">[] = [
        {
            sizes: {xs: 12},
            component: ProjectChannelGroup,
            fields: [
                {
                    field: "name",
                    title: "pages.project_channel.edit.fields.name",
                    size:{xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "project_channel", field: "name"}),
                    ],
                    component: StringFieldWithoutLabel,
                },
                {
                    field: "is_active",
                    title: "pages.project_channel.edit.fields.is_active",
                    size: {xs: 12},
                    defaultValue: true,
                    validation: [],
                    component: ProjectStatusField
                },
                {
                    field: "project_id",
                    title: "pages.project_channel.edit.fields.project_id",
                    size: {xs: 12},
                    defaultValue: async () => {
                        const {project} = getCurrentState();

                        return project
                    },
                    validation: [],
                    component: StringFieldWithoutLabel,
                },
                {
                  field: "updated_at",
                  title: "",
                  defaultValue: new Date(),
                  validation: [],
                  component: HiddenField,
              },
            ]
        },
    ];
    schema: "project_channel" = "project_channel";
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    listPageUrl: { (): PageUrl } = () => {
        const { domain, project } = getCurrentState();

        return {
            href: "/domain/[domainId]/project/[projectId]/channel/",
            as: `/domain/${domain}/project/${project}/channel/`,
        };
    };
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
        const { domain, project } = getCurrentState();

        return {
            href: "/domain/[domainId]/project/[projectId]/channel/edit/[entityId]",
            as: `/domain/${domain}/project/${project}/channel/edit/${pk}`,
        };
    };
}
