import { Divider } from "@mui/material";
import React, { FC, memo } from "react";
import { EditFieldProperties } from "settings/pages/system/edit";

/**
 * компонент поля с разделителем
 * @returns
 */
const DividerField: FC<EditFieldProperties> = () => (
  <Divider sx={{ pt: 3.25 }} />
);

export default memo(DividerField, () => true);
