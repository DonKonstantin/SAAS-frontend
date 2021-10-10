import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder, ShoulderStep} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {v4} from "uuid";

/**
 * Валидатор наличия выбранной валюты
 */
export class ShoulderStepValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        if (shoulder.shoulder_type.value !== "5") {
            return shoulder
        }

        if ((shoulder.shoulder_steps.value || []).length === 0) {
            return {
                ...shoulder,
                shoulder_steps: {
                    value: [],
                    error: `Необходимо добавить хотябы один терминал`,
                }
            }
        }

        const steps = (shoulder.shoulder_steps.value || []);
        shoulder.shoulder_steps.value = steps.map((step: Values<ShoulderStep>) => {
            if (step.transport_type_id.value === null) {
                step.transport_type_id.error = `Необходимо выбрать один из вариантов`
            }

            if (step.end_terminal_id.value === null && step.position !== steps.length) {
                step.end_terminal_id.error = `Необходимо выбрать терминал`
            }

            return {
                ...step,
                import_id: {value: step.import_id.value || v4()},
                id: {value: step.id.value || null}
            }
        });

        return {...shoulder};
    }
}