import {AdditionDataGetterInterface} from "./interfaces";
import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";
import {editSchemaConfiguration} from "../../../settings/pages";

/**
 * Сервис получения дополнительных данных полей сущности
 */
export class AdditionDataGetter implements AdditionDataGetterInterface {
    /**
     * Получение дополнительных данных для полей сущности
     * @param schema
     * @param primaryKey
     * @param entityValues
     */
    async GetAdditionData<T extends keyof Schemas>(schema: T, primaryKey: any, entityValues: EntityValues<T>): Promise<{ [F in keyof Schemas[T]['fields']]?: any }> {
        let result: { [F in keyof Schemas[T]['fields']]?: any } = {};

        const config = editSchemaConfiguration()[schema];
        if (!config) return result;

        await Promise.all(config.groups.map(group => {
            return Promise.all(group.fields.map(async field => {
                if (typeof field.additionData !== "function") {
                    return
                }

                // @ts-ignore
                result[field.field] = await field.additionData(entityValues, primaryKey)
            }))
        }))

        return result
    }
}