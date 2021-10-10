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
import {TransportStopTransportingConditionsConfiguration} from "../list/stopTransportingCondition";

export class TransportStopTransportingConditionEdit implements EditPageConfiguration<"transport_stop_transporting_condition"> {
    groups: EditFormGroup<"transport_stop_transporting_condition">[] = [
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
                        UniqueValueInColumnValidator({schema: "transport_stop_transporting_condition", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код условия окончания перевозки. Используется для нужд системы. Должен быть уникален.`,
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
                        tooltip: `Название условия окончания перевозки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название условия окончания перевозки. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Настройки условия окончания перевозки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "is_terminal_required",
                    title: "Терминал разгрузки обязателен на конечном плече маршрута",
                    size: {xs: 12, md: 6},
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, обязателен ли терминал разгрузки на конечном плече маршрута.`,
                    }),
                },
                {
                    field: "is_terminal_services_should_be_included_on_route_end",
                    title: "Терминальные услуги должны быть включены в стоимость на конечном терминале маршрута",
                    defaultValue: true,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть включены услуги терминала на конечном терминале маршрута. Например: если маршрут оканчивается на терминале, то, если флаг не установлен, услуги разгрузки включены не будут, за исключением случая, когда услуги уже включены в стоимость перевозки.`,
                    }),
                },
                {
                    field: "is_terminal_allowances_should_be_included_on_route_end",
                    title: "Терминальные надбавки должны быть включены в стоимость на конечном терминале маршрута",
                    defaultValue: true,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, должны ли быть включены надбавки терминала на конечном терминале маршрута. Например: если маршрут оканчивается на терминале, то, если флаг не установлен, надбавки включены не будут, за исключением случая, когда надбавки уже включены в стоимость перевозки.`,
                    }),
                },
            ],
        },
    ];
    schema: "transport_stop_transporting_condition" = "transport_stop_transporting_condition";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_STOP_TRANSPORTING_CONDITIONS", "READ_TRANSPORT_STOP_TRANSPORTING_CONDITIONS"];
    listPageUrl: PageUrl = {href: "/transport/stop-transporting-conditions"};
    listPageConfig: ListPageConfiguration<"transport_stop_transporting_condition"> = new TransportStopTransportingConditionsConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/stop-transporting-conditions/edit/${primaryKey}`, href: `/transport/stop-transporting-conditions/edit/[entityId]`});
    entityName: string = "Условие окончания перевозки";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие окончания перевозки`
        }

        return `Редактирование условия окончания перевозки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие окончания перевозки`
        }

        return `Редактирование условия окончания перевозки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}