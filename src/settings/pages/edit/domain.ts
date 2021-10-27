import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import CheckboxField from "../../../components/EditPage/Fields/CheckboxField";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";

export class DomainEditPageConfig implements EditPageConfiguration<"domain"> {
    groups: EditFormGroup<"domain">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.domain.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "domain", field: "name"}),
                    ],
                    component: StringField
                },
                {
                    field: "active",
                    title: "pages.domain.edit.fields.active",
                    size: {xs: 12},
                    defaultValue: true,
                    validation: [],
                    component: CheckboxField
                },
            ]
        },
    ];
    schema: "domain" = "domain";
    listPageUrl: PageUrl = {href: "/domain"};
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => ({
        href: "/domain/edit/[entityId]",
        as: `/domain/edit/${pk}`
    });
}