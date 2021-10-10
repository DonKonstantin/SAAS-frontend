import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {TnvedCodeConfiguration} from "../list/tnved_code";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import EditLocationIcon from '@material-ui/icons/EditLocation';
import React from "react";
import {FeatherIcon} from "../../../components/CustomIcon/icons";
import {RelationWithSearchField} from "../../../components/EditPage/Fields/RelationWithSearchField";
import {TextareaField} from "../../../components/EditPage/Fields/TextareaField";

export class TnvedCodeEdit implements EditPageConfiguration<"tnved_code"> {
    groups: EditFormGroup<"tnved_code">[] = [
        {
            title: "Родители",
            sizes: {xs: 12},
            fields: [
                {
                    field: "parent",
                    title: "Родительский код",
                    size: {xs: 6},
                    defaultValue: null,
                    validation: [],
                    ...RelationWithSearchField({
                        editAccessRule: "EDIT_TNVED_CODES",
                        fieldCode: "parent",
                        targetEntityType: "TnvedCode",
                        captionFields: ["name"],
                        localizedFields: [],
                        captionGenerator: option => option.fields.name,
                        targetSchemaPrimaryKey: "id",
                        targetSchema: "tnved_code",
                        prefix: (<EditLocationIcon color={`primary`}/>),
                        targetSchemaDefaultValueField: `name`,
                        tooltip: `Родительский код для текущей сущности. Если необходимо создать объект в корне (верхнего уровня), то данное поле необходимо оставить пустым.`,
                    }),
                },
                {
                    field: "code",
                    title: "Код ТНВЭД",
                    defaultValue: "",
                    size: {xs: 6},
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`}/>),
                        tooltip: `Код ТНВЭД.`,
                    }),
                },
            ]
        },
        {
            title: "Локализация названий",
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "Название",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 1})
                    ],
                    ...StringField({
                        prefix: (<FeatherIcon color={`primary`}/>),
                        tooltip: `Название кода.`,
                    }),
                },
                {
                    field: "description",
                    title: "Описание",
                    defaultValue: "",
                    validation: [],
                    ...TextareaField({
                        tooltip: `Название кода.`,
                    }),
                },
            ]
        },
        {
            title: "Источники",
            sizes: {xs: 12},
            fields: [
                {
                    field: "vendor",
                    title: "ID источника",
                    defaultValue: "",
                    size: {xs: 12},
                    validation: [],
                    ...StringField({
                        tooltip: `ID источника из импорта.`,
                    }),
                },
            ]
        },
    ];
    schema: "tnved_code" = "tnved_code";
    storeSchema: "tnved_code_edit" = "tnved_code_edit";
    editAccessRules: string[] = ["EDIT_TNVED_CODES"];
    listPageUrl: PageUrl = {href: "/tnved/code"};
    listPageConfig: ListPageConfiguration<"tnved_code"> = new TnvedCodeConfiguration();
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = primaryKey => ({
        as: `/tnved/code/edit/${primaryKey}`,
        href: `/tnved/code/edit/[entityId]`
    });
    entityName: string = "Код ТНВЭД";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание кода ТНВЭД`
        }

        return `Редактирование кода ТНВЭД #${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание кода ТНВЭД`
        }

        return `Редактирование кода ТНВЭД #${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}