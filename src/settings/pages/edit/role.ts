import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import HiddenField from "../../../components/EditPage/Fields/HiddenField";
import {allDomainsAndProjectsLoader} from "../../../services/loaders/allDomainsAndProjects";
import {allPermissions} from "../../../services/loaders/allPermissions";
import {allPermissionCategories} from "../../../services/loaders/allPermissionCategories";
import LevelCheckSelector from "../../../components/EditPageCustomFields/LevelCheckSelector";
import PermissionChooseSelector from "../../../components/EditPageCustomFields/PermissionChooseSelector";
import LevelCheckSelectorGroup from "../../../components/EditPageCustomFields/LevelCheckSelectorGroup";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";

export class RoleEditPageConfig implements EditPageConfiguration<"role"> {
    groups: EditFormGroup<"role">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.role.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "project", field: "name"}),
                    ],
                    component: StringField
                },
            ]
        },
        {
            sizes: {xs: 12},
            component: LevelCheckSelectorGroup,
            fields: [
                {
                    field: "level",
                    title: "",
                    size: {xs: 12},
                    defaultValue: "project",
                    disableFieldMainStore: () => true,
                    validation: [],
                    component: HiddenField
                },
                {
                    field: "structure_item_id",
                    title: "",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.role.edit.fields.structure_item_id-error"}),
                    ],
                    component: LevelCheckSelector,
                    additionData: async () => {
                        return await allDomainsAndProjectsLoader().Load()
                    }
                },
            ]
        },
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "permissions_id",
                    title: "",
                    size: {xs: 12},
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.role.edit.fields.permissions_id-error"}),
                    ],
                    component: PermissionChooseSelector,
                    additionData: async () => {
                        const [permissions, categories] = await Promise.all([
                            allPermissions().Load(),
                            allPermissionCategories().Load()
                        ])

                        return {
                            permissions: permissions.permissions,
                            categories: categories.categories,
                        }
                    }
                },
            ]
        },
    ];
    schema: "role" = "role";
    listPageUrl: PageUrl = {href: "/roles"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/roles/edit/[entityId]",
        as: `/roles/edit/${pk}`
    });
}