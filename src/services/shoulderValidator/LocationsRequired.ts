import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class LocationsRequired implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        let from_terminal_ids = shoulder.from_terminal_ids.value || [];
        let to_terminal_ids = shoulder.to_terminal_ids.value || [];
        let from_location_ids = shoulder.from_location_ids.value || [];
        let to_location_ids = shoulder.to_location_ids.value || [];

        from_terminal_ids = from_terminal_ids.filter(v => !!v).map(v => `${v}`);
        to_terminal_ids = to_terminal_ids.filter(v => !!v).map(v => `${v}`);
        from_location_ids = from_location_ids.filter(v => !!v).map(v => `${v}`);
        to_location_ids = to_location_ids.filter(v => !!v).map(v => `${v}`);

        return {
            ...shoulder,
            from_terminal_ids: {
                value: from_terminal_ids,
                error: from_terminal_ids.length === 0 && from_location_ids.length === 0
                    ? "Заполните одно из полей"
                    : undefined
                ,
            },
            to_terminal_ids: {
                value: to_terminal_ids,
                error: to_terminal_ids.length === 0 && to_location_ids.length === 0
                    ? "Заполните одно из полей"
                    : undefined
                ,
            },
            from_location_ids: {
                value: from_location_ids,
                error: from_terminal_ids.length === 0 && from_location_ids.length === 0
                    ? "Заполните одно из полей"
                    : undefined
                ,
            },
            to_location_ids: {
                value: to_location_ids,
                error: to_terminal_ids.length === 0 && to_location_ids.length === 0
                    ? "Заполните одно из полей"
                    : undefined
                ,
            }
        };
    }
}