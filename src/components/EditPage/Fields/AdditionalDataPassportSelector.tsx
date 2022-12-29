import React, { FC, useEffect } from "react";
import { EditFieldProperties } from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import { InputAdornment, MenuItem, TextField, Typography } from "@mui/material";

/**
 * Селектор паспортов объектов.
 * Данные берутся из дополнительно загруженных.
 * @param param0
 * @returns
 */
const AdditionalDataPassportSelector: FC<EditFieldProperties> = ({
  fieldCode,
}) => {
  const fieldData = useEntityEditField(fieldCode, distinctUntilChanged());

  if (!fieldData) {
    return null;
  }

  const {
    t,
    value,
    fieldConfig: {
      title,
      validation: validators = [],
      startIcon: IconComponent,
    },
    validation,
    onChangeFieldValue,
    additionData,
  } = fieldData;

  const defaultValue = additionData.project_id.platerObjectPassport.id || "";

  const options = additionData.project_id.playerObjectPassports || [];

  useEffect(() => {
    onChangeFieldValue(() => defaultValue);
  }, []);

  return (
    <TextField
      label={t(title)}
      variant="standard"
      value={`${value}`}
      defaultValue={defaultValue}
      error={!!validation}
      helperText={validation ? t(validation) : undefined}
      fullWidth
      select
      required={validators.length > 0}
      onChange={(event) => {
        event.preventDefault();
        event.stopPropagation();

        onChangeFieldValue(() => event.target.value);
      }}
      InputProps={{
        startAdornment: IconComponent ? (
          <InputAdornment position="start">
            <IconComponent />
          </InputAdornment>
        ) : undefined,
      }}
    >
      <MenuItem value="">
        <Typography variant="overline" sx={{ p: 0 }}>
          {t(`entity-edit.fields.enum.no-value`)}
        </Typography>
      </MenuItem>
      {!!options.length &&
        options.map((passport) => (
          <MenuItem value={passport.id} key={passport.id}>
            {t(passport.site_name)}
          </MenuItem>
        ))}
      {!options.length && (
        <MenuItem value={""} disabled={true}>
          {t("player-list.edit.no-available-passports")}
        </MenuItem>
      )}
    </TextField>
  );
};

// Экспортируем компонент
export default React.memo(
  AdditionalDataPassportSelector,
  (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode;
  }
);
