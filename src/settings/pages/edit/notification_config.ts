import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import SwitchField from "../../../components/EditPage/Fields/SwitchField";
import EnumField from "../../../components/EditPage/Fields/EnumField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import notificationTemplateServiceFactory from "../../../services/NotificationTemplateService";
import NotificationConfigTemplate
    from "../../../components/EditPageCustomFields/NotificationConfig/NotificationConfigTemplate";

export class NotificationConfigEditPageConfig implements EditPageConfiguration<"notification_config"> {
    groups: EditFormGroup<"notification_config">[] = [
        {
            sizes: {xs: 12, lg: 6},
            fields: [
                {
                    field: "id",
                    title: "pages.notification_config.edit.fields.id",
                    size: {xs: 12},
                    defaultValue: "",
                    disableFieldMainStore: () => true,
                    validation: [],
                    component: StringField,
                    isVisible: () => false,
                    additionData: async () => {
                        const availableTemplates = await notificationTemplateServiceFactory().loadAll();

                        return {
                            availableTemplates
                        }
                    }
                },
                {
                    field: "entity",
                    title: "pages.notification_config.edit.fields.entity",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: EnumField
                },
                {
                    field: "event_type",
                    title: "pages.notification_config.edit.fields.event_type",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: EnumField
                },
                {
                    field: "template_id",
                    title: "pages.notification_config.edit.fields.template_id",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.notification_config.edit.fields-error.template_id"})
                    ],
                    component: NotificationConfigTemplate
                },
                {
                    field: "channel",
                    title: "pages.notification_config.edit.fields.channel",
                    size: {xs: 12, md: 6},
                    defaultValue: "mail",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.users.edit.fields.roles_id-error"}),
                    ],
                    component: EnumField
                },
                {
                    field: "is_active",
                    title: "pages.notification_config.edit.fields.is_active",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: SwitchField
                },
            ]
        },
    ];
    schema: "notification_config" = "notification_config";
    listPageUrl: PageUrl = {href: "/notification-rules"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/notification-rules/edit/[entityId]",
        as: `/notification-rules/edit/${pk}`
    });
}
