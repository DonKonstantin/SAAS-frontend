import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportTypeConfiguration} from "../list/transportType";

export class TransportTypeGroupEdit implements EditPageConfiguration<"transport_type"> {
    groups: EditFormGroup<"transport_type">[] = [
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
                        tooltip: `Название группы типов груза. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название группы типов груза. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Перевозка",
            sizes: {xs: 12},
            fields: [
                {
                    field: "transporting_default_name",
                    title: "Название типа перевозки по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название типа перевозки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "transporting_names",
                    title: "Название типа перевозки",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название типа перевозки. Язык - ${lang}`, field: "transporting_names"}),
                },
            ]
        },
    ];
    schema: "transport_type" = "transport_type";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_TYPES", "READ_TRANSPORT_TYPES"];
    listPageUrl: PageUrl = {href: "/transport/types"};
    listPageConfig: ListPageConfiguration<"transport_type"> = new TransportTypeConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/types/edit/${primaryKey}`, href: `/transport/types/edit/[entityId]`});
    entityName: string = "Тип транспорта";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование типа транспорта №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование типа транспорта №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}