import {EntityData, EntityGetterServiceInterface} from "./interface";
import {Schemas} from "../../settings/schema";
import {InitialDataGetterInterface} from "./initialDataGetter/interfaces";
import {AdditionDataGetterInterface} from "./additionDataGetter/interfaces";
import {EntityValuesGetterInterface} from "./entityValuesGetter/interfaces";
import {editSchemaConfiguration} from "../../settings/pages";

/**
 * Сервис загрузки данных сущности
 */
export class EntityGetterService implements EntityGetterServiceInterface {
    private readonly initialDataGetter: InitialDataGetterInterface
    private readonly additionDataGetter: AdditionDataGetterInterface
    private readonly entityValueGetter: EntityValuesGetterInterface

    /**
     * Конструктор сервиса
     *
     * @param initialDataGetter
     * @param additionDataGetter
     * @param entityValueGetter
     */
    constructor(
        initialDataGetter: InitialDataGetterInterface,
        additionDataGetter: AdditionDataGetterInterface,
        entityValueGetter: EntityValuesGetterInterface,
    ) {
        this.initialDataGetter = initialDataGetter
        this.additionDataGetter = additionDataGetter
        this.entityValueGetter = entityValueGetter
    }

    /**
     * Получение данных сущности для схемы
     *
     * @param schema
     * @param primaryKey
     */
    async GetEntity<T extends keyof Schemas>(schema: T, primaryKey: any): Promise<EntityData<T>> {
        const config = editSchemaConfiguration()[schema]
        if (!config) throw new Error(`configuration is not found for schema "${schema}"`)

        const defaultValues = await this.initialDataGetter.GetInitialValues(schema, primaryKey)
        const result: EntityData<T> = {
            additionData: {},
            originalValues: {...defaultValues},
            primaryKey: primaryKey,
            schema: schema,
            values: {...defaultValues},
        }

        if (primaryKey) {
            const originalValues = await this.entityValueGetter.GetEntityValues(schema, primaryKey, defaultValues)

            result.originalValues = {...originalValues}
            result.values = {...originalValues}
        }

        result.additionData = await this.additionDataGetter.GetAdditionData(
            schema,
            primaryKey,
            {...result.originalValues}
        )

        return result
    }
}