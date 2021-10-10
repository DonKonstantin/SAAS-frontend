import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {RoleConfiguration} from "../list/role";
import {MultipleRelationList} from "../../../components/EditPage/Fields/MultipleRelationList";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";

export class RoleEdit implements EditPageConfiguration<"role"> {
    groups: EditFormGroup<"role">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "code",
                    title: "Символьны код",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "role", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код роли. Используется для нужд системы.`,
                    }),
                },
                {
                    field: "name",
                    title: "Название роли",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 5})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название роли. Используется для понятного представления ролей в админке.`,
                    }),
                },
            ]
        },
        {
            title: "Разрешения",
            sizes: {xs: 12},
            fields: [
                {
                    field: "permissions_id",
                    title: "Разрешения роли",
                    defaultValue: [],
                    validation: [],
                    ...MultipleRelationList({
                        captionFields: ["name", "code"],
                        captionGenerator: option => `${option.name} (${option.code})`,
                        primaryKey: "id",
                        schema: "permission"
                    }),
                },
            ]
        },
    ];
    schema: "role" = "role";
    editAccessRules: string[] = ["CHANGE_ROLES", "READ_ROLES"];
    listPageUrl: PageUrl = {href: "/role"};
    listPageConfig: ListPageConfiguration<"role"> = new RoleConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/role/edit/${primaryKey}`, href: `/role/edit/[entityId]`});
    entityName: string = "Роль";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание роли пользователя`
        }

        return `Редактирование роли пользователя №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание роли пользователя`
        }

        return `Редактирование роли пользователя №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}