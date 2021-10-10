import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportDeliveryModesConfiguration} from "../list/deliveryModes";

export class TransportDeliveryModesEdit implements EditPageConfiguration<"transport_delivery_mod"> {
    groups: EditFormGroup<"transport_delivery_mod">[] = [
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
                        tooltip: `Название режима перевозки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название режима перевозки. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
    ];
    schema: "transport_delivery_mod" = "transport_delivery_mod";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_DELIVERY_MODES", "READ_TRANSPORT_DELIVERY_MODES"];
    listPageUrl: PageUrl = {href: "/transport/delivery-modes"};
    listPageConfig: ListPageConfiguration<"transport_delivery_mod"> = new TransportDeliveryModesConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/delivery-modes/edit/${primaryKey}`, href: `/transport/delivery-modes/edit/[entityId]`});
    entityName: string = "Режим перевозки";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование режима перевозки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование режима перевозки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}