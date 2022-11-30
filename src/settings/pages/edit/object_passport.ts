import DateField from "components/EditPage/Fields/DateField";
import FloatField from "components/EditPage/Fields/FloatField";
import HiddenField from "components/EditPage/Fields/HiddenField";
import IntField from "components/EditPage/Fields/IntField";
import MultilineStringField from "components/EditPage/Fields/MultilineStringField";
import StringField from "components/EditPage/Fields/StringField";
import ObjectPassportAddComponent from "components/EditPageCustomFields/ObjectPassportAddComponent";
import { getCurrentState } from "context/AuthorizationContext";
import { EmailValidator } from "services/validation/validators/emailValidator";
import { MinimalLengthValidator } from "services/validation/validators/minimalLength";
import { ValueExistsValidator } from "services/validation/validators/valueExists";
import { EditFormGroup, EditPageConfiguration } from "../system/edit";
import { PageUrl } from "../system/list";

export class ObjectPassportEditPageConfig
  implements EditPageConfiguration<"object_passport">
{
  readonly projectId = getCurrentState().project;

  groups: EditFormGroup<"object_passport">[] = [
    {
      sizes: { xs: 12 },
      fields: [
        {
          field: "user_name",
          title: "objects-passport-list.edit.fields.user_name",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: StringField,
        },
        {
          field: "project_id",
          title: "",
          size: { xs: 12 },
          defaultValue: this.projectId,
          validation: [],
          component: HiddenField,
        },
        {
          field: "user_inn",
          title: "objects-passport-list.edit.fields.user_inn",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({}), MinimalLengthValidator({minimalLength: 9})],
          component: IntField,
        },
        {
          field: "director",
          title: "objects-passport-list.edit.fields.director",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: StringField,
        },
        {
          field: "accountant",
          title: "objects-passport-list.edit.fields.accountant",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: StringField,
        },
        {
          field: "site_name",
          title: "objects-passport-list.edit.fields.site_name",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: StringField,
        },
        {
          field: "locality",
          title: "objects-passport-list.edit.fields.locality",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({})],
          component: StringField,
        },
        {
          field: "rao_email",
          title: "objects-passport-list.edit.fields.rao_email",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({}), EmailValidator({})],
          component: StringField,
        },
        {
          field: "rao_date_of_conclusion",
          title: "objects-passport-list.edit.fields.rao_date_of_conclusion",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: DateField,
        },
        {
          field: "rao_license_number",
          title: "objects-passport-list.edit.fields.rao_license_number",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: StringField,
        },
        {
          field: "rao_requisites",
          title: "objects-passport-list.edit.fields.rao_requisites",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: MultilineStringField,
        },
        {
          field: "rao_authors_fee_for_on_to_eleven_months",
          title:
            "objects-passport-list.edit.fields.rao_authors_fee_for_on_to_eleven_months",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: FloatField,
        },
        {
          field: "rao_authors_fee_for_december",
          title:
            "objects-passport-list.edit.fields.rao_authors_fee_for_december",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: FloatField,
        },
        {
          field: "vois_email",
          title: "objects-passport-list.edit.fields.vois_email",
          size: { xs: 12 },
          defaultValue: "",
          validation: [ValueExistsValidator({}), EmailValidator({})],
          component: StringField,
        },
        {
          field: "vois_date_of_conclusion",
          title: "objects-passport-list.edit.fields.vois_date_of_conclusion",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: DateField,
        },
        {
          field: "vois_license_number",
          title: "objects-passport-list.edit.fields.vois_license_number",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: StringField,
        },
        {
          field: "vois_fee",
          title: "objects-passport-list.edit.fields.vois_fee",
          size: { xs: 12 },
          defaultValue: "",
          validation: [],
          component: FloatField,
        },
      ],
      component: ObjectPassportAddComponent,
    },
  ];
  schema: "object_passport" = "object_passport";
  listPageUrl: { (): PageUrl } = () => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/object-passports/",
      as: `/domain/${domain}/project/${project}/object-passports/`,
    };
  };
  isCopyEnabled: boolean = true;
  isSaveAndCloseEnabled: boolean = true;
  isSaveEnabled: boolean = true;
  editPageUrlGenerator: { (primaryKey: any): PageUrl } = (pk) => {
    const { domain, project } = getCurrentState();

    return {
      href: "/domain/[domainId]/project/[projectId]/object-passports/edit/[entityId]",
      as: `/domain/${domain}/project/${project}/object-passports/edit/${pk}`,
    };
  };
}
