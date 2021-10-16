import {InitialDataGetterInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityValues} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";

/**
 * Сервис получения базовых данных полей сущности
 */
export class InitialDataGetter implements InitialDataGetterInterface {
    /**
     * Получение базовых значений полей сущности
     * @param schema
     * @param _
     */
    async GetInitialValues<T extends keyof Schemas>(schema: T, _: any): Promise<EntityValues<T>> {
        // @ts-ignore
        let data: EntityValues<T> = {}

        const config = editSchemaConfiguration()[schema]
        if (!config) return data

        await Promise.all(config.groups.map(group => {
            return Promise.all(group.fields.map(async field => {
                if (typeof field.defaultValue === "function") {
                    // @ts-ignore
                    data[field.field] = await field.defaultValue({})

                    return
                }

                // @ts-ignore
                data[field.field] = field.defaultValue
            }))
        }))

        return data
    }
}