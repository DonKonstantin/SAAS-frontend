import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {LocationsConfiguration} from "../list/locations";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {LocalizedStringField} from "../../../components/EditPage/Fields/LocalizedStringField";
import {ParentTreeValidator} from "../../../services/validation/validators/parentTreeValidator";
import EditLocationIcon from '@material-ui/icons/EditLocation';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import IsoIcon from '@material-ui/icons/Iso';
import React from "react";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import {GetLocationMultipleRelationWithSearchFieldTitle} from "../../../services/helpers/GetLocationMultipleRelationWithSearchFieldTitle";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {CheckboxField} from "../../../components/EditPage/Fields/CheckboxField";
import {v4} from "uuid";
import {FloatField} from "../../../components/EditPage/Fields/FloatField";
import {MultipleStringField} from "../../../components/EditPage/Fields/MultipleStringField";

export class LocationsEdit implements EditPageConfiguration<"locations"> {
    groups: EditFormGroup<"locations">[] = [
        {
            title: "Родители",
            sizes: {xs: 12},
            fields: [
                {
                    field: "parent",
                    title: "Родительский гео-объект",
                    size: {xs: 12},
                    defaultValue: null,
                    validation: [
                        ParentTreeValidator({
                            field: "parent",
                            method: "getAllChildrenLocationsForPassedParent",
                            methodField: "location",
                            schema: "locations",
                        })
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_LOCATIONS",
                        fieldCode: "parent",
                        targetEntityType: "Location",
                        captionFields: ["default_name", "symbol_code"],
                        localizedFields: ["localized_names"],
                        captionGenerator: GetLocationMultipleRelationWithSearchFieldTitle,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "locations",
                        prefix: (<EditLocationIcon color={`primary`} />),
                        targetSchemaDefaultValueField: `default_name`,
                        tooltip: `Родительский гео-объект текущей сущности. Если необходимо создать объект в корне (верхнего уровня), то данное поле необходимо оставить пустым.`,
                    }),
                },
                {
                    field: "is_country",
                    title: "Является страной",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Данный флаг отмечает эту локацию как отдельную страну. Для расчета транспорта необходимо точно знать идет ли международная перевозка или внутренняя. По сути все локации, включенные в текущую будут относится к одной стране. В ситуации, когда одна страна находится в другой (Ватикан в Италии) будет использоваться наиболее глубокая по вложенности страна, т.е. при перевозках из Ватикана расчет будет идти по Ватикану, а не по Италии.`
                    }),
                },
                {
                    field: "populated_area",
                    title: "Является населенным пунктом",
                    defaultValue: false,
                    size: {xs: 12, md: 6},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `Данный флаг используется для определения локаций, а именно, какие из них являются населенными пунктами.`
                    }),
                },
            ]
        },
        {
            title: "Локализация названий",
            sizes: {md: 6, xs: 12},
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
                        tooltip: `Название гео-объекта по умолчанию. Используется в случае, если отсутствует локализованная версия названия.`,
                    }),
                },
                {
                    field: "localized_names",
                    title: "Название",
                    defaultValue: "",
                    validation: [],
                    ...LocalizedStringField({tooltip: lang => `Название гео-объекта. Язык - ${lang}`, field: "localized_names"}),
                },
            ]
        },
        {
            title: "Системные поля",
            sizes: {md: 6, xs: 12},
            fields: [
                {
                    field: "symbol_code",
                    title: "ISO",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<IsoIcon color={`primary`} />),
                        tooltip: `Уникальный символьный код локации. Используется для импорта. Необходимо использовать код локации по классификатору ISO.`,
                    }),
                },
                {
                    field: "import_id",
                    title: "ID (импорт)",
                    size: {xs: 12},
                    defaultValue: async (): Promise<string> => v4(),
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<ShuffleIcon color={`primary`} />),
                        tooltip: `Идентификатор гео-объекта из файлов импорта. Желательно не изменять вручную.`,
                    }),
                },
                {
                    field: "is_user_searchable",
                    title: "Разрешен поиск этой локации с использованием поля поиска в публичной части",
                    defaultValue: true,
                    size: {xs: 12},
                    validation: [],
                    ...CheckboxField({
                        tooltip: `По умолчанию, при расчете перевозки, пользователь может искать любые локации для выбора. Данный флаг позволяет исключать из поиска текущую локацию.`
                    }),
                },
            ],
        },
        {
            title: "Параметры локации",
            sizes: {xs: 12},
            fields: [
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
                    field: "population",
                    title: "Население",
                    defaultValue: 0,
                    size: {xs: 6},
                    validation: [],
                    ...FloatField({
                        tooltip: `Население, проживающее в данном регионе. Используется для построения весов при поиске локаций.`
                    }),
                },
                {
                    field: "search_tags",
                    title: "Поисковый тег",
                    defaultValue: [""],
                    validation: [],
                    ...MultipleStringField({
                        tooltip: `Поисковые теги используются для дополнительной точности поиска по данному типу сущности.`
                    }),
                },
            ]
        },
    ];
    schema: "locations" = "locations";
    storeSchema: "location" = "location";
    editAccessRules: string[] = ["READ_LOCATIONS", "CHANGE_LOCATIONS"];
    listPageUrl: PageUrl = {href: "/locations"};
    listPageConfig: ListPageConfiguration<"locations"> = new LocationsConfiguration();
    editPageUrlGenerator: {(primaryKey: any): PageUrl} = primaryKey => ({as: `/locations/edit/${primaryKey}`, href: `/locations/edit/[entityId]`});
    entityName: string = "Гео-объект";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание гео-объекта`
        }

        return `Редактирование гео-объекта №${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание гео-объекта`
        }

        return `Редактирование гео-объекта №${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}