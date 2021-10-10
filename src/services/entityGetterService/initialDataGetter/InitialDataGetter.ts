import {InitialDataGetterInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityValues} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import {AdditionEditParams} from "../../../containers/EntityEdit";

/**
 * Сервис получения базовых данных полей сущности
 */
export class InitialDataGetter implements InitialDataGetterInterface {
    private readonly token?: string

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.token = token
    }

    /**
     * Получение базовых значений полей сущности
     * @param schema
     * @param _
     * @param additionEditParams
     */
    async GetInitialValues<T extends keyof Schemas>(schema: T, _: any, additionEditParams: AdditionEditParams): Promise<EntityValues<T>> {
        // @ts-ignore
        let data: EntityValues<T> = {}

        const config = editSchemaConfiguration()[schema]
        if (!config) return data

        await Promise.all(config.groups.map(group => {
            return Promise.all(group.fields.map(async field => {
                if (additionEditParams.defaultValues && additionEditParams.defaultValues[field.field]) {
                    // @ts-ignore
                    data[field.field] = additionEditParams.defaultValues[field.field]

                    return
                }

                if (typeof field.defaultValue === "function") {
                    // @ts-ignore
                    data[field.field] = await field.defaultValue({token: this.token})
                } else {
                    // @ts-ignore
                    data[field.field] = field.defaultValue
                }
            }))
        }))

        return data
    }
}