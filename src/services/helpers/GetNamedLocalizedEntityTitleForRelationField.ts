import {SearchUntypedLoaderItem} from "../searchUntypedLoader/interfaces";
import {Collection} from "../types";
import {LocalizedField} from "../../components/EditPage/Fields/MultipleRelationWithSearchField/MultipleRelationWithSearchFieldComponent";
import {Schemas} from "../../settings/schema";

/**
 * Функция получения локализованного названия гео-объекта для поля множественного отношения с поиском.
 * @param option
 * @param localizedFields
 */
export function GetNamedLocalizedEntityTitleForRelationField(
    option: SearchUntypedLoaderItem<keyof Schemas>,
    localizedFields?: Collection<LocalizedField>
): string {
    let name = option.fields.default_name || "";
    if (localizedFields && localizedFields.localized_names && localizedFields.localized_names.secondary.length > 0) {
        name = localizedFields.localized_names.secondary;
    }

    let primaryName = option.fields.default_name || "";
    if (localizedFields && localizedFields.localized_names && localizedFields.localized_names.primary.length > 0) {
        primaryName = localizedFields.localized_names.primary;
    }

    return `${name}${primaryName.length > 0 ? ` (${primaryName})` : ``}`
}