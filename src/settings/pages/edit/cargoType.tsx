import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {TransportCargoTypeConfiguration} from "../list/cargoType";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import React from "react";

export class TransportCargoTypeEdit implements EditPageConfiguration<"transport_cargo_type"> {
    groups: EditFormGroup<"transport_cargo_type">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
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
                        tooltip: `Название типа груза. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название типа груза. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Порядок отображения",
            sizes: {xs: 12},
            fields: [
                {
                    field: "priority",
                    title: "Порядок отображения",
                    defaultValue: "",
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<FormatListNumberedRtlIcon color={`primary`} />),
                        tooltip: `Приоритетный порядок отображения типа груза для пользователя.`,
                    }),
                },
            ]
        },
    ];
    schema: "transport_cargo_type" = "transport_cargo_type";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_CARGO_TYPES", "READ_TRANSPORT_CARGO_TYPES"];
    listPageUrl: PageUrl = {href: "/transport/cargo-type"};
    listPageConfig: ListPageConfiguration<"transport_cargo_type"> = new TransportCargoTypeConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/cargo-type/edit/${primaryKey}`, href: `/transport/cargo-type/edit/[entityId]`});
    entityName: string = "Тип груза";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактировать тип груза №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактировать тип груза №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}