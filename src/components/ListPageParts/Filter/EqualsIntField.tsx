import {FC, useEffect, useState} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {TextField} from "@mui/material";
import {SimpleComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";

// Компонент вывода поля фильтрации типа Float
const EqualsIntField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig
    const translationKey = `entity-list.components.filter.fields.input`

    const currentValue = value?.value as SimpleComponentValue<number | null>
    if (!currentValue) {
        return null
    }

    // Конвертация числа в строку
    const convertValue = (value: number | null) => {
        return value !== null ? `${value}` : ""
    }

    const [fieldValue, setFieldValue] = useState(convertValue(currentValue.value))
    useEffect(() => {
        setFieldValue(convertValue(currentValue.value))
    }, [currentValue.value])

    useEffect(() => {
        if (convertValue(currentValue.value) === fieldValue) {
            return
        }

        const timeout = setTimeout(() => {
            if (fieldValue.length === 0) {
                return onChangeFilterValues(fieldCode, {...value, value: {value: null}} as any)
            }

            const parsedValue = parseInt(fieldValue) || 0
            return onChangeFilterValues(fieldCode, {...value, value: {value: parsedValue}} as any)
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [fieldValue])

    return (
        <TextField
            value={fieldValue}
            label={t(title) as string}
            fullWidth
            variant="standard"
            autoComplete={"off"}
            placeholder={t(`${translationKey}.placeholder`)}
            onChange={event => setFieldValue(event.target.value)}
        />
    )
}

// Экспортируем компонент
export default EqualsIntField