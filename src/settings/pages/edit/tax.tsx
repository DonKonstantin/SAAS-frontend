import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {SwitchField} from "../../../components/EditPage/Fields/SwitchField";
import {TaxConfiguration} from "../list/tax";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import React from "react";
import {FeatherIcon, PercentIcon} from "../../../components/CustomIcon/icons";

export class TaxEdit implements EditPageConfiguration<"tax"> {
    groups: EditFormGroup<"tax">[] = [
        {
            title: "Системные поля",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "code",
                    title: "Код налога",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1}),
                        UniqueValueInColumnValidator({schema: "tax", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Код налога. Используется для нужд системы.`,
                    }),
                },
                {
                    field: "amount",
                    title: "Значение (в процентах)",
                    defaultValue: 0,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...StringField({
                        prefix: (<PercentIcon color={`primary`} />),
                        tooltip: `Значение налога в процентах. Должно быть не отрицательным целым числом.`,
                    }),
                },
                {
                    field: "is_default",
                    title: "По умолчанию",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({tooltip: `Использовать выбранный налог по умолчанию.`}),
                },
            ]
        },
        {
            title: "Локализация",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "default_name",
                    title: "Название по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название налога по умолчанию. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название налога. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "tax" = "tax";
    editAccessRules: string[] = ["CHANGE_TAXES", "READ_TAXES"];
    listPageUrl: PageUrl = {href: "/tax"};
    listPageConfig: ListPageConfiguration<"tax"> = new TaxConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/tax/edit/${primaryKey}`, href: `/tax/edit/[entityId]`});
    entityName: string = "Налог";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание налога`
        }

        return `Редактирование налога №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание налога`
        }

        return `Редактирование налога №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}