import {FC, useEffect, useState} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {SimpleComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";
import {TextField} from "@mui/material";

// Компонент строкового поля фильтра
const EqualsStringField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    const [fieldValue, setFieldValue] = useState("")

    useEffect(() => {
        const valueData = fieldConfig?.value?.value as SimpleComponentValue<string | null>
        if (!valueData || (valueData.value || "") === fieldValue) {
            return
        }

        setFieldValue(valueData.value || "")
    }, [fieldConfig?.value?.value])

    useEffect(() => {
        if (!fieldConfig) {
            return
        }

        const {value, onChangeFilterValues} = fieldConfig
        const currentValue = value?.value as SimpleComponentValue<string | null>

        if ((currentValue.value || "") === fieldValue) {
            return
        }

        if (fieldValue.length === 0) {
            return onChangeFilterValues(fieldCode, {...value, value: {value: null}} as any)
        }

        return onChangeFilterValues(fieldCode, {...value, value: {value: fieldValue}} as any)
    }, [fieldValue])

    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value} = fieldConfig
    const translationKey = `entity-list.components.filter.fields.input`

    const currentValue = value?.value as SimpleComponentValue<string | null>
    if (!currentValue) {
        return null
    }

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