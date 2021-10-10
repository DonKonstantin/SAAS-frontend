import {EntityValidatorInterface} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {EditPageConfiguration, ValidationResult} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import IsGroupVisible from "../../helpers/IsGroupVisible";

/**
 * Сервис валидации сущностей
 */
export class EntityValidator implements EntityValidatorInterface {
    /**
     * Валидация полей
     *
     * @param primaryKey
     * @param schema
     * @param data
     */
    async Validate(
        primaryKey: any,
        schema: keyof Schemas,
        data: EntityData<keyof Schemas>
    ): Promise<{
        isError: boolean;
        validationResults: ValidationResult[][];
    }> {
        // @ts-ignore
        const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[schema]
        let result: {isError: boolean; validationResults: ValidationResult[][]} = {
            isError: false,
            validationResults: []
        }

        await Promise.all(configuration.groups.map(async (group, i) => {
            result.validationResults[i] = []
            const isGroupVisible = IsGroupVisible(group, data.values)

            const promises = group.fields.map(async (field, j) => {
                result.validationResults[i][j] = null

                const isFieldVisible = field.isVisible ? field.isVisible(data.values) : true
                if (!isGroupVisible || !isFieldVisible) {
                    return
                }

                let additionData: any = undefined
                if (data.additionData[i] && data.additionData[i][j]) {
                    additionData = data.additionData[i][j]
                }

                let validationResult: ValidationResult = null
                for (let ii = 0; ii < field.validation.length; ii++) {
                    validationResult = await field.validation[ii].Validate({
                        allValues: data.values,
                        primaryKey: primaryKey,
                        // @ts-ignore
                        value: data.values[field.field],
                        additionData: additionData,
                    })

                    if (validationResult) {
                        result.validationResults[i][j] = validationResult
                        result.isError = true
                        return
                    }
                }

                result.validationResults[i][j] = validationResult
            })

            return await Promise.all(promises)
        }))

        return result
    }
}