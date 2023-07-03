import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import EnumField from "../../../components/EditPage/Fields/EnumField";

export class PermissionCategoryEditPageConfig implements EditPageConfiguration<"permission_category"> {
    groups: EditFormGroup<"permission_category">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.permission_category.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
                {
                    field: "level",
                    title: "pages.permission_category.edit.fields.level",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.permission_category.edit.fields.level-error"}),
                    ],
                    component: EnumField
                },
            ]
        },
    ];
    schema: "permission_category" = "permission_category";
    listPageUrl: PageUrl = {href: "/permission-category"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/permission-category/edit/[entityId]",
        as: `/permission-category/edit/${pk}`
    });
}