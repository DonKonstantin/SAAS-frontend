import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";
import {TransportStartTransportingConditionsConfiguration} from "../list/startTransportingCondition";

export class TransportStartTransportingConditionEdit implements EditPageConfiguration<"transport_start_transporting_condition"> {
    groups: EditFormGroup<"transport_start_transporting_condition">[] = [
        {
            title: "Основные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "code",
                    title: "Символьны код",
                    defaultValue: "",
                    size: {xs: 12, md: 6},
                    validation: [
                        MinimalLengthValidator({minimalLength: 1}),
                        UniqueValueInColumnValidator({schema: "transport_start_transporting_condition", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код условия начала перевозки. Используется для нужд системы. Должен быть уникален.`,
                    }),
                },
                {
                    field: "default_name",
                    title: "Название по умолчанию (англ.)",
                    defaultValue: "",
                    size: {xs: 12, md: 6},
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Название условия начала перевозки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название условия начала перевозки. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Настройки условия начала перевозки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "is_terminal_required",
                    title: "Терминал погрузки обязателен на начальном плече маршрута",
                    size: {xs: 12, md: 6},
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, обязателен ли терминал погрузки на начальном плече маршрута.`,
                    }),
                },
                {
                    field: "is_terminal_services_should_be_included_on_route_start",
                    title: "Терминальные услуги должны быть включены в стоимость на начальном терминале маршрута",
                    defaultValue: true,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть включены услуги терминала на начальном терминале маршрута. Например: если маршрут начинается с терминала, то, если флаг не установлен, услуги погрузки включены не будут, за исключением случая, когда услуги уже включены в стоимость перевозки.`,
                    }),
                },
                {
                    field: "is_terminal_allowances_should_be_included_on_route_start",
                    title: "Терминальные надбавки должны быть включены в стоимость на начальном терминале маршрута",
                    defaultValue: true,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть включены надбавки терминала на начальном терминале маршрута. Например: если маршрут начинается с терминала, то, если флаг не установлен, надбавки включены не будут, за исключением случая, когда надбавки уже включены в стоимость перевозки.`,
                    }),
                },
                {
                    field: "is_terminal_services_excluded_on_export_terminal_prekeridge",
                    title: "Терминальные услуги должны быть исключены из расчета для вариантов с прекериждем для экспортного терминала",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть исключены услуги экспортного терминала из расчета. Экспортным терминалом считается первый терминал, который находится не в стране отправления.`,
                    }),
                },
                {
                    field: "is_terminal_allowances_excluded_on_export_terminal_prekeridge",
                    title: "Терминальные надбавки должны быть исключены из расечта для вариантов с прекериджем для экспортного терминала",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть исключены надбавки экспортного терминала из расчета. Экспортным терминалом считается первый терминал, который находится не в стране отправления.`,
                    }),
                },
                {
                    field: "is_prekeridge_available",
                    title: "Для текущего условия возможен расчет вариантов с прекериджем",
                    defaultValue: true,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что для текущего условия начала перевозки доступен дополнительный расчет вариантов маршрутов с прекериджем.`,
                    }),
                },
                {
                    field: "is_prekeridge",
                    title: "Текущее условие начала перевозки является прекериджем для других условий",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что текущее условие начала перевозки является прекериджем для других условий.`,
                    }),
                },
            ],
        },
    ];
    schema: "transport_start_transporting_condition" = "transport_start_transporting_condition";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_START_TRANSPORTING_CONDITIONS", "READ_TRANSPORT_START_TRANSPORTING_CONDITIONS"];
    listPageUrl: PageUrl = {href: "/transport/start-transporting-conditions"};
    listPageConfig: ListPageConfiguration<"transport_start_transporting_condition"> = new TransportStartTransportingConditionsConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/start-transporting-conditions/edit/${primaryKey}`, href: `/transport/start-transporting-conditions/edit/[entityId]`});
    entityName: string = "Условие начала перевозки";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие начала перевозки`
        }

        return `Редактирование условия начала перевозки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие начала перевозки`
        }

        return `Редактирование условия начала перевозки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}