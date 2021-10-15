import React, {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import useFieldConfiguration from "./useFieldConfiguration";
import {VariantsComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/VariantsComponentValue";
import {auditTime} from "rxjs";

// Компонент вариантного поля фильтрации для отношений
const RelationVariantsSelector: FC<FilterFieldProperties> = props => {
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
        const {val} = e.target
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
        <FormControl component="fieldset">
            <FormLabel component="legend">{t(title)}</FormLabel>
            <FormGroup onChange={handleChangeValue} sx={{maxHeight: "250px", overflow: "auto"}}>
                {value.preloaded.choseVariants.map(variant => (
                    <FormControlLabel
                        key={variant.key}
                        value={variant.key}
                        control={<Checkbox/>}
                        label={variant.title}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}

// Экспорт компонента
export default RelationVariantsSelector