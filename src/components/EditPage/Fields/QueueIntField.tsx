import React, { FC } from "react";
import { EditFieldProperties } from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import { InputAdornment, TextField } from "@mui/material";

// Поле ввода числового значения
const QueueIntField: FC<EditFieldProperties> = props => {
  const { fieldCode } = props
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
    fieldConfig: { title, isVisible = () => true, startIcon: IconComponent, validation: validators = [] },
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

        const value: any = parseInt(event.target.value) || 0
        onChangeFieldValue(() => value)
      }}
      InputProps={{
        endAdornment: IconComponent ? (
          <InputAdornment position="end">
            <IconComponent/>
          </InputAdornment>
        ) : undefined,
      }}
    />
  )
}

// Экспортируем компонент
export default React.memo(QueueIntField, (prevProps, nextProps) => {
  return prevProps.fieldCode === nextProps.fieldCode
})