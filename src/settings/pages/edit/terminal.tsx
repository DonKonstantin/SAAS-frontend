import {CustomComponentProps, EditFormGroup, EditPageConfiguration, EntityValues} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {CityIcon, FeatherIcon} from "../../../components/CustomIcon/icons";
import React from "react";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {TransportTerminalConfiguration} from "../list/terminal";
import {EntityEditTerminalOffersListComponent} from "../../../custom/containers/EntityEditTerminalOffersListComponent";
import {GetLocationMultipleRelationWithSearchFieldTitle} from "../../../services/helpers/GetLocationMultipleRelationWithSearchFieldTitle";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import ClearGroup from "../../../components/EditPage/ClearGroup";
import FilesField from "../../../components/EditPage/Fields/FilesField";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import IsoIcon from '@material-ui/icons/Iso';

export class TransportTerminalEdit implements EditPageConfiguration<"transport_terminal"> {
    groups: EditFormGroup<"transport_terminal">[] = [
        {
            title: "Настройки",
            sizes: {xs: 12},
            fields: [
                {
                    field: "location_id",
                    title: "Местоположение",
                    defaultValue: null,
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_LOCATIONS",
                        fieldCode: "location_id",
                        targetEntityType: "Location",
                        captionFields: ["default_name", "symbol_code"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetLocationMultipleRelationWithSearchFieldTitle,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "locations",
                        prefix: (<CityIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`
                    }),
                },
                {
                    field: "latitude",
                    title: "Широта",
                    defaultValue: 0,
                    size: {xs: 3},
                    validation: [],
                    ...FloatField({
                        tooltip: `Географические координаты. Широта.`
                    }),
                },
                {
                    field: "longitude",
                    title: "Долгота",
                    defaultValue: 0,
                    size: {xs: 3},
                    validation: [],
                    ...FloatField({
                        tooltip: `Географические координаты. Долгота.`
                    }),
                },
                {
                    field: "symbol_code",
                    title: "Символьный код",
                    size: {xs: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<IsoIcon color={`primary`} />),
                        tooltip: `Уникальный символьный код терминала.`,
                    }),
                },
            ]
        },
        {
            title: "Основные поля",
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
                        tooltip: `Название терминала. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название терминала. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Аббревиатуры",
            sizes: {xs: 12, md: 6},
            fields: [
                {
                    field: "default_abbreviation",
                    title: "Аббревиатура по умолчанию (англ.)",
                    defaultValue: "",
                    validation: [],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`} />),
                        tooltip: `Аббревиатура терминала по умолчанию. Используется в случае, если отсутствует локализованная версия аббревиатуры.`,
                    }),
                },
                {
                    field: "localized_abbreviations",
                    title: "Аббревиатура",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Аббревиатура терминала. Язык - ${lang}`, field: "localized_abbreviations"}),
                },
            ]
        },
        {
            title: "Файлы",
            sizes: {xs: 12},
            component: ClearGroup,
            fields: [
                {
                    field: "files",
                    title: "Условия перевозки",
                    defaultValue: [],
                    validation: [],
                    size: {xs: 12},
                    ...FilesField({
                        tooltip: "Загрузка файлов условий перевозки для терминала",
                        field: "files",
                        availableExtensions: [
                            "doc",
                            "docx",
                            "pdf",
                        ]
                    })
                }
            ],
        },
    ];
    schema: "transport_terminal" = "transport_terminal";
    editAccessRules: string[] = ["CHANGE_TRANSPORT_TERMINALS", "READ_TRANSPORT_TERMINALS"];
    listPageUrl: PageUrl = {href: "/transport/terminal"};
    listPageConfig: ListPageConfiguration<"transport_terminal"> = new TransportTerminalConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/transport/terminal/edit/${primaryKey}`, href: `/transport/terminal/edit/[entityId]`});
    entityName: string = "Терминал";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать терминал`
        }

        return `Редактировать терминал №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создать терминал`
        }

        return `Редактировать терминал №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;

    customComponentLoadData: {(values: EntityValues<"transport_terminal">, primaryKey: any, token?: string): Promise<any>};
    bottomCustomComponent: React.ComponentType<CustomComponentProps<"transport_terminal">>;

    constructor() {
        const offers = EntityEditTerminalOffersListComponent({
            addPageUrlGenerator: terminalId => ({
                href: `/transport/terminal/[terminalId]/offer/add`,
                as: `/transport/terminal/${terminalId}/offer/add`,
            }),
            editPageUrlGenerator: (primaryKey, terminalId) => ({
                href: `/transport/terminal/[terminalId]/offer/edit/[entityId]`,
                as: `/transport/terminal/${terminalId}/offer/edit/${primaryKey}`,
            })
        });

        this.customComponentLoadData = offers.customComponentLoadData;
        this.bottomCustomComponent = offers.bottomCustomComponent
    }
}