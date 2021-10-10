import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportLoadingConditionsConfiguration} from "../list/loadingCondition";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";

export class TransportLoadingConditionEdit implements EditPageConfiguration<"transport_loading_condition"> {
    groups: EditFormGroup<"transport_loading_condition">[] = [
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
                        UniqueValueInColumnValidator({schema: "transport_loading_condition", field: "code"})
                    ],
                    ...StringField({
                        prefix: (<DeveloperModeIcon color={`primary`} />),
                        tooltip: `Символьный код условия погрузки. Используется для нужд системы. Должен быть уникален.`,
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
                        tooltip: `Название условия погрузки. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название условия погрузки. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Настройки условия погрузки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "is_terminal_services_included_on_loading",
                    title: "Терминальные услуги включены для погрузки",
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
                    field: "is_loading_on_non_terminal_only",
                    title: "Погрузка возможна где угодно, но не на терминале",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что погрузка возможна где угодно, но не на терминале.`,
                    }),
                },
                {
                    field: "is_first_shoulder_only",
                    title: "Только первое плечо маршрута",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Флаг показывает, что ЦП плеча с данным типом условия погрузки может быть только первым плечом маршрута.`,
                    }),
                },
            ],
        },
    ];
    schema: "transport_loading_condition" = "transport_loading_condition";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_LOADING_CONDITIONS", "READ_TRANSPORT_LOADING_CONDITIONS"];
    listPageUrl: PageUrl = {href: "/transport/loading-conditions"};
    listPageConfig: ListPageConfiguration<"transport_loading_condition"> = new TransportLoadingConditionsConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/loading-conditions/edit/${primaryKey}`, href: `/transport/loading-conditions/edit/[entityId]`});
    entityName: string = "Условие погрузки";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие погрузки`
        }

        return `Редактирование условия погрузки №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать условие погрузки`
        }

        return `Редактирование условия погрузки №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}