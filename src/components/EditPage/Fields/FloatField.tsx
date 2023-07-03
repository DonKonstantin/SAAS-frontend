import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {InputAdornment, TextField} from "@mui/material";

// Поле ввода числового значения
const FloatField: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged(
        (previous, current) => {
            return previous?.entityData?.values[fieldCode] === current?.entityData?.values[fieldCode]
                && previous?.validation[fieldCode] === current?.validation[fieldCode]
        }
    ))

    if (!fieldData) {
        return null
    }

    const {
        t,
        value,
        values,
        validation,
        fieldConfig: {title, isVisible = () => true, startIcon: IconComponent, validation: validators = []},
        onChangeFieldValue,
    } = fieldData

    if (!isVisible(values)) {
        return null
    }

    return (
        <TextField
            label={t(title)}
            variant="standard"
            value={`${value}`}
            error={!!validation}
            helperText={validation ? t(validation) : undefined}
            fullWidth
            required={validators.length > 0}
            placeholder={t(`entity-edit.fields.input.placeholder`) as string}
            onChange={event => {
                event.preventDefault()
                event.stopPropagation()

                onChangeFieldValue(() => event.target.value)
            }}
            onBlur={event => {
                event.preventDefault()
                event.stopPropagation()

                const value: any = parseFloat(event.target.value) || 0
                onChangeFieldValue(() => value)
            }}
            InputProps={{
                startAdornment: IconComponent ? (
                    <InputAdornment position="start">
                        <IconComponent/>
                    </InputAdornment>
                ) : undefined,
            }}
        />
    )
}

// Экспортируем компонент
export default React.memo(FloatField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})