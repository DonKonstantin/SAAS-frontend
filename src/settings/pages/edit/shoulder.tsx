import {CustomComponentProps, EditFormGroup, EditPageConfiguration, EntityValues} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {TransportShoulderConfiguration} from "../list/shoulder";
import CommuteIcon from '@material-ui/icons/Commute';
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {SelectField} from "../../../components/EditPage/Fields/SelectField";
import ExploreIcon from '@material-ui/icons/Explore';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HeightIcon from '@material-ui/icons/Height';
import {ValueExistsInOneOfFields} from "../../../services/validation/validators/valueExistsInOneOfFields";
import {EntityEditShoulderOffersListComponent} from "../../../custom/containers/EntityEditShoulderOffersListComponent";
import {MultipleRelationWithSearchField} from "../../../components/EditPage/Fields/MultipleRelationWithSearchField";
import {GetLocationMultipleRelationWithSearchFieldTitle} from "../../../services/helpers/GetLocationMultipleRelationWithSearchFieldTitle";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";
import {MinimalOrEqualsValueValidator} from "../../../services/validation/validators/minimalOrEqualsValue";
import {ShoulderStepsField} from "../../../custom/components/EditPage/Fields/ShoulderStepsField";
import OfferConditionsGroup from "../../../custom/components/EditPage/OfferConditionsGroup";

export class TransportShoulderEdit implements EditPageConfiguration<"transport_shoulder"> {
    groups: EditFormGroup<"transport_shoulder">[] = [
        {
            title: "Основные параметры",
            sizes: {xs: 12},
            fields: [
                {
                    field: "shoulder_type",
                    title: "Тип плеча",
                    defaultValue: null,
                    size: {xs: 12},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_LEG_TYPES",
                        fieldCode: "shoulder_type",
                        targetEntityType: "TransportShoulderType",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_shoulder_type",
                        prefix: (<CommuteIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
            ],
        },
        {
            title: "Откуда",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "from_location_ids",
                    title: "Откуда",
                    defaultValue: [],
                    isVisible: values => {
                        return values ? ["1", "2", "3"].indexOf(values[`shoulder_type`] as string) === -1 : false
                    },
                    validation: [
                        ValueExistsInOneOfFields({
                            fields: ["from_terminal_ids", "from_location_ids"],
                            errorMessage: "Необходимо заполнитель либо терминалы отправления, либо места отправления",
                        }),
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
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "from_terminal_ids",
                    title: "Откуда (терминалы)",
                    defaultValue: [],
                    validation: [
                        ValueExistsInOneOfFields({
                            fields: ["from_terminal_ids", "from_location_ids"],
                            errorMessage: "Необходимо заполнитель либо терминалы отправления, либо места отправления",
                        }),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_TERMINALS",
                        fieldCode: "from_terminal_ids",
                        targetEntityType: "TransportTerminal",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_terminal",
                        chipIcon: (<MyLocationIcon />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
            ],
        },
        {
            title: "Куда",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "to_location_ids",
                    title: "Куда",
                    defaultValue: [],
                    isVisible: values => {
                        return values ? ["1", "2", "3"].indexOf(values[`shoulder_type`] as string) === -1 : false
                    },
                    validation: [
                        ValueExistsInOneOfFields({
                            fields: ["to_location_ids", "to_terminal_ids"],
                            errorMessage: "Необходимо заполнитель либо терминалы назначения, либо места назначения",
                        }),
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
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "to_terminal_ids",
                    title: "Куда (терминалы)",
                    defaultValue: [],
                    validation: [
                        ValueExistsInOneOfFields({
                            fields: ["to_location_ids", "to_terminal_ids"],
                            errorMessage: "Необходимо заполнитель либо терминалы назначения, либо места назначения",
                        }),
                    ],
                    ...MultipleRelationWithSearchField({
                        editAccessRule: "CHANGE_TRANSPORT_TERMINALS",
                        fieldCode: "to_terminal_ids",
                        targetEntityType: "TransportTerminal",
                        captionFields: ["default_name"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetNamedLocalizedEntityTitleForRelationField,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "transport_terminal",
                        chipIcon: (<LocationDisabledIcon />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
            ],
        },
        {
            title: "",
            sizes: {xs: 12},
            isVisible: values => values.shoulder_type === "5",
            component: OfferConditionsGroup,
            fields: [
                {
                    field: "shoulder_steps",
                    title: "Этапы перевозки",
                    defaultValue: [],
                    size: {xs: 12},
                    validation: [],
                    ...ShoulderStepsField({
                        fieldCode: "shoulder_steps",
                        shoulderTypeFieldCode: "shoulder_type",
                    }),
                },
            ],
        },
        {
            title: "Подрядчик/Перевозчик",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "contractor_id",
                    title: "Подрядчик",
                    defaultValue: null,
                    size: {md: 6, xs: 12},
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
                    }),
                },
                {
                    field: "carrier_id",
                    title: "Перевозчик",
                    defaultValue: null,
                    size: {md: 6, xs: 12},
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
                        prefix: (<CommuteIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`,
                    }),
                },
            ],
        },
        {
            title: "Прочее",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "distance",
                    title: "Расстояние перевозки",
                    defaultValue: 0,
                    size: {xs: 8},
                    validation: [
                        MinimalOrEqualsValueValidator({minimalValue: 0})
                    ],
                    ...IntField({
                        tooltip: `Расстояние перевозки`,
                        prefix: (<HeightIcon color={`primary`} />),
                    }),
                },
                {
                    field: "distance_unit",
                    title: "Ед. изм.",
                    defaultValue: "km",
                    size: {xs: 4},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...SelectField({
                        variants: [
                            {
                                value: "km",
                                caption: "км",
                            },
                            {
                                value: "nm",
                                caption: "мм",
                            },
                        ],
                        tooltip: `Единица измерения расстояния перевозки`
                    }),
                },
            ]
        },
    ];
    schema: "transport_shoulder" = "transport_shoulder";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_SHOULDERS", "READ_TRANSPORT_SHOULDERS"];
    listPageUrl: PageUrl = {href: "/transport/shoulder"};
    listPageConfig: ListPageConfiguration<"transport_shoulder"> = new TransportShoulderConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/shoulder/edit/${primaryKey}`, href: `/transport/shoulder/edit/[entityId]`});
    entityName: string = "Плечо";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать плечо`
        }

        return `Редактировать плечо №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать плечо`
        }

        return `Редактировать плечо №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;

    customComponentLoadData: {(values: EntityValues<"transport_shoulder">, primaryKey: any, token?: string): Promise<any>};
    bottomCustomComponent: React.ComponentType<CustomComponentProps<"transport_shoulder">>;

    constructor() {
        const offers = EntityEditShoulderOffersListComponent({
            addPageUrlGenerator: shoulderId => ({
                href: `/transport/shoulder/[shoulderId]/offer/add`,
                as: `/transport/shoulder/${shoulderId}/offer/add`,
            }),
            editPageUrlGenerator: (primaryKey, shoulderId) => ({
                href: `/transport/shoulder/[shoulderId]/offer/edit/[entityId]`,
                as: `/transport/shoulder/${shoulderId}/offer/edit/${primaryKey}`,
            })
        });

        this.customComponentLoadData = offers.customComponentLoadData;
        this.bottomCustomComponent = offers.bottomCustomComponent
    }
}