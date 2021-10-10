import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {TransportAllowanceGroupConfiguration} from "../list/allowanceGroup";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";

export class TransportAllowanceGroupEdit implements EditPageConfiguration<"transport_allowance_group"> {
    groups: EditFormGroup<"transport_allowance_group">[] = [
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
                        tooltip: `Название группы надбавок. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название группы надбавок. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "transport_allowance_group" = "transport_allowance_group";
    storeSchema: "transport_allowance_group_change" = "transport_allowance_group_change";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_ALLOWANCE_GROUPS", "READ_TRANSPORT_ALLOWANCE_GROUPS"];
    listPageUrl: PageUrl = {href: "/transport/allowance-group"};
    listPageConfig: ListPageConfiguration<"transport_allowance_group"> = new TransportAllowanceGroupConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/allowance-group/edit/${primaryKey}`, href: `/transport/allowance-group/edit/[entityId]`});
    entityName: string = "Группа надбавок";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование группы надбавок №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование группы надбавок №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}