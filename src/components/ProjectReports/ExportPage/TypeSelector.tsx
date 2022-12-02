import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useProjectReportPageContext } from "context/ProjectReportPageContext";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilKeyChanged } from "rxjs";
import { ReportType } from "../types";

/**
 * Компонент селектора типа отчета
 * @returns
 */
const TypeSelector: FC = () => {
  const { t } = useTranslation();

  const { reportType, setReportType } = useProjectReportPageContext(
    distinctUntilKeyChanged("reportType")
  );

  const handleChange = (event: SelectChangeEvent<keyof ReportType>) => {
    const value = event.target.value as ReportType;

    setReportType(value);
  };

  return (
    <Select
      variant="standard"
      value={reportType}
      onChange={handleChange}
      placeholder={"Не выбрано"}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return "Не выбрано";
        }

        return t(`reports.field.report-type.${selected.toString()}`);
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 400,
            width: 250,
          },
        },
      }}
      sx={{
        width: "60%",
      }}
    >
      {Object.keys(ReportType).map((type) => (
        <MenuItem value={type} key={type}>
          <ListItemText primary={t(`reports.field.report-type.${type}`)} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default memo(TypeSelector);
