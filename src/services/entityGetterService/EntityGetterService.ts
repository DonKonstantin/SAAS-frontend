import {EntityData, EntityGetterServiceInterface} from "./interface";
import {Schemas} from "../../settings/schema";
import {InitialDataGetterInterface} from "./initialDataGetter/interfaces";
import {AdditionDataGetterInterface} from "./additionDataGetter/interfaces";
import {EntityValuesGetterInterface} from "./entityValuesGetter/interfaces";
import {editSchemaConfiguration} from "../../settings/pages";
import {AdditionEditParams} from "../../containers/EntityEdit";

/**
 * Сервис загрузки данных сущности
 */
export class EntityGetterService implements EntityGetterServiceInterface {
    private readonly token?: string
    private readonly initialDataGetter: InitialDataGetterInterface
    private readonly additionDataGetter: AdditionDataGetterInterface
    private readonly entityValueGetter: EntityValuesGetterInterface

    /**
     * Конструктор сервиса
     *
     * @param initialDataGetter
     * @param additionDataGetter
     * @param entityValueGetter
     * @param token
     */
    constructor(
        initialDataGetter: InitialDataGetterInterface,
        additionDataGetter: AdditionDataGetterInterface,
        entityValueGetter: EntityValuesGetterInterface,
        token?: string,
    ) {
        this.initialDataGetter = initialDataGetter
        this.additionDataGetter = additionDataGetter
        this.entityValueGetter = entityValueGetter
        this.token = token
    }

    /**
     * Получение данных сущности для схемы
     *
     * @param schema
     * @param primaryKey
     * @param additionEditParams
     */
    async GetEntity<T extends keyof Schemas>(schema: T, primaryKey: any, additionEditParams: AdditionEditParams): Promise<EntityData<T>> {
        const config = editSchemaConfiguration()[schema]
        if (!config) throw new Error(`configuration is not found for schema "${schema}"`)

        const defaultValues = await this.initialDataGetter.GetInitialValues(schema, primaryKey, additionEditParams)
        const result: EntityData<T> = {
            additionData: [],
            // @ts-ignore
            configuration: config,
            originalValues: JSON.parse(JSON.stringify(defaultValues)),
            customComponentData: undefined,
            primaryKey: primaryKey,
            schema: schema,
            values: JSON.parse(JSON.stringify(defaultValues)),
        }

        if (primaryKey) {
            const originalValues = await this.entityValueGetter.GetEntityValues(schema, primaryKey, defaultValues)
            result.originalValues = JSON.parse(JSON.stringify(originalValues))
            result.values = JSON.parse(JSON.stringify(originalValues))
        }

        const additionData = await this.additionDataGetter.GetAdditionData(schema, primaryKey, JSON.parse(JSON.stringify(result.originalValues)))
        result.additionData = JSON.parse(JSON.stringify(additionData))

        result.customComponentData = config.customComponentLoadData
            ? JSON.parse(JSON.stringify(await config.customComponentLoadData(JSON.parse(JSON.stringify(result.originalValues)), primaryKey, this.token)))
            : undefined

        return result
    }
}