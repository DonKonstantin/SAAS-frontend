import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {MultipleStringField} from "../../../components/EditPage/Fields/MultipleStringField";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import CommentIcon from '@material-ui/icons/Comment';
import React from "react";
import {TnvedCompanyProductConfiguration} from "../list/tnved_company_product";

export class TnvedCompanyProductEdit implements EditPageConfiguration<"tnved_company_product"> {
    groups: EditFormGroup<"tnved_company_product">[] = [
        {
            title: "Системные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "sku",
                    title: "Артикул",
                    size: {xs: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 0}),
                    ],
                    ...StringField({tooltip: `Артикул товара. Обязательное для заполнения поле.`}),
                },
                {
                    field: "category_id",
                    title: "Категория",
                    defaultValue: null,
                    size: {xs: 6},
                    validation: [
                        ValueExistsValidator({errorMessage: `Необходимо выбрать один из вариантов значения`}),
                    ],
                    ...RelationWithSearchField({
                        editAccessRule: "CHANGE_TNVED_CATEGORIES",
                        fieldCode: "category_id",
                        targetEntityType: "TnvedCompanyCategory",
                        captionFields: ["name"],
                        localizedFields: [],
                        captionGenerator: option => {
                            return option.fields.name[0]
                        },
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "tnved_company_category",
                        prefix: (<CommentIcon color={`primary`}/>),
                        targetSchemaDefaultValueField: `name`,
                        tooltip: "Категория товара"
                    }),
                },
                {
                    field: "company_id",
                    title: "ID компании",
                    defaultValue: 1,
                    size: {xs: 6},
                    validation: [],
                    ...IntField({tooltip: `Это поле предназначено для будущих работ по ЛК. Не менять значение!`}),
                },
                {
                    field: "tnved_code",
                    title: "Код ТНВЭД",
                    size: {xs: 6},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 9}),
                    ],
                    ...StringField({tooltip: `ТНВЭД код товара. Обязательное поле.`}),
                },
            ]
        },
        {
            title: "Описание",
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "Название",
                    defaultValue: [],
                    validation: [],
                    ...MultipleStringField({tooltip: `Название товара. Используется для подстановки в спецификацию.`}),
                },
            ]
        }
    ];
    schema: "tnved_company_product" = "tnved_company_product";
    editAccessRules: string[] = ["CHANGE_TNVED_PRODUCTS", "READ_TNVED_PRODUCTS"];
    listPageUrl: PageUrl = {href: "/tnved/company-products"};
    listPageConfig: ListPageConfiguration<"tnved_company_product"> = new TnvedCompanyProductConfiguration();
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = primaryKey => ({
        as: `/tnved/company-products/edit/${primaryKey}`,
        href: `/tnved/company-products/edit/[entityId]`
    });
    entityName: string = "Товар ТНВЭД";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание товара ТНВЭД`
        }

        return `Редактирование товара ТНВЭД #${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание товара ТНВЭД`
        }

        return `Редактирование товара ТНВЭД #${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}