import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {DropboxIcon, FireIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {AdditionEditParams} from "../../../containers/EntityEdit";
import {HiddenField} from "../../../components/EditPage/Fields/HiddenField";
import HiddenGroup from "../../../components/EditPage/HiddenGroup";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {RelationWithAutocompleteField} from "../../../components/EditPage/Fields/RelationWithAutocompleteField";
import {OfferConditionsField} from "../../../custom/components/EditPage/Fields/OfferConditionsField";
import OfferConditionsGroup from "../../../custom/components/EditPage/OfferConditionsGroup";
import ActiveDatesGroup from "../../../custom/components/EditPage/ActiveDatesGroup";
import {AllowancesGroup} from "../../../custom/components/EditPage/AllowancesGroup";
import {AllowanceOffersField} from "../../../custom/components/EditPage/Fields/AllowanceOffersField";
import {TransportShoulderOfferConfiguration} from "../list/shoulderOffer";
import {MinimalValueValidator} from "../../../services/validation/validators/minimalValue";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {DateField} from "../../../components/EditPage/Fields/DateField";
import {DateShouldBeMoreThatAnotherDate} from "../../../services/validation/validators/dateShouldBeMoreThatAnotherDate";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";
import {MultipleRelationWithSearchField} from "../../../components/EditPage/Fields/MultipleRelationWithSearchField";
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import TimelapseIcon from '@material-ui/icons/Timelapse';

export class TransportShoulderOfferEdit implements EditPageConfiguration<"transport_shoulder_offer"> {
    groups: EditFormGroup<"transport_shoulder_offer">[] = [
        {
            title: "",
            sizes: {xs: 12},
            fields: [
                {
                    field: "cargo_type_group",
                    title: "Группа грузов",
                    defaultValue: "1",
                    size: values => {
                        if (values.cargo_type_group === "1") {
                            return {xs: 12, md: 6}
                        }

                        return {xs: 12}
                    },
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_CARGO_TYPE_GROUPS",
                        fieldCode: "cargo_type_group",
                        targetEntityType: "TransportCargoTypeGroup",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_cargo_type_group",
                        prefix: (<FireIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "containers",
                    title: "Контейнеры",
                    defaultValue: [],
                    size: {xs: 12, md: 6},
                    isVisible: values => values.cargo_type_group === "1",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать хотя бы один из вариантов значения`}),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_CONTAINERS",
                        fieldCode: "containers",
                        targetEntityType: "TransportContainer",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_container",
                        targetSchemaDefaultValueField: `default_name`,
                        chipIcon: (<DropboxIcon />),
                    }),
                },
                {
                    field: "container_affiliation_id",
                    title: "Принадлежность контейнера",
                    defaultValue: 1,
                    size: {xs: 12, md: 6},
                    isVisible: values => values.cargo_type_group === "1",
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithAutocompleteField({
                        captionFields: ["default_name"],
                        captionGenerator: option => `${option.default_name}`,
                        primaryKey: "id",
                        schema: "transport_container_affiliation",
                        tooltip: `Принадлежность контейнера. COC - контейнер предоставляет перевозчик. SOC - контейнер предоставляет клиент.`
                    }),
                },
                {
                    field: "container_nominal_weight",
                    title: "Номинальная загрузка контейнера (Кг)",
                    defaultValue: 0,
                    size: {xs: 12, md: 6},
                    isVisible: values => values.cargo_type_group === "1",
                    validation: [
                        MinimalValueValidator({minimalValue: 0, errorMessage: "Значение поля должно быть больше 0"}),
                    ],
                    ...FloatField({
                        tooltip: `Номинальный вес контейнера используется для расчета надбавок за перевес. По сути граница значения веса надбавки считается как (текущее значение - номинальный вес) * стоимость единицы груза`
                    }),
                },
                {
                    field: "is_danger_cargo_allowed",
                    title: "Перевозка опасных грузов",
                    defaultValue: false,
                    size: {xs: 12},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Данный флаг разрешает перевозку опасных грузов по текущему плечу`
                    }),
                },
            ]
        },
        {
            title: "Параметры возврата оборудования",
            sizes: {xs: 12},
            isVisible: values => values.cargo_type_group === "1" && values.container_affiliation_id !== 1,
            fields: [
                {
                    field: "is_empty_container_returning_included",
                    title: "Возврат порожнего оборудования включен",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Данный флаг подразумевает возможность включения плеча в состав маршрута в конце маршрута. Также данный флаг полностью исключает данное плечо из расчетов стоимости услуги аренды контейнера (DropOff). Данный флаг учитывается только при установленной принадлежности контейнера SOC у текущего плеча.`
                    }),
                },
                {
                    field: "is_empty_container_collecting_included",
                    title: "Возврат груженого оборудования включен",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Данный флаг подразумевает возможность включения плеча в состав маршрута в начале маршрута. Также данный флаг полностью исключает данное плечо из расчетов стоимости услуги аренды контейнера (PickOn). Данный флаг учитывается только при установленной принадлежности контейнера SOC у текущего плеча. Флаг учитывается только для контейнерной перевозки.`
                    }),
                },
            ],
        },
        {
            title: "Погрузка/Разгрузка",
            sizes: {xs: 12},
            fields: [
                {
                    field: "loading_condition_id",
                    title: "Погрузка",
                    defaultValue: "1",
                    size: {xs: 12, sm: 6},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithAutocompleteField({
                        captionFields: ["default_name", "code"],
                        captionGenerator: option => `${option.code}`,
                        primaryKey: "id",
                        schema: "transport_loading_condition",
                        tooltip: `Условия погрузки груза по текущему предложению`
                    }),
                },
                {
                    field: "unloading_condition_id",
                    title: "Разгрузка",
                    defaultValue: "1",
                    size: {xs: 12, sm: 6},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithAutocompleteField({
                        captionFields: ["default_name", "code"],
                        captionGenerator: option => `${option.code}`,
                        primaryKey: "id",
                        schema: "transport_unloading_condition",
                        tooltip: `Условия разгрузки груза по текущему предложению`
                    }),
                },
            ],
        },
        {
            title: `Дополнительные параметры`,
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "delivery_modes",
                    title: "Режимы перевозки",
                    defaultValue: ["2"],
                    size: {md: 6, xs: 12},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать хотя бы один из вариантов значения`}),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_DELIVERY_MODES",
                        fieldCode: "delivery_modes",
                        targetEntityType: "TransportDeliveryMod",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_delivery_mod",
                        targetSchemaDefaultValueField: `default_name`,
                        chipIcon: (<DirectionsTransitIcon />),
                    }),
                },
                {
                    field: "delivery_time",
                    title: "Срок перевозки (дней)",
                    size: {md: 6, xs: 12},
                    defaultValue: 0,
                    validation: [
                        MinimalValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        tooltip: `Срок перевозки в днях`,
                        prefix: (<TimelapseIcon color={`primary`} />),
                    }),
                },
                {
                    field: "free_time_for_container_usage_on_start_terminal",
                    title: "Свободное исп. контейнера (пункт отпр.)",
                    defaultValue: 0,
                    size: {xs: 12, md: 6},
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0, errorMessage: "Значение поля должно быть больше или равно 0"}),
                    ],
                    ...IntField({}),
                },
                {
                    field: "free_time_for_container_usage_on_end_terminal",
                    title: "Свободное исп. контейнера (пункт назн.)",
                    defaultValue: 0,
                    size: {xs: 12, md: 6},
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0, errorMessage: "Значение поля должно быть больше или равно 0"}),
                    ],
                    ...IntField({}),
                },
            ],
        },
        {
            title: "Срок действия предложения",
            sizes: {xs: 12, md: 6},
            component: ActiveDatesGroup,
            fields: [
                {
                    field: "active_from",
                    title: "С",
                    defaultValue: async () => {
                        const date = new Date();
                        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
                    },
                    size: {xs: 12, sm: 6},
                    validation: [
                        DateShouldBeMoreThatAnotherDate({
                            errorMessage: "Поле `По` должно быть больше поля `С`",
                            lessField: "active_from",
                            lessFieldEmptyError: "Поле не заполнено",
                            moreField: "active_to",
                            fieldsEmptyError: "Поле не заполнено",
                        }),
                    ],
                    ...DateField({
                        tooltip: `Дата начала действия предложения. Предложение будет действовать с 00:00 выбранной даты.`,
                    }),
                },
                {
                    field: "active_to",
                    title: "По",
                    defaultValue: async () => {
                        let date = new Date();
                        let nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));
                        nextMonthDate = new Date(nextMonthDate.setDate(0));

                        return new Date(Date.UTC(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate(), 23, 59, 59))
                    },
                    size: {xs: 12, sm: 6},
                    validation: [
                        DateShouldBeMoreThatAnotherDate({
                            errorMessage: "Поле `По` должно быть больше поля `С`",
                            lessField: "active_from",
                            moreField: "active_to",
                            moreFieldEmptyError: "Поле не заполнено",
                            fieldsEmptyError: "Поле не заполнено",
                        }),
                    ],
                    ...DateField({
                        tooltip: `Дата окончания действия предложения. Предложение будет действовать до 23:59 выбранной даты.`,
                        preprocessValue: date => {
                            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59));
                        }
                    }),
                },
            ],
        },
        {
            title: "Стоимость",
            sizes: {xs: 12},
            isVisible: values => !!values.cargo_type_group,
            component: OfferConditionsGroup,
            fields: [
                {
                    field: "offer_conditions",
                    title: "ID условий ценовых предложений",
                    defaultValue: [],
                    validation: [],
                    ...OfferConditionsField({
                        fieldCode: 'offer_conditions',
                        cargoTypeGroupCode: 'cargo_type_group',
                    }),
                },
            ]
        },
        {
            title: "",
            sizes: {xs: 12},
            isVisible: values => !!values.cargo_type_group,
            component: AllowancesGroup,
            fields: [
                {
                    field: "allowance_offers",
                    title: "ID надбавок",
                    defaultValue: [],
                    validation: [],
                    ...AllowanceOffersField({
                        fieldCode: 'allowance_offers',
                        cargoTypeGroupCode: 'cargo_type_group',
                        allowanceGroupsAvailableToChoose: ["1", "2", "3", "4", "5"],
                        allowanceGroupsCustomNames: {
                            "4": "На терминале отправления",
                            "5": "На терминале назначения",
                        },
                    }),
                },
            ]
        },
        {
            title: "Скрытые поля",
            sizes: {xs: 12},
            component: HiddenGroup,
            fields: [
                {
                    field: "shoulder_id",
                    title: "ID плеча",
                    defaultValue: null,
                    validation: [],
                    ...HiddenField({}),
                },
            ]
        },
    ];
    schema: "transport_shoulder_offer" = "transport_shoulder_offer";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_SHOULDERS", "READ_TRANSPORT_SHOULDERS"];
    listPageUrl: PageUrl = {href: "/transport/shoulder"};
    listPageConfig: ListPageConfiguration<"transport_shoulder_offer"> = new TransportShoulderOfferConfiguration();
    editPageUrlGenerator: {(primaryKey: any, additionEditParams: AdditionEditParams): PageUrl} = (
        primaryKey: any,
        additionEditParams: AdditionEditParams
    ): PageUrl => ({
        as: `/transport/shoulder/${additionEditParams?.defaultValues?.shoulder_id}/offer/edit/${primaryKey}`,
        href: `/transport/shoulder/[shoulderId]/offer/edit/[entityId]`,
    });
    entityName: string = "Ценовое предложение";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать ценовое предложение`
        }

        return `Редактировать ценовое предложение №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать ценовое предложение`
        }

        return `Редактировать ценовое предложение №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}