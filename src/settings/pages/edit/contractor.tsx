import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {ContractorConfiguration} from "../list/contractor";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import FilesField from "../../../components/EditPage/Fields/FilesField";
import ClearGroup from "../../../components/EditPage/ClearGroup";

export class ContractorEdit implements EditPageConfiguration<"contractor"> {
    groups: EditFormGroup<"contractor">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "default_name",
                    title: "Название по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название подрядчика по умолчанию. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название подрядчика. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Аббревиатуры",
            sizes: {xs: 12},
            fields: [
                {
                    field: "default_abbreviation",
                    title: "Аббревиатура по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Аббревиатура подрядчика по умолчанию. Используется в случае, если отсутствует локализованная версия аббревиатуры.`,
                    }),
                },
                {
                    field: "localized_abbreviations",
                    title: "Аббревиатура",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Аббревиатура подрядчика. Язык - ${lang}`, field: "localized_abbreviations"}),
                },
            ]
        },
        {
            title: "Файлы",
            sizes: {xs: 12},
            component: ClearGroup,
            fields: [
                {
                    field: "files",
                    title: "Условия перевозки",
                    defaultValue: [],
                    validation: [],
                    size: {xs: 12},
                    ...FilesField({
                        tooltip: "Загрузка файлов условий перевозки для подрядчика",
                        field: "files",
                        availableExtensions: [
                            "doc",
                            "docx",
                            "pdf",
                        ]
                    })
                }
            ],
        }
    ];
    schema: "contractor" = "contractor";
    editAccessRules: string[] = ["CHANGE_CONTRACTORS", "READ_CONTRACTORS"];
    listPageUrl: PageUrl = {href: "/contractor"};
    listPageConfig: ListPageConfiguration<"contractor"> = new ContractorConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/contractor/edit/${primaryKey}`, href: `/contractor/edit/[entityId]`});
    entityName: string = "Подрядчик";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание подрядчика`
        }

        return `Редактирование подрядчика №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание подрядчика`
        }

        return `Редактирование подрядчика №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}