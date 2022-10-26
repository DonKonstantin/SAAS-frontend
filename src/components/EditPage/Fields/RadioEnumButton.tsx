import React, { FC } from "react";
import { EditFieldProperties } from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// Компонент поля Radio Enum
const RadioEnumButton: FC<EditFieldProperties> = props => {
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
    fieldSchema: { enum: enumData },
    fieldConfig: { isVisible = () => true },
    values,
    onChangeFieldValue,
  } = fieldData

  if (!isVisible(values) || !enumData) {
    return null
  }

  return (
    <RadioGroup
      row
      value={`${value}`}
      onChange={event => {
        event.preventDefault()
        event.stopPropagation()
        onChangeFieldValue(() => event.target.value)
      }}
    >
      {Object.keys(enumData.variants).map(variant => (
        <FormControlLabel value={variant} key={variant} control={<Radio sx={{p: "0 9px"}}/>} label={t(enumData.variants[variant])}/>
      ))}
    </RadioGroup>
  )
}

// Экспортируем компонент
export default React.memo(RadioEnumButton, (prevProps, nextProps) => {
  return prevProps.fieldCode === nextProps.fieldCode
})