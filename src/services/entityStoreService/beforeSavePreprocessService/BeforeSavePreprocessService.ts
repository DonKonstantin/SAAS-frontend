import {BeforeSavePreprocessServiceInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import IsGroupVisible from "../../helpers/IsGroupVisible";

/**
 * Сервис предварительного сохранения сущности
 */
export class BeforeSavePreprocessService implements BeforeSavePreprocessServiceInterface {
    private readonly logger: Logger = loggerFactory().make(`BeforeSavePreprocessService`);

    /**
     * Предварительная обработка данных перед основным сохранением
     * @param schema
     * @param data
     */
    async Preprocess(schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<{isError: boolean, data: EntityData<keyof Schemas>}> {
        // @ts-ignore
        const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[schema]
        let passedData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data))

        for (let i = 0; i < configuration.groups.length; i++) {
            const group = configuration.groups[i]
            if (!IsGroupVisible(group, passedData.values)) {
                continue
            }

            for (let j = 0; j < group.fields.length; j++) {
                const field = configuration.groups[i].fields[j]
                const isFieldVisible = field.isVisible ? field.isVisible(data.values) : true

                if (!field.onBeforeSave || !isFieldVisible) {
                    continue
                }

                try {
                    // @ts-ignore
                    const beforeProcessResult = await field.onBeforeSave(passedData.values[field.field], passedData.values, passedData.additionData[i][j])
                    passedData.values = {...JSON.parse(JSON.stringify(beforeProcessResult))}
                } catch (e) {
                    this.logger.Error(`Some error occurred on field in group`, field, group, e)
                    return {
                        isError: true,
                        data: passedData,
                    }
                }
            }
        }

        return {
            isError: false,
            data: passedData,
        }
    }
}