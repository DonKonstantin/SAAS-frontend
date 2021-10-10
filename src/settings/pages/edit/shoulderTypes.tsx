import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {RelationWithAutocompleteField} from "../../../components/EditPage/Fields/RelationWithAutocompleteField";
import {TransportShoulderTypeConfiguration} from "../list/shoulderType";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

export class TransportShoulderTypeEdit implements EditPageConfiguration<"transport_shoulder_type"> {
    groups: EditFormGroup<"transport_shoulder_type">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "default_name",
                    title: "Название по умолчанию (англ.)",
                    size: {xs: 12, md: 6},
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
                    field: "transport_type",
                    title: "Тип транспорта",
                    size: {xs: 12, md: 6},
                    defaultValue: null,
                    validation: [],
                    ...RelationWithAutocompleteField({
                        captionFields: ["default_name"],
                        captionGenerator: option => `${option.default_name}`,
                        primaryKey: "id",
                        schema: "transport_type",
                        prefix: (<DirectionsBoatIcon color={`primary`} />),
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
    schema: "transport_shoulder_type" = "transport_shoulder_type";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_LEG_TYPES", "READ_TRANSPORT_LEG_TYPES"];
    listPageUrl: PageUrl = {href: "/transport/shoulder-types"};
    listPageConfig: ListPageConfiguration<"transport_shoulder_type"> = new TransportShoulderTypeConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/shoulder-types/edit/${primaryKey}`, href: `/transport/shoulder-types/edit/[entityId]`});
    entityName: string = "Тип плеча";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование типа плеча №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактирование типа плеча №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}