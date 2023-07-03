import React, {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {auditTime} from "rxjs";
import {VariantsComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/VariantsComponentValue";
import {Box, Checkbox, FormControl, FormControlLabel, FormLabel} from "@mui/material";

// Компонент вариантного поля фильтрации
const VariantsSelector: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode, auditTime(100))
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig

    const currentValue = value.value as VariantsComponentValue<(string | number)[]>
    if (!currentValue || !value.preloaded) {
        return null
    }

    // Обработка изменения выбранных элементов
    const handleChangeValue = e => {
        // @ts-ignore
        const {value: val} = e.target
        if (!val) {
            return
        }

        if (currentValue.value.includes(val)) {
            return onChangeFilterValues(
                fieldCode,
                {
                    ...value,
                    value: {
                        value: currentValue.value.filter(v => v === val),
                        variants: currentValue.variants,
                    }
                } as any
            )
        }

        return onChangeFilterValues(
            fieldCode,
            {
                ...value,
                value: {
                    value: [...currentValue.value, val],
                    variants: currentValue.variants,
                }
            } as any
        )
    }

    return (
        <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">{t(title)}</FormLabel>
            <Box onChange={handleChangeValue} className="list-page-variants-filter-group">
                {currentValue.variants.map(variant => (
                    <FormControlLabel
                        key={variant}
                        value={variant}
                        control={<Checkbox/>}
                        label={variant}
                    />
                ))}
            </Box>
        </FormControl>
    )
}

// Экспортируем компонент
export default VariantsSelector