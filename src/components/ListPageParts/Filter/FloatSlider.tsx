import {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {SliderComponentValues} from "../../../services/listDataLoader/filterLoader/fieldValues/Slider";
import {FormControl, FormLabel, Slider} from "@mui/material";
import {Mark} from "@mui/base/SliderUnstyled";

/**
 * Получение шага слайдера и меток, отображаемых на нем
 * @param max
 * @param min
 */
const getMarksAndStep = ({max, min}: SliderComponentValues<number>): {marks: Mark[], step: number} => {
    const marksQuantity = 5;
    const diapason = max - min;
    const step = diapason / marksQuantity;

    let marks: {value: number, label: string}[] = [];
    for (let i = min; i < max; i += step) {
        const value = Math.round(i * 100) / 100;
        marks.push({
            label: `${value}`,
            value: value,
        })
    }

    marks.push({
        label: `${max}`,
        value: max,
    });

    return {
        marks: marks,
        step: Math.round((step / 20) * 1000) / 1000,
    }
}

// Слайдер для значений типа Float
const FloatSlider: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig

    const currentValue = value?.value as SliderComponentValues<number>
    if (!currentValue) {
        return null
    }

    const {marks, step} = getMarksAndStep(currentValue)
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{t(title)}</FormLabel>
            <Slider
                value={[currentValue.currentMin, currentValue.currentMax]}
                min={currentValue.min}
                max={currentValue.max}
                step={step}
                marks={marks}
                onChangeCommitted={(_, newValue) => {
                    if (!Array.isArray(newValue)) {
                        return
                    }

                    return onChangeFilterValues(
                        fieldCode,
                        {...value, value: {...currentValue, currentMin: newValue[0], currentMax: newValue[1]}} as any
                    )
                }}
                valueLabelDisplay="auto"
            />
        </FormControl>
    )
}

// Экспортируем компонент
export default FloatSlider