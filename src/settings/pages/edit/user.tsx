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
                        await setUserPasswordService().SetPassword(`${primaryKey}`, additionData.id.password)
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
            fields: [
                {
                    field: "roles_id",
                    title: "",
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.users.edit.fields.roles_id-error"}),
                    ],
                    component: HiddenField
                },
            ]
        },
    ];
    schema: "user" = "user";
    listPageUrl: PageUrl = {href: "/users"};
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = primaryKey => ({
        as: `/users/edit/${primaryKey}`,
        href: `/users/edit/[entityId]`
    });
    isCopyEnabled: boolean = false;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}