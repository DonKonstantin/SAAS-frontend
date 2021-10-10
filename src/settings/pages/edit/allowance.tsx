import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {TransportAllowanceConfiguration} from "../list/allowance";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {FeatherIcon, MakeGroupIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";

export class TransportAllowanceEdit implements EditPageConfiguration<"transport_allowance"> {
    groups: EditFormGroup<"transport_allowance">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12, md: 6},
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
                        tooltip: `Название надбавки. Используется в случае, если отсутствует локализованная версия названия.`
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({
                        tooltip: lang => `Название надбавки. Язык - ${lang}`, field: "localized_names"
                    }),
                },
            ]
        },
        {
            title: "Настройки",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "code",
                    title: "Символьны код",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1}),
                        UniqueValueInColumnValidator({schema: "transport_allowance", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код надбавки. Используется для нужд системы.`
                    }),
                },
                {
                    field: "allowance_group",
                    title: "Группа надбавок",
                    defaultValue: "1",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_ALLOWANCE_GROUPS",
                        fieldCode: "allowance_group",
                        targetEntityType: "TransportAllowanceGroup",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_allowance_group",
                        prefix: (<MakeGroupIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
            ]
        },
    ];
    schema: "transport_allowance" = "transport_allowance";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_ALLOWANCE", "READ_TRANSPORT_ALLOWANCE"];
    listPageUrl: PageUrl = {href: "/transport/allowance"};
    listPageConfig: ListPageConfiguration<"transport_allowance"> = new TransportAllowanceConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/allowance/edit/${primaryKey}`, href: `/transport/allowance/edit/[entityId]`});
    entityName: string = "Надбавка";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание надбавки`
        }

        return `Редактирование надбавки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание надбавки`
        }

        return `Редактирование надбавки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}