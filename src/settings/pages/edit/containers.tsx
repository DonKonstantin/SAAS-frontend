import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon, FireIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {TransportContainersConfiguration} from "../list/containers";
import {SwitchField} from "../../../components/EditPage/Fields/SwitchField";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";

export class TransportContainersEdit implements EditPageConfiguration<"transport_container"> {
    groups: EditFormGroup<"transport_container">[] = [
        {
            title: "Настройки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "container_type",
                    title: "Тип контейнера",
                    defaultValue: "1",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_CONTAINER_TYPES",
                        fieldCode: "container_type",
                        targetEntityType: "TransportContainerType",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_container_type",
                        prefix: (<FireIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "is_default_for_container_type",
                    title: "Является контейнером по умолчанию для выбранного типа",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({
                        tooltip: `Является контейнером по умолчанию для выбранного типа`
                    }),
                },
            ]
        },
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
                        tooltip: `Название контейнера. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название контейнера. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "transport_container" = "transport_container";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_CONTAINERS", "READ_TRANSPORT_CONTAINERS"];
    listPageUrl: PageUrl = {href: "/transport/containers"};
    listPageConfig: ListPageConfiguration<"transport_container"> = new TransportContainersConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/containers/edit/${primaryKey}`, href: `/transport/containers/edit/[entityId]`});
    entityName: string = "Контейнер";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать контейнер`
        }

        return `Редактирование контейнер №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать контейнер`
        }

        return `Редактирование контейнер №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}