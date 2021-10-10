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
import {TransportUnloadingConditionsConfiguration} from "../list/unloadingCondition";

export class TransportUnloadingConditionEdit implements EditPageConfiguration<"transport_unloading_condition"> {
    groups: EditFormGroup<"transport_unloading_condition">[] = [
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
                        UniqueValueInColumnValidator({schema: "transport_unloading_condition", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код условия разгрузки. Используется для нужд системы. Должен быть уникален.`,
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
                        tooltip: `Название условия разгрузки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название условия разгрузки. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Настройки условия разгрузки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "is_terminal_services_included_on_loading",
                    title: "Терминальные услуги включены для разгрузки",
                    size: {xs: 12, md: 6},
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, включены ли в стоимость текущей услуги, услуги терминала по погрузке груза.`,
                    }),
                },
                {
                    field: "is_terminal_services_included_on_unloading",
                    title: "Терминальные услуги включены для разгрузки",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, включены ли в стоимость текущей услуги, услуги терминала по разгрузки груза.`,
                    }),
                },
                {
                    field: "is_terminal_allowances_included",
                    title: "Терминальные надбавки включены",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, включены ли в стоимость текущей услуги, надбавки терминала.`,
                    }),
                },
                {
                    field: "is_unloading_on_non_terminal_only",
                    title: "Разгрузка возможна где угодно, но не на терминале",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что разгрузка возможна где угодно, но не на терминале.`,
                    }),
                },
                {
                    field: "is_last_shoulder_only",
                    title: "Только последнее плечо маршрута",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что ЦП плеча с данным типом условия разгрузки может быть только последним плечом маршрута.`,
                    }),
                },
            ],
        },
    ];
    schema: "transport_unloading_condition" = "transport_unloading_condition";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_UNLOADING_CONDITIONS", "READ_TRANSPORT_UNLOADING_CONDITIONS"];
    listPageUrl: PageUrl = {href: "/transport/unloading-conditions"};
    listPageConfig: ListPageConfiguration<"transport_unloading_condition"> = new TransportUnloadingConditionsConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/unloading-conditions/edit/${primaryKey}`, href: `/transport/unloading-conditions/edit/[entityId]`});
    entityName: string = "Условие разгрузки";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие разгрузки`
        }

        return `Редактирование условия разгрузки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие разгрузки`
        }

        return `Редактирование условия разгрузки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}