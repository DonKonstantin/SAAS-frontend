import { ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { ReportType } from "../types";

interface Props {
  selected: ReportType | undefined;
  setSelected: (selected: ReportType) => void;
};

/**
 * Компонент селектора типа отчета
 * @param param0 
 * @returns 
 */
const TypeSelector: FC<Props> = ({ selected, setSelected }) => {
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<keyof ReportType>) => {
    const value = event.target.value as ReportType;

    setSelected(value);
  };

  return (
    <Select
      variant="standard"
      value={selected}
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

      {Object.keys(ReportType).map(type => (
        <MenuItem value={type} key={type}>
          <ListItemText
            primary={t(`reports.field.report-type.${type}`)}
          />
        </MenuItem>
      ))}
    </Select>
  );
};

export default memo(TypeSelector);
