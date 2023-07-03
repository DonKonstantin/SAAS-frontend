import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {PasswordValidator} from "../../../services/validation/validators/passwordValidator";
import {setUserPasswordService} from "../../../services/setUserPasswordService";
import CheckboxField from "../../../components/EditPage/Fields/CheckboxField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import HiddenField from "../../../components/EditPage/Fields/HiddenField";
import {PageUrl} from "../system/list";
import StringField from "../../../components/EditPage/Fields/StringField";
import UserCreatePasswordGroup from "../../../components/EditPageCustomFields/UserCreatePasswordGroup";
import UserInfoGroup from "../../../components/EditPageCustomFields/UserInfoGroup";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import UserUpdatePasswordGroup from "../../../components/EditPageCustomFields/UserUpdatePasswordGroup";
import {allRoles} from "../../../services/loaders/allRoles";
import UserRolesGroup from "../../../components/EditPageCustomFields/UserRolesGroup";
import {allDomainsAndProjectsLoader} from "../../../services/loaders/allDomainsAndProjects";
import {getCurrentState} from "../../../context/AuthorizationContext";

export class UserEditPageConfig implements EditPageConfiguration<"user"> {
    groups: EditFormGroup<"user">[] = [
        {
            sizes: {md: 6, xs: 12},
            component: UserInfoGroup,
            fields: [
                {
                    field: "first_name",
                    title: "pages.users.edit.fields.first_name",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2})
                    ],
                    component: StringField,
                    startIcon: PersonIcon,
                },
                {
                    field: "last_name",
                    title: "pages.users.edit.fields.last_name",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2})
                    ],
                    component: StringField,
                    startIcon: PersonIcon,
                },
                {
                    field: "email",
                    title: "pages.users.edit.fields.email",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "user", field: "email"})
                    ],
                    component: StringField,
                    startIcon: EmailIcon,
                },
                {
                    field: "active",
                    title: "pages.users.edit.fields.active",
                    defaultValue: true,
                    validation: [],
                    component: CheckboxField,
                },
            ]
        },
        {
            sizes: {md: 6, xs: 12},
            isVisible: values => !values.id,
            component: UserCreatePasswordGroup,
            fields: [
                {
                    field: "id",
                    title: "",
                    defaultValue: "",
                    validation: [
                        PasswordValidator({}),
                    ],
                    component: HiddenField,
                    additionData: async () => ({password: "", confirm: ""}),
                    disableFieldMainStore: () => true,
                    onAfterSave: async (__, _, additionData, primaryKey) => {
                        await setUserPasswordService().CreatePassword(`${primaryKey}`, additionData.id.password)
                    },
                },
            ]
        },
        {
            sizes: {md: 6, xs: 12},
            isVisible: values => !!values.id,
            component: UserUpdatePasswordGroup,
            fields: [
                {
                    field: "id",
                    title: "",
                    defaultValue: "",
                    validation: [],
                    component: HiddenField,
                    additionData: async () => ({password: "", confirm: ""}),
                    disableFieldMainStore: () => true,
                },
            ]
        },
        {
            sizes: {xs: 12},
            component: UserRolesGroup,
            fields: [
                {
                    field: "roles_id",
                    title: "",
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.users.edit.fields.roles_id-error"}),
                    ],
                    component: HiddenField,
                    additionData: async () => {
                        const [roles, domains] = await Promise.all([
                            allRoles().Load(),
                            allDomainsAndProjectsLoader().Load()
                        ])

                        return {
                            roles: roles.roles,
                            domains: domains.domains,
                            projects: domains.projects,
                        }
                    }
                },
            ]
        },
    ];
    schema: "user" = "user";
    listPageUrl: PageUrl = {href: "/users"};
    isCopyEnabled: boolean = false;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;

    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => {
        const {domain, project, menuType} = getCurrentState()
        switch (true) {
            case menuType === `project`:
                return {
                    href: "/domain/[domainId]/project/[projectId]/users/edit/[entityId]",
                    as: `/domain/${domain}/project/${project}/users/edit/${pk}`
                }
            case menuType === `domain`:
                return {
                    href: "/domain/[domainId]/users/edit/[entityId]",
                    as: `/domain/${domain}/users/edit/${pk}`
                }
            default:
                return {
                    href: "/users/edit/[entityId]",
                    as: `/users/edit/${pk}`
                }
        }
    };
}