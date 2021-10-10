import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {UserConfiguration} from "../list/user";
import CreatePasswordGroup from "../../../custom/components/EditPage/CreatePasswordGroup";
import {PasswordValidator} from "../../../services/validation/validators/passwordValidator";
import {setUserPasswordService} from "../../../services/setUserPasswordService";
import UpdatePasswordGroup from "../../../custom/components/EditPage/UpdatePasswordGroup";
import {MultipleRelationWithSearchField} from "../../../components/EditPage/Fields/MultipleRelationWithSearchField";
import React from "react";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

export class UserEdit implements EditPageConfiguration<"user"> {
    groups: EditFormGroup<"user">[] = [
        {
            title: "Основные поля",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "email",
                    title: "E-mail пользователя",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "user", field: "email"})
                    ],
                    ...StringField({autoComplete: "email"}),
                },
                {
                    field: "roles_id",
                    title: "Роли пользователя",
                    defaultValue: ["2"],
                    validation: [],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_ROLES",
                        fieldCode: "roles_id",
                        targetEntityType: "Role",
                        captionFields: ["name"],
                        captionGenerator: option => `${option.fields.name}`,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "role",
                        targetSchemaDefaultValueField: `name`,
                        chipIcon: (<SupervisedUserCircleIcon />),
                    }),
                },
            ]
        },
        {
            title: "Создание пароля",
            sizes: {md: 6, xs: 12},
            isVisible: values => !values.id,
            component: CreatePasswordGroup,
            fields: [
                {
                    field: "id",
                    title: "",
                    defaultValue: "",
                    validation: [
                        PasswordValidator({}),
                    ],
                    ...StringField(),
                    additionData: async () => ({password: "", confirm: ""}),
                    disableFieldMainStore: () => true,
                    onAfterSave: async (__, _, additionData, primaryKey) => {
                        await setUserPasswordService().SetPassword(`${primaryKey}`, additionData.password)
                    },
                },
            ]
        },
        {
            title: "Изменение пароля",
            sizes: {md: 6, xs: 12},
            isVisible: values => !!values.id,
            component: UpdatePasswordGroup,
            fields: [
                {
                    field: "id",
                    title: "",
                    defaultValue: "",
                    validation: [],
                    ...StringField(),
                    additionData: async () => ({password: "", confirm: ""}),
                    disableFieldMainStore: () => true,
                },
            ]
        },
        {
            title: "Личные данные",
            sizes: {xs: 12},
            fields: [
                {
                    field: "first_name",
                    title: "Имя",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2})
                    ],
                    ...StringField(),
                },
                {
                    field: "last_name",
                    title: "Фамилия",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2})
                    ],
                    ...StringField(),
                },
            ]
        },
    ];
    schema: "user" = "user";
    editAccessRules: string[] = ["CHANGE_USERS", "READ_USERS"];
    listPageUrl: PageUrl = {href: "/user"};
    listPageConfig: ListPageConfiguration<"user"> = new UserConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/user/edit/${primaryKey}`, href: `/user/edit/[entityId]`});
    entityName: string = "Пользователь";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание пользователя`
        }

        return `Редактирование пользователя №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание пользователя`
        }

        return `Редактирование пользователя №${primaryKey}`
    };

    isCopyEnabled: boolean = false;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}