import { Typography } from "@mui/material";
import React, { FC, memo } from "react";
import { distinctUntilChanged } from "rxjs";
import { EditFieldProperties } from "settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";

/**
 * Компонент для выведения заголовка на странице редактирования
 * @param param0
 * @returns
 */
const HeaderField: FC<EditFieldProperties> = ({ fieldCode }) => {
  const fieldData = useEntityEditField(
    fieldCode,
    distinctUntilChanged(
      (previous, current) =>
        previous?.fieldConfig?.title === current?.fieldConfig?.title
    )
  );

  if (!fieldData) {
    return null;
  }

  const {
    t,
    fieldConfig: { title },
  } = fieldData;

  return <Typography variant="subtitle1">{t(title)}</Typography>;
};

export default memo(HeaderField);
