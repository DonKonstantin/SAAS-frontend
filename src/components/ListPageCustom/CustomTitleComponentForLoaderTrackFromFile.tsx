import React, {FC, useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {FilterFieldProperties} from "../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "../ListPageParts/Filter/useFieldConfiguration";
import {SimpleComponentValue} from "../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";

// Компонент вывода простой ячейки
const CustomTitleComponentForLoaderTrackFromFile: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    const [fieldValue, setFieldValue] = useState("")

    const translationKey = `entity-list.components.filter.fields.input`
    const currentValue = fieldConfig?.value?.value as SimpleComponentValue<string | null>

    useEffect(() => {
        if (!currentValue) {
            setFieldValue("")
            return;
        }

        const valueData = fieldConfig?.value?.value as SimpleComponentValue<string | null>

        if (typeof valueData?.value === 'object') {
            setFieldValue("")
            return
        }

        if (!valueData || (valueData.value || "") === fieldValue) {
            setFieldValue("")
            return
        }

        setFieldValue(valueData.value || "")
    }, [fieldConfig?.value?.value])

    const handleChangeTextField = (v: string) => {
        if (!fieldConfig) {
            return
        }

        const {value, onChangeFilterValues} = fieldConfig
        const currentValue = value?.value as SimpleComponentValue<string | null>

        if (typeof value.value === 'object') {
            const conf = {
                ...value,
                configuration: {
                    ...value.configuration,
                    filterType: 'Like',
                    field: 'title'
                }
            }
            return onChangeFilterValues(fieldCode, {...conf, value: {value: v}} as any)
        }

        if ((currentValue.value || "") === v) {
            return
        }

        if (v.length === 0) {
            return onChangeFilterValues(fieldCode, {...value, value: {value: null}} as any)
        }

        return onChangeFilterValues(fieldCode, {...value, value: {value: v}} as any)
    }

    if (!fieldConfig) {
        return <></>
    }

    const {t, fieldConfig: {title}} = fieldConfig

    return (
        <TextField
            value={fieldValue}
            label={t(title) as string}
            fullWidth
            variant="standard"
            autoComplete={"off"}
            placeholder={t(`${translationKey}.placeholder`)}
            onChange={event => handleChangeTextField(event.target.value)}
        />
    )
}

// Экспортируем компонент
export default CustomTitleComponentForLoaderTrackFromFile
