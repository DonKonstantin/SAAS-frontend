import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportContainerAffiliationConfiguration} from "../list/containerAffiliation";

export class TransportContainerAffiliationEdit implements EditPageConfiguration<"transport_container_affiliation"> {
    groups: EditFormGroup<"transport_container_affiliation">[] = [
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
                        tooltip: `Название принадлежности контейнеров. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название принадлежности контейнеров. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "transport_container_affiliation" = "transport_container_affiliation";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_CONTAINER_AFFILIATION", "READ_TRANSPORT_CONTAINER_AFFILIATION"];
    listPageUrl: PageUrl = {href: "/transport/container-affiliation"};
    listPageConfig: ListPageConfiguration<"transport_container_affiliation"> = new TransportContainerAffiliationConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/container-affiliation/edit/${primaryKey}`, href: `/transport/container-affiliation/edit/[entityId]`});
    entityName: string = "Принадлежность контейнеров";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование принадлежности контейнеров №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование принадлежности контейнеров №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}