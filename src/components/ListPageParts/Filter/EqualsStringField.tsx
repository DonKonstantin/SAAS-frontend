import {FC, useEffect, useState} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {SimpleComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";
import {TextField} from "@mui/material";

// Компонент строкового поля фильтра
const EqualsStringField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig
    const translationKey = `entity-list.components.filter.fields.input`

    const currentValue = value?.value as SimpleComponentValue<string | null>
    if (!currentValue) {
        return null
    }

    const [fieldValue, setFieldValue] = useState(currentValue.value || "")
    useEffect(() => {
        setFieldValue(currentValue.value || "")
    }, [currentValue.value])

    useEffect(() => {
        if ((currentValue.value || "") === fieldValue) {
            return
        }

        const timeout = setTimeout(() => {
            if (fieldValue.length === 0) {
                return onChangeFilterValues(fieldCode, {...value, value: {value: null}} as any)
            }

            return onChangeFilterValues(fieldCode, {...value, value: {value: fieldValue}} as any)
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
export default EqualsStringField