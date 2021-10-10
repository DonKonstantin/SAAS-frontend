import {AdditionDataGetterInterface} from "./interfaces";
import {EntityValues} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";
import {editSchemaConfiguration} from "../../../settings/pages";

/**
 * Сервис получения дополнительных данных полей сущности
 */
export class AdditionDataGetter implements AdditionDataGetterInterface {
    private readonly token?: string;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.token = token
    }

    /**
     * Получение дополнительных данных для полей сущности
     * @param schema
     * @param primaryKey
     * @param entityValues
     */
    async GetAdditionData<T extends keyof Schemas>(schema: T, primaryKey: any, entityValues: EntityValues<T>): Promise<any[][]> {
        let result: any[][] = [];

        const config = editSchemaConfiguration()[schema];
        if (!config) return result;

        for (let i = 0; i < config.groups.length; i++) {
            const group = config.groups[i];

            let groupValues: any[] = [];
            for (let j = 0; j < group.fields.length; j++) {
                const field = group.fields[j];

                let data: any = null;
                if (field.additionData) {
                    data = await field.additionData(entityValues, primaryKey, this.token)
                }

                groupValues[j] = data
            }

            result[i] = [...groupValues]
        }

        return [...result]
    }
}