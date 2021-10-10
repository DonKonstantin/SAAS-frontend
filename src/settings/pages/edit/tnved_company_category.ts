import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../../../components/Breadcrumbs";
import {ListPageConfiguration} from "../system/list";
import {StringField} from "../../../components/EditPage/Fields/StringField";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import {TnvedCompanyCategoryConfiguration} from "../list/tnved_company_category";
import {IntField} from "../../../components/EditPage/Fields/IntField";
import {MultipleStringField} from "../../../components/EditPage/Fields/MultipleStringField";

export class TnvedCompanyCategoryEdit implements EditPageConfiguration<"tnved_company_category"> {
    groups: EditFormGroup<"tnved_company_category">[] = [
        {
            title: "Системные поля",
            sizes: {xs: 12},
            fields: [
                {
                    field: "code",
                    title: "Код категории",
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 5}),
                    ],
                    ...StringField({tooltip: `Код категории. По сути должен состоять из 6 знаков кода ТНВЭД.`}),
                },
                {
                    field: "company_id",
                    title: "ID компании",
                    defaultValue: 1,
                    validation: [],
                    ...IntField({tooltip: `Это поле предназначено для будущих работ по ЛК. Не менять значение!`}),
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
                    ...MultipleStringField({tooltip: `Название категории. Используется для подстановки в спецификацию.`}),
                },
            ]
        }
    ];
    schema: "tnved_company_category" = "tnved_company_category";
    editAccessRules: string[] = ["CHANGE_TNVED_CATEGORIES", "READ_TNVED_CATEGORIES"];
    listPageUrl: PageUrl = {href: "/tnved/company-categories"};
    listPageConfig: ListPageConfiguration<"tnved_company_category"> = new TnvedCompanyCategoryConfiguration();
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = primaryKey => ({
        as: `/tnved/company-categories/edit/${primaryKey}`,
        href: `/tnved/company-categories/edit/[entityId]`
    });
    entityName: string = "Категория ТНВЭД";
    header: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание категории ТНВЭД`
        }

        return `Редактирование категории ТНВЭД #${primaryKey}`
    };
    title: { (primaryKey: any): string } = primaryKey => {
        if (!primaryKey) {
            return `Создание категории ТНВЭД`
        }

        return `Редактирование категории ТНВЭД #${primaryKey}`
    };

    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
}