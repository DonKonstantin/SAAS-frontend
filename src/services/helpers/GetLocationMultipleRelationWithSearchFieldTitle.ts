import {SearchUntypedLoaderItem} from "../searchUntypedLoader/interfaces";
import {Collection} from "../types";
import {LocalizedField} from "../../components/EditPage/Fields/MultipleRelationWithSearchField/MultipleRelationWithSearchFieldComponent";

/**
 * Функция получения локализованного названия гео-объекта для поля множественного отношения с поиском.
 * @param option
 * @param localizedFields
 */
export function GetLocationMultipleRelationWithSearchFieldTitle(
    option: SearchUntypedLoaderItem<"location">,
    localizedFields?: Collection<LocalizedField>
): string {
    let name = option.fields.default_name || "";
    if (localizedFields && localizedFields.localized_names && localizedFields.localized_names.secondary.length > 0) {
        name = localizedFields.localized_names.secondary;
    }

    return `${name} (${option.fields.symbol_code})`
}