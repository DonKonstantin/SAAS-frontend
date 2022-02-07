import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";

export class NotificationsTemplateEditPageConfig implements EditPageConfiguration<"notifications_template"> {
    groups: EditFormGroup<"notifications_template">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.notifications_template.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
                {
                    field: "title",
                    title: "pages.notifications_template.edit.fields.title",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.notifications_template.edit.fields.level-error"}),
                    ],
                    component: StringField
                },
                {
                    field: "body",
                    title: "pages.notifications_template.edit.fields.body",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.notifications_template.edit.fields.level-error"}),
                    ],
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
