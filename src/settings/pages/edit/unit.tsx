import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {SelectField} from "../../../components/EditPage/Fields/SelectField";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {TransportUnitConfiguration} from "../list/unit";
import {MinimalValueValidator} from "../../../services/validation/validators/minimalValue";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import {SwitchField} from "../../../components/EditPage/Fields/SwitchField";
import {
    ArrowGraphUpRightIcon, FeatherIcon, GearsIcon,
    HorizontalMiddleIcon, MakeGroupIcon,
    MoveUpIcon, PageLinesIcon,
    VerticalMiddleIcon
} from "../../../components/CustomIcon/icons";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";

export class TransportUnitEdit implements EditPageConfiguration<"transport_unit"> {
    groups: EditFormGroup<"transport_unit">[] = [
        {
            title: "Основные параметры",
            sizes: {xs: 12},
            fields: [
                {
                    field: "unit_group",
                    title: "Группа единицы измерения",
                    defaultValue: "1",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_UNIT_GROUPS",
                        fieldCode: "unit_group",
                        targetEntityType: "TransportUnitGroup",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_unit_group",
                        prefix: (<MakeGroupIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "convertation_coefficient",
                    title: "Коэффициент конвертации",
                    defaultValue: 0,
                    isVisible: values => values.unit_group !== "4",
                    validation: [
                        MinimalValueValidator({minimalValue: 0}),
                    ],
                    ...FloatField({
                        prefix: (<ArrowGraphUpRightIcon color={"primary"} />),
                        tooltip: `Коэффициент конвертации в базовое значение.\n\nНеобходимо умножить текущее значение в единице измерения на этот коэффициент для получения базового значения.`
                    }),
                },
                {
                    field: "is_default_for_group",
                    title: "Является единицей измерения по умолчанию для группы",
                    defaultValue: false,
                    validation: [],
                    ...SwitchField({
                        tooltip: `Является единицей измерения по умолчанию для группы`
                    }),
                },
            ]
        },

        {
            title: "Настройки паллет",
            sizes: {xs: 12},
            isVisible: values => values.unit_group === "4",
            fields: [
                {
                    field: "length",
                    title: "Длина",
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...FloatField({
                        prefix: (<VerticalMiddleIcon color={"primary"} />),
                        tooltip: `Длина паллеты`
                    }),
                },
                {
                    field: "width",
                    title: "Ширина",
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...FloatField({
                        prefix: (<HorizontalMiddleIcon color={"primary"} />),
                        tooltip: `Ширина паллеты`
                    }),
                },
                {
                    field: "normative_height_of_stacking",
                    title: "Нормативная высота штабелирования",
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...FloatField({
                        prefix: (<MoveUpIcon color={"primary"} />),
                        tooltip: `Нормативная высота штабелирования паллеты`
                    }),
                },
            ]
        },
        {
            title: "Название",
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
            title: "Обозначение единицы измерения",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "unit_symbol",
                    title: "Обозначение единицы измерения по умолчанию",
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
                    field: "localized_unit_symbols",
                    title: "Обозначение единицы измерения",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Обозначение единицы измерения. Язык - ${lang}`, field: "localized_unit_symbols"}),
                },
            ]
        },
        {
            title: "Округление (В единицу измерения)",
            sizes: {xs: 12, md: 6},
            isVisible: values => values.unit_group !== "4",
            fields: [
                {
                    field: "accuracy_in",
                    title: "Точность округления значения",
                    defaultValue: 0,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<FeatherIcon color={"primary"} />),
                        tooltip: `Точность округления значения при переводе в эту единицу измерения из базовой (Знаков после запятой)`
                    }),
                },
                {
                    field: "rounding_rule_in",
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
                        tooltip: `Правило округления значения при переводе в эту единицу измерения из базовой`
                    }),
                },
            ]
        },
        {
            title: "Округление (Из единицы измерения)",
            sizes: {xs: 12, md: 6},
            isVisible: values => values.unit_group !== "4",
            fields: [
                {
                    field: "accuracy_out",
                    title: "Точность округления значения",
                    defaultValue: 0,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<FeatherIcon color={"primary"} />),
                        tooltip: `Точность округления значения при переводе из этой единицы измерения в базовую (Знаков после запятой)`
                    }),
                },
                {
                    field: "rounding_rule_out",
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
                        tooltip: `Правило округления значения при переводе из этой единицы измерения в базовую`
                    }),
                },
            ]
        },
    ];
    schema: "transport_unit" = "transport_unit";
    editAccessRules: string[] = ["READ_TRANSPORT_UNITS", "CHANGE_TRANSPORT_UNITS"];
    listPageUrl: PageUrl = {href: "/transport/unit"};
    listPageConfig: ListPageConfiguration<"transport_unit"> = new TransportUnitConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/unit/edit/${primaryKey}`, href: `/transport/unit/edit/[entityId]`});
    entityName: string = "Единица измерения";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Добавить единицу измерения`
        }

        return `Редактировать единицу измерения №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Добавить единицу измерения`
        }

        return `Редактировать единицу измерения №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}