import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {PermissionConfiguration} from "../list/permission";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {TextareaField} from "../../../components/EditPage/Fields/TextareaField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";

export class PermissionEdit implements EditPageConfiguration<"permission"> {
    groups: EditFormGroup<"permission">[] = [
        {
            title: "Системные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "code",
                    title: "Символьны код",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 5}),
                        UniqueValueInColumnValidator({schema: "permission", field: "code"})
                    ],
                    ...StringField({tooltip: `Символьный код разрешения. Используется для нужд системы.`}),
                },
            ]
        },
        {
            title: "Описание",
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "Название (описание) разрешения",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 10})
                    ],
                    ...TextareaField({tooltip: `Название разрешения. Используется для понятного представления разрешений в админке.`}),
                },
            ]
        }
    ];
    schema: "permission" = "permission";
    editAccessRules: string[] = ["CHANGE_PERMISSIONS", "READ_PERMISSIONS"];
    listPageUrl: PageUrl = {href: "/permission"};
    listPageConfig: ListPageConfiguration<"permission"> = new PermissionConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/permission/edit/${primaryKey}`, href: `/permission/edit/[entityId]`});
    entityName: string = "Разрешение";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание права пользователя`
        }

        return `Редактирование права пользователя №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание права пользователя`
        }

        return `Редактирование права пользователя №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}