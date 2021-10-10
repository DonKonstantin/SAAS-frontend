import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {DropboxIcon, FireIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {TransportTerminalOfferConfiguration} from "../list/terminalOffer";
import {AdditionEditParams} from "../../../containers/EntityEdit";
import {HiddenField} from "../../../components/EditPage/Fields/HiddenField";
import HiddenGroup from "../../../components/EditPage/HiddenGroup";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {GetNamedLocalizedEntityTitleForRelationField} from "../../../services/helpers/GetNamedLocalizedEntityTitleForRelationField";
import {MultipleRelationWithSearchField} from "../../../components/EditPage/Fields/MultipleRelationWithSearchField";
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import OfferConditionsGroup from "../../../custom/components/EditPage/OfferConditionsGroup";
import {LoadingUnloadingOfferField} from "../../../custom/components/EditPage/Fields/LoadingUnloadingOfferField";

export class TransportTerminalOfferEdit implements EditPageConfiguration<"transport_terminal_offer"> {
    groups: EditFormGroup<"transport_terminal_offer">[] = [
        {
            title: "",
            sizes: {xs: 12},
            fields: [
                {
                    field: "cargo_type_group",
                    title: "Группа грузов",
                    defaultValue: "1",
                    size: {xs: 12, md: 6},
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
                    field: "delivery_modes",
                    title: "Режимы перевозки",
                    defaultValue: ["2"],
                    size: {xs: 12, md: 6},
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
                    field: "containers",
                    title: "Контейнеры, доступные по услуге",
                    defaultValue: [],
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
            ]
        },
        {
            title: "",
            sizes: {xs: 12},
            isVisible: values => !!values.cargo_type_group,
            component: OfferConditionsGroup,
            fields: [
                {
                    field: "loading_offers",
                    title: "Условия ПРР",
                    defaultValue: [],
                    validation: [],
                    ...LoadingUnloadingOfferField({
                        fieldCode: 'loading_offers',
                        cargoTypeGroupCode: 'cargo_type_group',
                        allowanceGroupsAvailableToChoose: ["1", "4", "5"],
                        allowanceGroupsCustomNames: {
                            "4": "Для отправляемых грузов",
                            "5": "Для прибывающих грузов",
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
                    field: "terminal_id",
                    title: "ID терминала",
                    defaultValue: null,
                    validation: [],
                    ...HiddenField({}),
                },
            ]
        },
    ];
    schema: "transport_terminal_offer" = "transport_terminal_offer";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_TERMINALS", "READ_TRANSPORT_TERMINALS"];
    listPageUrl: PageUrl = {href: "/transport/terminal"};
    listPageConfig: ListPageConfiguration<"transport_terminal_offer"> = new TransportTerminalOfferConfiguration();
    editPageUrlGenerator: {(primaryKey: any, additionEditParams: AdditionEditParams): PageUrl} = (
        primaryKey: any,
        additionEditParams: AdditionEditParams
    ): PageUrl => ({
        as: `/transport/terminal/${additionEditParams?.defaultValues?.terminal_id}/offer/edit/${primaryKey}`,
        href: `/transport/terminal/[terminalId]/offer/edit/[entityId]`,
    });
    entityName: string = "Услуга терминала";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать услугу терминала`
        }

        return `Редактировать услугу терминала №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать услугу терминала`
        }

        return `Редактировать услугу терминала №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}