import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {LanguageConfiguration} from "../list/language";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {SwitchField} from "../../../components/EditPage/Fields/SwitchField";
import TranslateIcon from '@material-ui/icons/Translate';
import React from "react";
import {FeatherIcon} from "../../../components/CustomIcon/icons";

export class LanguageEdit implements EditPageConfiguration<"language"> {
    groups: EditFormGroup<"language">[] = [
        {
            title: "Системные поля",
            sizes: {xs: 12, md: 7},
            fields: [
                {
                    field: "code",
                    title: "Код языка",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1}),
                        UniqueValueInColumnValidator({schema: "language", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<TranslateIcon color={`primary`} />),
                        tooltip: `Код языка. Используется для нужд системы.`,
                    }),
                },
                {
                    field: "name",
                    title: "Название языка",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название языка. Используется для понятного представления языков в админке.`,
                    }),
                },
                {
                    field: "translate_code",
                    title: "Код в переводчике",
                    size: {xs: 12, md: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Символьный код языка. Данный код используется в переводчике.`,
                    }),
                },
            ]
        },
        {
            title: "Умолчания",
            sizes: {xs: 12, md: 5},
            fields: [
                {
                    field: "is_default",
                    title: "По умолчанию",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({tooltip: `Использовать выбранный язык по умолчанию.`}),
                },
                {
                    field: "is_secondary_default_for_admin",
                    title: "По умолчанию (2й язык админки)",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({tooltip: `Использовать выбранный язык по умолчанию, как второй язык.`}),
                },
                {
                    field: "is_right_text_align",
                    title: "Ориентация текста по правому краю",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({tooltip: `Если установлен данный флаг, то текст данного языка будет выравниваться по правому краю. Данный параметр подходит, например, для арабских языков.`}),
                },
            ]
        },
    ];
    schema: "language" = "language";
    editAccessRules: string[] = ["CHANGE_LANGUAGES", "READ_LANGUAGES"];
    listPageUrl: PageUrl = {href: "/language"};
    listPageConfig: ListPageConfiguration<"language"> = new LanguageConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/language/edit/${primaryKey}`, href: `/language/edit/[entityId]`});
    entityName: string = "Язык";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание языка`
        }

        return `Редактирование языка №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание языка`
        }

        return `Редактирование языка №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}