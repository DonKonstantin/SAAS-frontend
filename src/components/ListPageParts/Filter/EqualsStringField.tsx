import React, { FC, useEffect, useState } from "react";
import { FilterFieldProperties } from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import { SimpleComponentValue } from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";
import { TextField } from "@mui/material";
import { Subject, debounceTime } from "rxjs";

const valueStream$ = new Subject<string>();

/**
 * Компонент строкового поля фильтра
 * @param param0
 * @returns
 */
const EqualsStringField: FC<FilterFieldProperties> = ({ fieldCode }) => {
  const fieldConfig = useFieldConfiguration(fieldCode);

  const contextFieldValue = fieldConfig?.value?.value as SimpleComponentValue<string | null>;

  const [fieldValue, setFieldValue] = useState<string | undefined>("");
  const [componentValue, setComponentValue] = useState<string>("");

  useEffect(() => {
    if (!contextFieldValue && !!fieldValue) {
      return
    }

    setFieldValue(contextFieldValue?.value || "");
  }, [contextFieldValue]);

  useEffect(() => {
    if (!fieldConfig) {
      return
    }

    const { value, onChangeFilterValues } = fieldConfig;

    const currentValue = value?.value as SimpleComponentValue<string | null>;

    if ((currentValue.value || "") === fieldValue) {
      return
    }

    if (fieldValue?.length === 0) {
      return onChangeFilterValues(fieldCode, { ...value, value: { value: null } } as any);
    }

    return onChangeFilterValues(fieldCode, { ...value, value: { value: fieldValue } } as any);
  }, [fieldValue]);

  /**
   * Эфекты для внедрения дебаунса в строку
   */
  useEffect(() => {
    valueStream$.next(componentValue);
  }, [componentValue]);
  useEffect(() => {
    const subscriber = valueStream$.pipe(
      debounceTime(500),
    ).subscribe(setFieldValue);

    return () => subscriber.unsubscribe();
  }, []);

  if (!fieldConfig) {
    return null;
  }

  const { t, fieldConfig: { title }, value } = fieldConfig;

  const translationKey = `entity-list.components.filter.fields.input`;

  const currentValue = value?.value as SimpleComponentValue<string | null>;

  if (!currentValue) {
    return null;
  }

  return (
    <TextField
      value={componentValue}
      label={t(title) as string}
      fullWidth
      variant="standard"
      autoComplete={"off"}
      placeholder={t(`${translationKey}.placeholder`)}
      onChange={event => setComponentValue(event.target.value)}
    />
  );
};

export default EqualsStringField;