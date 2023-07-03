import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {InputAdornment, MenuItem, TextField, Typography} from "@mui/material";

// Компонент поля Enum
const EnumField: FC<EditFieldProperties> = props => {
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
        fieldSchema: {enum: enumData},
        fieldConfig: {title, isVisible = () => true, startIcon: IconComponent, validation: validators = []},
        values,
        validation,
        onChangeFieldValue,
    } = fieldData

    if (!isVisible(values) || !enumData) {
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
            select
            required={validators.length > 0}
            onChange={event => {
                event.preventDefault()
                event.stopPropagation()

                onChangeFieldValue(() => event.target.value)
            }}
            InputProps={{
                startAdornment: IconComponent ? (
                    <InputAdornment position="start">
                        <IconComponent/>
                    </InputAdornment>
                ) : undefined,
            }}
        >
            <MenuItem value="">
                <Typography variant="overline" sx={{p: 0}}>
                    {t(`entity-edit.fields.enum.no-value`)}
                </Typography>
            </MenuItem>
            {Object.keys(enumData.variants).map(variant => (
                <MenuItem value={variant} key={variant}>{t(enumData.variants[variant])}</MenuItem>
            ))}
        </TextField>
    )
}

// Экспортируем компонент
export default React.memo(EnumField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})