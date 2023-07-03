import {CopyPreprocessServiceInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import IsGroupVisible from "../../helpers/IsGroupVisible";

/**
 * Сервис предварительной обработки сущностей при копировании
 */
export class CopyPreprocessService implements CopyPreprocessServiceInterface {
    /**
     * Предварительная обработка значений сохранения при копировании
     * @param schema
     * @param data
     */
    async Preprocess(schema: keyof Schemas, data: EntityData<keyof Schemas>): Promise<EntityData<keyof Schemas>> {
        const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[schema] as EditPageConfiguration<any>;
        const passedData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data));
        const newData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data));

        await Promise.all(configuration.groups.map(async (group, i) => {
            if (!IsGroupVisible(group, passedData.values)) {
                return;
            }

            return await Promise.all(group.fields.map(async (field, j) => {
                const isFieldVisible = field.isVisible ? field.isVisible(data.values) : true;

                if (!field.onCopyValue || !isFieldVisible) {
                    return
                }

                const result = await field.onCopyValue(passedData.primaryKey, passedData.values[field.field as any], passedData.originalValues[field.field as any], passedData.additionData);

                // @ts-ignore
                newData.values[field.field] = result.value;
                newData.additionData[i][j] = result.additionData
            }))
        }));

        return newData;
    }
}