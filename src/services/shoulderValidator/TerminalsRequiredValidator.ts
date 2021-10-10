import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class TerminalsRequiredValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        if (["4", "5"].indexOf(shoulder.shoulder_type.value || "") !== -1) {
            return shoulder
        }

        let from_terminal_ids = shoulder.from_terminal_ids.value || [];
        let to_terminal_ids = shoulder.to_terminal_ids.value || [];

        from_terminal_ids = from_terminal_ids.filter(v => !!v).map(v => `${v}`);
        to_terminal_ids = to_terminal_ids.filter(v => !!v).map(v => `${v}`);

        return {
            ...shoulder,
            from_terminal_ids: {
                value: from_terminal_ids,
                error: from_terminal_ids.length === 0
                    ? "Выберите значение"
                    : undefined
                ,
            },
            to_terminal_ids: {
                value: to_terminal_ids,
                error: to_terminal_ids.length === 0
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}