import {AfterSaveProcessServiceInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import IsGroupVisible from "../../helpers/IsGroupVisible";

/**
 * Сервис пост сохранения сущности
 */
export class AfterSaveProcessService implements AfterSaveProcessServiceInterface {
    private readonly logger: Logger = loggerFactory().make(`AfterSaveProcessService`);

    /**
     * Пост обработка данных после основного сохранения
     * @param schema
     * @param primaryKey
     * @param data
     */
    async Process(schema: keyof Schemas, primaryKey: any, data: EntityData<keyof Schemas>): Promise<boolean> {
        const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[schema] as EditPageConfiguration<any>;
        const passedData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data));

        let result: boolean = true;
        await Promise.all(configuration.groups.map(async (group, i) => {
            if (!IsGroupVisible(group, passedData.values)) {
                return undefined;
            }

            return await Promise.all(group.fields.map(async (field, j) => {
                const isFieldVisible = field.isVisible ? field.isVisible(data.values) : true;

                if (!field.onAfterSave || !isFieldVisible) {
                    return undefined;
                }

                try {
                    // @ts-ignore
                    await field.onAfterSave(passedData.values[field.field], passedData.values, passedData.additionData[i][j], primaryKey)
                } catch (e) {
                    this.logger.Error(`Some error occurred on field in group`, field, group, e);
                    result = false
                }
            }))
        }));

        return result
    }
}