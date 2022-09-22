import React, { FC } from "react";
import { EditFieldProperties } from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import { InputAdornment, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";

// Поле ввода даты
const DateField: FC<EditFieldProperties> = (props) => {
  const { fieldCode } = props;
  const fieldData = useEntityEditField(
    fieldCode,
    distinctUntilChanged((previous, current) => {
      return (
        previous?.entityData?.values[fieldCode] ===
          current?.entityData?.values[fieldCode] &&
        previous?.validation[fieldCode] === current?.validation[fieldCode]
      );
    })
  );

  if (!fieldData) {
    return null;
  }

  const {
    t,
    value,
    values,
    validation,
    fieldConfig: {
      title,
      isVisible = () => true,
      startIcon: IconComponent,
      validation: validators = [],
    },
    onChangeFieldValue,
  } = fieldData;

  if (!isVisible(values)) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={t(title)}
        value={value}
        onChange={(value: any) => {
          onChangeFieldValue(() => value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!validation}
            helperText={validation ? t(validation) : undefined}
            required={validators.length > 0}
            fullWidth
            placeholder={t(`entity-edit.fields.input.placeholder`) as string}
            variant="standard"
          />
        )}
        InputProps={{
          startAdornment: IconComponent ? (
            <InputAdornment position="start">
              <IconComponent />
            </InputAdornment>
          ) : undefined,
        }}
      />
    </LocalizationProvider>
  );
};

// Экспортируем компонент
export default React.memo(DateField, (prevProps, nextProps) => {
  return prevProps.fieldCode === nextProps.fieldCode;
});
