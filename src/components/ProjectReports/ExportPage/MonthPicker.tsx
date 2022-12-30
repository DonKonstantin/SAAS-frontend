import React, { FC, memo, useEffect } from "react";
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

    const preparedFromDate = new Date(dayjs(value).format("YYYY-MM") + "-01");

    setDateFrom(preparedFromDate);

    const dateTo = new Date(preparedFromDate.getFullYear(), preparedFromDate.getMonth() + 1, 0);

    const preparedToDate = new Date(dayjs(dateTo).format("YYYY-MM-DD") + "T00:00:00.000Z");

    setDateTo(preparedToDate);
  };

  useEffect(() => {
    onFromDateChange(dateFrom);
  }, []);

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
