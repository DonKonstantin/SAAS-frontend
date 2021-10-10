import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {ShoulderStepData} from "../../../searchLoaders/shoulderStepsLoader/ShoulderStepsLoaderQuery";
import {TerminalsData} from "../../../searchLoaders/terminalLoader/TerminalsLoaderQuery";
import {TransportTypesData} from "../../../searchLoaders/transportTypesLoader/TransportTypesLoaderQuery";

export interface ShoulderStepValidation {
    transportingTypeValidation: string | undefined
    endTerminalValidation: string | undefined
}

export interface ShoulderStepsValidation {
    globalError: string | undefined
    steps: ShoulderStepValidation[]
}

interface ShoulderStepsData {
    shoulderSteps: ShoulderStepData[]
    terminals: TerminalsData[]
    transportTypes: TransportTypesData[]
}

/**
 * Валидатор шагов плеч
 */
export const ShoulderStepsValidator: ValidatorFactory<{}> = () => {
    return new class implements EditFieldValidator<keyof Schemas> {
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            const data: ShoulderStepsData = JSON.parse(JSON.stringify(params.additionData));
            const result: ShoulderStepsValidation = {
                globalError: undefined,
                steps: [],
            };

            if (data.shoulderSteps.length === 0) {
                result.globalError = `Необходимо добавить хотябы один терминал`;
                return JSON.stringify(result)
            }

            let isAnyErrorAvailable = false;
            result.steps = data.shoulderSteps.map(step => {
                const validationResult: ShoulderStepValidation = {
                    transportingTypeValidation: undefined,
                    endTerminalValidation: undefined,
                };

                if (step.transport_type_id === null) {
                    isAnyErrorAvailable = true;
                    validationResult.transportingTypeValidation = `Необходимо выбрать один из вариантов`
                }

                if (step.end_terminal_id === null && step.position !== data.shoulderSteps.length) {
                    isAnyErrorAvailable = true;
                    validationResult.endTerminalValidation = `Необходимо выбрать терминал`
                }

                return validationResult
            });

            if (!isAnyErrorAvailable) {
                return null
            }

            return JSON.stringify(result)
        }
    };
};