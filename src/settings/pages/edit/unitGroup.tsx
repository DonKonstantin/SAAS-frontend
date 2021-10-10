import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {TransportUnitGroupConfiguration} from "../list/unitGroup";
import {SelectField} from "../../../components/EditPage/Fields/SelectField";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {FeatherIcon, GearsIcon, PageLinesIcon} from "../../../components/CustomIcon/icons";

export class TransportUnitGroupEdit implements EditPageConfiguration<"transport_unit_group"> {
    groups: EditFormGroup<"transport_unit_group">[] = [
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
                        tooltip: `Название группы единиц измерения. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название группы единиц измерения. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Настройки группы",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "unit_symbol",
                    title: "Обозначение группы единиц измерения",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 0})
                    ],
                    ...StringField({
                        prefix: (<PageLinesIcon color={"primary"} />),
                        tooltip: `Обозначение группы единиц измерения. Например: кг или м³`
                    }),
                },
                {
                    field: "accuracy",
                    title: "Точность округления значения",
                    defaultValue: 0,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<FeatherIcon color={"primary"} />),
                        tooltip: `Точность округления значения при переводе в эту единицу измерения из другой базовой единицы измерения (Знаков после запятой)`
                    }),
                },
                {
                    field: "rounding_rule",
                    title: "Правило округления значения",
                    defaultValue: "math",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...SelectField({
                        prefix: (<GearsIcon color={"primary"} />),
                        variants: [
                            {
                                value: "large",
                                caption: "В большую сторону",
                            },
                            {
                                value: "lesser",
                                caption: "В меньшую сторону",
                            },
                            {
                                value: "math",
                                caption: "По математике",
                            },
                        ],
                        tooltip: `Правило округления значения при переводе в эту единицу измерения из другой базовой единицы измерения`
                    }),
                },
            ]
        },
    ];
    schema: "transport_unit_group" = "transport_unit_group";
    editAccessRules: string[] = ["READ_TRANSPORT_UNIT_GROUPS", "CHANGE_TRANSPORT_UNIT_GROUPS"];
    listPageUrl: PageUrl = {href: "/transport/unit-group"};
    listPageConfig: ListPageConfiguration<"transport_unit_group"> = new TransportUnitGroupConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/unit-group/edit/${primaryKey}`, href: `/transport/unit-group/edit/[entityId]`});
    entityName: string = "Группа единиц измерения";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактировать группу единиц измерения №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return ``
        }

        return `Редактировать группу единиц измерения №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}