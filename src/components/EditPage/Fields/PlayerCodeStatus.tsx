import React, { FC, memo } from "react";
import { EditFieldProperties } from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import { distinctUntilChanged } from "rxjs";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

/**
 * Поле выбора состояния активности радиобатономи
 * @param props
 * @returns
 */
const PlayerCodeStatus: FC<EditFieldProperties> = (props) => {
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
    fieldConfig: { isVisible = () => true },
    onChangeFieldValue,
  } = fieldData;

  if (!isVisible(values)) {
    return null;
  }

  return (
    <FormControl>
      <RadioGroup row sx={{ flexWrap: "nowrap" }}>
        <FormControlLabel
          value="end"
          control={
            <Radio
              checked={!!value}
              onChange={() => onChangeFieldValue(() => true)}
            />
          }
          label={t("player-codes.add.isActive.true")}
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          control={
            <Radio
              checked={!value}
              onChange={() => onChangeFieldValue(() => false)}
            />
          }
          label={t("player-codes.add.isActive.false")}
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
};

// Экспортируем компонент
export default memo(PlayerCodeStatus, (prevProps, nextProps) => {
  return prevProps.fieldCode === nextProps.fieldCode;
});
