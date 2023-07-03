import {EntityValidatorInterface, ValidationResults} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {ValidationResult} from "../../../settings/pages/system/edit";
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
    ): Promise<ValidationResults> {
        const configuration = editSchemaConfiguration()[schema]
        if (!configuration) {
            return {isError: true, validationResults: {}}
        }

        let result: ValidationResults = {
            isError: false,
            validationResults: {}
        }

        const {additionData} = data
        await Promise.all(configuration.groups.map(group => {
            const isGroupVisible = IsGroupVisible(group, data.values)

            return Promise.all(group.fields.map(async field => {
                const isFieldVisible = field.isVisible ? field.isVisible(data.values) : true
                if (!isGroupVisible || !isFieldVisible) {
                    return
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
                        result.validationResults[field.field] = validationResult
                        result.isError = true

                        return
                    }
                }
            }))
        }))

        return result
    }
}