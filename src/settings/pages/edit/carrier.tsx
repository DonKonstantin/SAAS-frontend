import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {CarrierConfiguration} from "../list/carrier";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import ClearGroup from "../../../components/EditPage/ClearGroup";
import FilesField from "../../../components/EditPage/Fields/FilesField";

export class CarrierEdit implements EditPageConfiguration<"carrier"> {
    groups: EditFormGroup<"carrier">[] = [
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
                        tooltip: `Название перевозчика по умолчанию. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название перевозчика. Язык - ${lang}`, field: "localized_names"}),
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
                        tooltip: `Аббревиатура перевозчика по умолчанию. Используется в случае, если отсутствует локализованная версия аббревиатуры.`,
                    }),
                },
                {
                    field: "localized_abbreviations",
                    title: "Аббревиатура",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Аббревиатура перевозчика. Язык - ${lang}`, field: "localized_abbreviations"}),
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
                        tooltip: "Загрузка файлов условий перевозки для перевозчика",
                        field: "files",
                        availableExtensions: [
                            "doc",
                            "docx",
                            "pdf",
                        ]
                    })
                }
            ],
        },
    ];
    schema: "carrier" = "carrier";
    editAccessRules: string[] = ["READ_CARRIERS", "CHANGE_CARRIERS"];
    listPageUrl: PageUrl = {href: "/transport/carrier"};
    listPageConfig: ListPageConfiguration<"carrier"> = new CarrierConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/carrier/edit/${primaryKey}`, href: `/transport/carrier/edit/[entityId]`});
    entityName: string = "Перевозчик";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание перевозчика`
        }

        return `Редактирование перевозчика №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание перевозчика`
        }

        return `Редактирование перевозчика №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}