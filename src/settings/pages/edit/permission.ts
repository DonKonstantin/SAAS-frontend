import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import {allPermissionCategories} from "../../../services/loaders/allPermissionCategories";
import PermissionCategorySelector from "../../../components/EditPageCustomFields/PermissionCategorySelector";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";

export class PermissionEditPageConfig implements EditPageConfiguration<"permission"> {
    groups: EditFormGroup<"permission">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.permission.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                    ],
                    component: StringField
                },
                {
                    field: "code",
                    title: "pages.permission.edit.fields.code",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "permission", field: "code"})
                    ],
                    component: StringField
                },
                {
                    field: "category_id",
                    title: "pages.permission.edit.fields.category_id",
                    size: {xs: 12},
                    defaultValue: "1",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.permission.edit.fields.category_id-error"}),
                    ],
                    component: PermissionCategorySelector,
                    additionData: async () => {
                        return await allPermissionCategories().Load()
                    }
                },
            ]
        },
    ];
    schema: "permission" = "permission";
    listPageUrl: PageUrl = {href: "/permission"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/permission/edit/[entityId]",
        as: `/permission/edit/${pk}`
    });
}