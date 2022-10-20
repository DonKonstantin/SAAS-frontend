import React, { FC, memo, useState, ChangeEvent } from "react";
import { FilterFieldProperties } from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import { SimpleComponentValue } from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";
import { TextField } from "@mui/material";
import projectPlaylistService from "services/projectPlaylistService";
import { getCurrentState } from "context/AuthorizationContext";

/**
 * Компонент строкового поля фильтра по названию связной компании в листинге плэйлистов
 * @param param0 
 * @returns 
 */
const PlailistCampignsField: FC<FilterFieldProperties> = ({ fieldCode }) => {
  const fieldConfig = useFieldConfiguration(fieldCode);

  const [fieldValue, setFieldValue] = useState<string>("");

  const { project } = getCurrentState();

  if (!fieldConfig) {
    return null;
  }

  const { onChangeFilterValues } = fieldConfig;

  const setValueHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setFieldValue(inputValue);

    if (!inputValue.length) {
      return onChangeFilterValues(fieldCode, {
        ...value,
        value: { value: [] },
      } as any);
    }

    const campignsId = await projectPlaylistService().getCampaignsIdByName(
      inputValue,
      project
    );

    if (!campignsId.length) {
      return onChangeFilterValues(fieldCode, {
        ...value,
        value: { value: ["-1"] },
      } as any);
    }

    const playlistsId =
      await projectPlaylistService().getPlaylistsIdByCampignsId(campignsId);

    onChangeFilterValues(fieldCode, {
      ...value,
      value: { value: playlistsId },
    } as any);
  };

  if (!fieldConfig) {
    return null;
  }

  const {
    t,
    fieldConfig: { title },
    value,
  } = fieldConfig;

  const currentValue = value?.value as SimpleComponentValue<string | null>;
  if (!currentValue) {
    return null;
  }

  return (
    <TextField
      value={fieldValue}
      label={t(title) as string}
      fullWidth
      variant="standard"
      autoComplete={"off"}
      placeholder={t(`entity-list.components.filter.fields.input.placeholder`)}
      onChange={setValueHandler}
    />
  );
};

export default memo(PlailistCampignsField);
