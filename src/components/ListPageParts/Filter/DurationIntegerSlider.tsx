import {FC, useEffect, useState} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {SliderComponentValues} from "../../../services/listDataLoader/filterLoader/fieldValues/Slider";
import {FormControl, FormLabel, Slider} from "@mui/material";
import {Mark} from "@mui/core/SliderUnstyled/SliderUnstyled";

// Format seconds in MM:SS format
const toMinute = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const formatSeconds = Math.ceil(seconds - 60 * minutes);

    return `${minutes}:${`${formatSeconds}`.padStart(2, "0")}`;
}

/**
 * Получение шага слайдера и меток, отображаемых на нем
 * @param max
 * @param min
 */
const getMarksAndStep = ({max, min}: SliderComponentValues<number>): { marks: Mark[], step: number } => {
    const marksQuantity = 5;
    const diapason = max - min;
    const step = diapason < marksQuantity ? 1 : Math.ceil(diapason / marksQuantity);

    let marks: { value: number, label: string }[] = [];
    for (let i = min; i < max; i += step) {
        marks.push({
            label: `${toMinute(i)}`,
            value: i,
        })
    }

    marks.push({
        label: `${toMinute(max)}`,
        value: max,
    });

    return {
        marks: marks,
        step: diapason < marksQuantity ? 1 : Math.ceil(step / 20),
    }
}

/**
 * Хук для проверки наличия данных
 * @param fieldCode
 */
const useValue = ({fieldCode}: FilterFieldProperties) => {
    const fieldConfig = useFieldConfiguration(fieldCode);

    if (!fieldConfig) {
        return undefined;
    }

    const currentValue = fieldConfig.value?.value as SliderComponentValues<number>;

    if (!currentValue) {
        return undefined;
    }

    return {
        fieldConfig,
        currentValue,
    };
}

const useInitState = (props: FilterFieldProperties) => {
    const valueState = useValue(props);
    const [value, setValue] = useState<number[]>([
        valueState?.currentValue.currentMin || 0,
        valueState?.currentValue.currentMax || 0,
    ])

    /**
     * Устанавливаем значение в локальный стейт в случае если данные пришли с фильтра
     */
    useEffect(
        () => {
            if (!valueState) {
                return;
            }
            const {currentMin, currentMax} = valueState.currentValue;

            if (currentMin === value[0] && currentMax === value[1]) {
                return;
            }

            setValue([currentMin, currentMax]);
        },
        [
            valueState?.currentValue.currentMin,
            valueState?.currentValue.currentMax,
        ],
    );

    if (!valueState) {
        return undefined;
    }

    return {
        ...valueState,
        value,
        setValue,
    };
}

// Слайдер для значений типа Duration Int
const DurationIntegerSlider: FC<FilterFieldProperties> = props => {
    const state = useInitState(props);
    const {fieldCode} = props;

    if (!state) {
        return null;
    }

    const {fieldConfig, value, setValue, currentValue} = state;
    const {t, fieldConfig: {title}, onChangeFilterValues} = fieldConfig;
    const {marks, step} = getMarksAndStep(currentValue);

    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{t(title)}</FormLabel>
            <Slider
                value={value}
                min={currentValue.min}
                max={currentValue.max}
                step={step}
                marks={marks}
                valueLabelFormat={toMinute}
                onChange={(_, newValue) => setValue(newValue as number[])}
                onChangeCommitted={(_, newValue) => {
                    if (!Array.isArray(newValue)) {
                        return
                    }

                    return onChangeFilterValues(
                        fieldCode,
                        {...fieldConfig.value, value: {...currentValue, currentMin: newValue[0], currentMax: newValue[1]}} as any
                    );
                }}
                valueLabelDisplay="auto"
            />
        </FormControl>
    )
}

// Экспортируем компонент
export default DurationIntegerSlider
