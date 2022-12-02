import React, { FC, memo } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  dateFrom: Date;
  setDateFrom: (date: Date) => void;
  setDateTo: (date: Date) => void;
}

/**
 * Компонент селектора месяцов для страницы отчетов
 * @param param0
 * @returns
 */
const MonthPicker: FC<Props> = ({ dateFrom, setDateFrom, setDateTo }) => {
  const onFromDateChange = (value: Date | null) => {
    if (!value) {
      return;
    }

    setDateFrom(value);

    const dateTo = dayjs(value).subtract(1, "month").toDate();

    setDateTo(dateTo);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        views={["year", "month"]}
        inputFormat="DD.MM.YYYY"
        value={dateFrom}
        onChange={onFromDateChange}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};

export default memo(MonthPicker);
