import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {CurrencyConfiguration} from "../list/currency";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import {MinimalValueValidator} from "../../../services/validation/validators/minimalValue";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon, GearsIcon, PercentIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import MoneyIcon from '@material-ui/icons/Money';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {SelectField} from "../../../components/EditPage/Fields/SelectField";

export class CurrencyEdit implements EditPageConfiguration<"currency"> {
    groups: EditFormGroup<"currency">[] = [
        {
            title: "Системные поля",
            sizes: {lg: 7, xl: 8, md: 6, xs: 12},
            fields: [
                {
                    field: "code",
                    title: "Код валюты",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 2}),
                        UniqueValueInColumnValidator({schema: "currency", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Код валюты. Используется для нужд системы. Должен быть уникальным.`,
                    }),
                },
                {
                    field: "glyph",
                    title: "Символ валюты",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 0})
                    ],
                    ...StringField({tooltip: `Символ, обозначающий валюту`,}),
                },
            ]
        },
        {
            title: "Курс валюты",
            sizes: {lg: 5, xl: 4, md: 6, xs: 12},
            fields: [
                {
                    field: "course",
                    title: "Курс валюты",
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...FloatField({
                        prefix: (<LocalAtmIcon color={`primary`} />),
                        tooltip: `Курс валюты по отношению к рублю`,
                    }),
                },
                {
                    field: "nominal",
                    title: "Номинал валюты",
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...FloatField({
                        prefix: (<MoneyIcon color={`primary`} />),
                        tooltip: `Номинал валюты. Количество целевой валюты для обмена по курсу. Например 100 единиц за 50 руб.`,
                    }),
                },
            ]
        },
        {
            title: "Локализация",
            sizes: {lg: 7, xl: 8, md: 6, xs: 12},
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
                        tooltip: `Название валюты по умолчанию. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название валюты. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Умолчания",
            sizes: {lg: 5, xl: 4, md: 6, xs: 12},
            fields: [
                {
                    field: "conversion_fee_percent",
                    title: "Процент конверсионных издержек",
                    defaultValue: 3,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<PercentIcon color={"primary"} />),
                        tooltip: `Процент конверсионных издержек при переводе в эту валюту из другой`
                    }),
                },
                {
                    field: "accuracy_in",
                    title: "Точность округления значения",
                    defaultValue: 2,
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        prefix: (<FeatherIcon color={"primary"} />),
                        tooltip: `Точность округления значения при переводе в эту валюту из другой (Знаков после запятой)`
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
                        tooltip: `Правило округления значения при переводе в эту валюту из другой`
                    }),
                },
                {
                    field: "is_default_for_services",
                    title: "Используется по умолчанию в услугах",
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({tooltip: `Флаг использования валюты по умолчанию в дополнительных услугах`}),
                },
                {
                    field: "is_default_for_transport",
                    title: "Используется по умолчанию в транспорте",
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({tooltip: `Флаг использования валюты по умолчанию в транспорте. Например в ценовых предложениях плеча или терминала в качестве валюты по умолчанию.`}),
                },
            ]
        },
    ];
    schema: "currency" = "currency";
    editAccessRules: string[] = ["READ_CURRENCIES", "CHANGE_CURRENCIES"];
    listPageUrl: PageUrl = {href: "/currency"};
    listPageConfig: ListPageConfiguration<"currency"> = new CurrencyConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/currency/edit/${primaryKey}`, href: `/currency/edit/[entityId]`});
    entityName: string = "Валюта";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание валюты`
        }

        return `Редактирование валюты №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание валюты`
        }

        return `Редактирование валюты №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}