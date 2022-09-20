import {
  EditPageLinkGenerator,
  ListPageConfiguration,
  PageUrl,
} from "../system/list";
import { FilterFieldsConfiguration } from "../../../services/listDataLoader/filterLoader/types";
import { ListFieldsConfiguration } from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

/**
 * Конфигурация листинга паспортов объектов
 */
export class ObjectsPassportListingConfiguration
  implements ListPageConfiguration<"object_passport">
{
  filter: FilterFieldsConfiguration<"object_passport"> = {};
  listFields: ListFieldsConfiguration<"object_passport"> = {
    fields: {
      user_name: {
        field: "user_name",
        title: "objects-passport-list.list-headers.user-name",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      site_name: {
        field: "site_name",
        title: "objects-passport-list.list-headers.site-name",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      locality: {
        field: "locality",
        title: "objects-passport-list.list-headers.locality",
        isEnabled: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      id: {
        field: "id",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      accountant: {
        field: "accountant",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      director: {
        field: "director",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      project_id: {
        field: "project_id",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_authors_fee_for_december: {
        field: "rao_authors_fee_for_december",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_authors_fee_for_on_to_eleven_months: {
        field: "rao_authors_fee_for_on_to_eleven_months",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_date_of_conclusion: {
        field: "rao_date_of_conclusion",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_email: {
        field: "rao_email",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_license_number: {
        field: "rao_license_number",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      rao_requisites: {
        field: "rao_requisites",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      user_inn: {
        field: "user_inn",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      vois_date_of_conclusion: {
        field: "vois_date_of_conclusion",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      vois_email: {
        field: "vois_email",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      vois_fee: {
        field: "vois_fee",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
      vois_license_number: {
        field: "vois_license_number",
        title: "",
        isEnabled: true,
        isHidden: true,
        fieldType: {
          config: undefined,
          type: "Simple",
        },
      },
    },
    actions: ListPageEditDeleteButtons,
  };
  schema: "object_passport" = "object_passport";
  elementsPerPage: number = 25;
  editPageUrl: EditPageLinkGenerator = (pk) => ({
    href: "/projects/object-passports/edit/[entityId]",
    as: `/projects/object-passports/edit/${pk}`,
  });
  addPageUrl: PageUrl = { href: "/projects/object-passports/add" };
  additionButtonTitle = 'objects-passport-list.addition-item-button.title';
  hidePagination = true;
  hideFilter = true;
}
