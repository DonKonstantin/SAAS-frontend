import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {DropboxIcon, PercentIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {RelationWithAutocompleteField} from "../../../components/EditPage/Fields/RelationWithAutocompleteField";
import {currencyDefaultGetter} from "../../../services/currencyDefaultGetter";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import {taxDefaultGetter} from "../../../services/taxDefaultGetter";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {TransportPickOnConfiguration} from "../list/pickOn";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";
import {MultipleRelationWithSearchField} from "../../../components/EditPage/Fields/MultipleRelationWithSearchField";
import {GetLocationMultipleRelationWithSearchFieldTitle} from "../../../services/helpers/GetLocationMultipleRelationWithSearchFieldTitle";
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';

export class TransportPickOnEdit implements EditPageConfiguration<"transport_pickon"> {
    groups: EditFormGroup<"transport_pickon">[] = [
        {
            title: "Исполнители",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "contractor_id",
                    title: "Подрядчик",
                    defaultValue: null,
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_CONTRACTORS",
                        fieldCode: "contractor_id",
                        targetEntityType: "Contractor",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "contractor",
                        prefix: (<SupervisedUserCircleIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`,
                        tooltip: "Подрядчик, предоставляющий в аренду контейнер"
                    }),
                },
                {
                    field: "carrier_id",
                    title: "Перевозчик",
                    defaultValue: null,
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_CARRIERS",
                        fieldCode: "carrier_id",
                        targetEntityType: "Carrier",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "carrier",
                        prefix: (<EmojiTransportationIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`,
                        tooltip: (
                            <React.Fragment>
                                Перевозчик, которому <b>принадлежит</b> контейнер.
                                <br/>
                                <br/>
                                Изначально услуга <b>DropOff</b> доступна, <i>только если для перевозимого груза по определенному маршруту есть ставка DropOff от перевозчика</i>, который выполняет заказ. Имеются в виду случаи, когда необходима аренда контейнера.
                            </React.Fragment>
                        ),
                    }),
                },
            ],
        },
        {
            title: "Места",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "from_location_ids",
                    title: "Места получения контейнера",
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_LOCATIONS",
                        fieldCode: "from_location_ids",
                        targetEntityType: "Location",
                        captionFields: ["default_name", "symbol_code"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetLocationMultipleRelationWithSearchFieldTitle,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "locations",
                        chipIcon: (<ExploreIcon />),
                        targetSchemaDefaultValueField: `default_name`,
                        tooltip: "Места, в которых возможно получение контейнера по данной услуге",
                    }),
                },
                {
                    field: "to_location_ids",
                    title: "Места сдачи контейнера",
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_LOCATIONS",
                        fieldCode: "to_location_ids",
                        targetEntityType: "Location",
                        captionFields: ["default_name", "symbol_code"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetLocationMultipleRelationWithSearchFieldTitle,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "locations",
                        chipIcon: (<ExploreOffIcon />),
                        targetSchemaDefaultValueField: `default_name`,
                        tooltip: "Места, в которых возможен возврат контейнера по данной услуге",
                    }),
                },
            ],
        },
        {
            title: "Настройки услуги",
            sizes: {md: 6, lg: 5, xs: 12},
            fields: [
                {
                    field: "container_ids",
                    title: "Контейнеры, доступные для получения",
                    defaultValue: [],
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_CONTAINERS",
                        fieldCode: "container_ids",
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
                    field: "is_container_usage_in_another_contractor_service_allowed",
                    title: "Разрешено использование контейнера в сервисах других подрядчиков",
                    defaultValue: true,
                    size: {xs: 12},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `По умолчанию контейнер может использоваться только в маршрутах, где один и тот-же подрядчик (COC (текущий подрядчик) + SOC (текущий подрядчик)), данный флаг разрешает использовать контейнер другим подрядчикам (COC (текущий подрядчик) + SOC (другой подрядчик))`
                    }),
                },
            ],
        },
        {
            title: "Стоимость услуги",
            sizes: {xs: 12, md: 6, lg: 7},
            fields: [
                {
                    field: "price",
                    title: "Стоимость",
                    size: {md: 6, xs: 12},
                    defaultValue: 0,
                    validation: [],
                    ...FloatField({
                        tooltip: `Стоимость услуги в выбранной валюте`
                    }),
                },
                {
                    field: "currency_id",
                    title: "Валюта",
                    size: {md: 3, xs: 6},
                    defaultValue: async params => {
                        return await currencyDefaultGetter(params.token).getDefaultForTransport()
                    },
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_CURRENCIES",
                        fieldCode: "currency_id",
                        targetEntityType: "Currency",
                        captionFields: ["code", "glyph"],
                        captionGenerator: option => `${option.fields.glyph ? `${option.fields.code} (${option.fields.glyph})` : option.fields.code}`,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "currency",
                        prefix: (<AttachMoneyIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `code`
                    }),
                },
                {
                    field: "tax_id",
                    title: "Налог",
                    size: {md: 3, xs: 6},
                    defaultValue: async params => {
                        return await taxDefaultGetter(params.token).getDefaultTax()
                    },
                    validation: [],
                    ...RelationWithAutocompleteField({
                        captionFields: ["amount", "code"],
                        captionGenerator: option => `${option.amount}% (${option.code})`,
                        primaryKey: "id",
                        schema: "tax",
                        prefix: (<PercentIcon color={`primary`} />),
                    }),
                },
                {
                    field: "is_tax_included",
                    title: "Налог включен в стоимость",
                    defaultValue: false,
                    validation: [],
                    ...CheckboxField({tooltip: `Налог включен в стоимость`}),
                },
            ]
        },
    ];
    schema: "transport_pickon" = "transport_pickon";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_PICKON", "READ_TRANSPORT_PICKON"];
    listPageUrl: PageUrl = {href: "/transport/pickon"};
    listPageConfig: ListPageConfiguration<"transport_pickon"> = new TransportPickOnConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/pickon/edit/${primaryKey}`, href: `/transport/pickon/edit/[entityId]`});
    entityName: string = "PickOn";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать PickOn`
        }

        return `Редактирование PickOn №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать PickOn`
        }

        return `Редактирование PickOn №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}