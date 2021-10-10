import {Schemas} from "../../settings/schema";
import {EntityValues} from "../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../settings/pages";
import IsGroupVisible from "./IsGroupVisible";

// Helper для получения списка полей, которые можно сохранять. Исключает поля, которые скрыты
function GetFieldToStoreFromConfiguration <T extends keyof Schemas>(schema: T, values: EntityValues<T>): (keyof Schemas[T]['fields'])[] {
    const config = editSchemaConfiguration()[schema];
    if (!config) {
        return []
    }

    const groups = config.groups.map(group => {
        if (!IsGroupVisible(group, values)) {
            return []
        }

        return group.fields
            .filter(field => {
                if (field.isVisible && !field.isVisible(values)) {
                    return false
                }

                return !field.disableFieldMainStore || !field.disableFieldMainStore(values)
            })
            .map(field => field.field)
    });

    // @ts-ignore
    return [].concat(...groups)
}

export default GetFieldToStoreFromConfiguration