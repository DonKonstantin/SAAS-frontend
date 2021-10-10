import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {TransportCargoTypeGroupConfiguration} from "../list/cargoTypeGroup";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";

export class TransportCargoTypeGroupEdit implements EditPageConfiguration<"transport_cargo_type_group"> {
    groups: EditFormGroup<"transport_cargo_type_group">[] = [
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
    ];
    schema: "transport_cargo_type_group" = "transport_cargo_type_group";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_CARGO_TYPE_GROUPS", "READ_TRANSPORT_CARGO_TYPE_GROUPS"];
    listPageUrl: PageUrl = {href: "/transport/cargo-type-group"};
    listPageConfig: ListPageConfiguration<"transport_cargo_type_group"> = new TransportCargoTypeGroupConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/cargo-type-group/edit/${primaryKey}`, href: `/transport/cargo-type-group/edit/[entityId]`});
    entityName: string = "Группа типов груза";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование группы типов груза №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование группы типов груза №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}