import {EntityStoreParameters, EntityStoreServiceInterface} from "./interfaces";
import {copyPreprocessService} from "./copyPreprocessService";
import {beforeSavePreprocessService} from "./beforeSavePreprocessService";
import {afterSaveProcessService} from "./afterSaveProcessService";
import {createEntityService} from "./createEntityService";
import {updateEntityService} from "./updateEntityService";
import {loggerFactory} from "../logger";
import {EntityData} from "../entityGetterService/interface";
import {Schemas} from "../../settings/schema";

/**
 * Сервис сохранения данных сущности
 */
export class EntityStoreService implements EntityStoreServiceInterface {
    private readonly copyPreprocessor = copyPreprocessService()
    private readonly beforeSaveProcessor = beforeSavePreprocessService()
    private readonly afterSaveProcessor = afterSaveProcessService()
    private readonly createService = createEntityService()
    private readonly updateService = updateEntityService()
    private readonly logger = loggerFactory().make(`EntityStoreService`)

    /**
     * Сохранение сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param params
     */
    async Store({schema, primaryKey, data, isNeedCopy}: EntityStoreParameters): Promise<any> {
        let passedData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data))
        this.logger.Debug(`Started entity saving`, schema, primaryKey, passedData)

        if (isNeedCopy) {
            passedData = await this.copyPreprocessor.Preprocess(schema, passedData)
            this.logger.Debug(`Preprocessed copy data`, passedData)
        }

        const beforeProcessResult = await this.beforeSaveProcessor.Preprocess(schema, passedData)
        this.logger.Debug(`Before save process result`, beforeProcessResult)

        if (beforeProcessResult.isError) {
            throw new Error(`failed to execute beforeProcess`)
        }

        passedData = beforeProcessResult.data
        const currentPrimaryKey = isNeedCopy ? undefined : primaryKey
        let primaryKeyResult: any
        if (currentPrimaryKey) {
            primaryKeyResult = await this.updateService.Update({schema, primaryKey: currentPrimaryKey, data: passedData})
        } else {
            primaryKeyResult = await this.createService.Create(schema, passedData)
        }

        this.logger.Debug(`Stored entity primary key`, primaryKeyResult)
        if (!primaryKeyResult) {
            throw new Error(`failed to store data`)
        }

        const afterSaveProcessResult = await this.afterSaveProcessor.Process(schema, primaryKeyResult, passedData)
        this.logger.Debug(`After save process result`, afterSaveProcessResult)

        if (!afterSaveProcessResult) {
            throw new Error(`failed to execute afterSave`)
        }

        return primaryKeyResult
    }
}