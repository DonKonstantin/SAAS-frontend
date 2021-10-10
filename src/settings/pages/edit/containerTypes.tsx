import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportContainerTypesConfiguration} from "../list/containerType";

export class TransportContainerTypesEdit implements EditPageConfiguration<"transport_container_type"> {
    groups: EditFormGroup<"transport_container_type">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "default_name",
                    title: "Название по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название типа контейнера. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название типа контейнера. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "transport_container_type" = "transport_container_type";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_CONTAINER_TYPES", "READ_TRANSPORT_CONTAINER_TYPES"];
    listPageUrl: PageUrl = {href: "/transport/container-types"};
    listPageConfig: ListPageConfiguration<"transport_container_type"> = new TransportContainerTypesConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/container-types/edit/${primaryKey}`, href: `/transport/container-types/edit/[entityId]`});
    entityName: string = "Тип контейнера";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать тип контейнера`
        }

        return `Редактирование типа контейнера №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать тип контейнера`
        }

        return `Редактирование типа контейнера №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}