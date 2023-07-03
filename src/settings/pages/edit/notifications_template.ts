import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import CCEEditorWithoutSSR from "../../../components/EditPage/Fields/CCEEditorWithoutSSR";
import NotificationsTemplatesPreview from "../../../components/EditPageCustomParts/Notifications/NotificationsTemplatesPreview";

export class NotificationsTemplateEditPageConfig implements EditPageConfiguration<"notifications_template"> {
    groups: EditFormGroup<"notifications_template">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.notifications_template.edit.fields.name",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
                {
                    field: "title",
                    title: "pages.notifications_template.edit.fields.title",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
                {
                    field: "recipient",
                    title: "pages.notifications_template.edit.fields.recipient",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
            ]
        },
        {
            sizes: {xs: 12, lg: 6},
            fields: [
                {
                    field: "body",
                    title: "pages.notifications_template.edit.fields.body",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [],
                    component: CCEEditorWithoutSSR
                },
            ]
        },
        {
            sizes: {xs: 12, lg: 6},
            component: NotificationsTemplatesPreview,
            fields: [
                {
                    field: "id",
                    title: "pages.notifications_template.edit.fields.recipient",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [],
                    disableFieldMainStore: () => true,
                    component: StringField
                },
            ]
        },
    ];
    schema: "notifications_template" = "notifications_template";
    listPageUrl: PageUrl = {href: "/notifications-template"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/notifications-template/edit/[entityId]",
        as: `/notifications-template/edit/${pk}`
    });
}
