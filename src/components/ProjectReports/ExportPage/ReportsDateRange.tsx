import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";

// конвертация с учётом времени часового пояса
const dateWithoutTimeZone = (date: Date): Date => {

  const timestamp = date.getTime() - date.getTimezoneOffset() * 60 * 1000

  return new Date(timestamp)
}

interface Props {
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: (date: Date) => void;
  setDateTo: (date: Date) => void;
}

/**
 * Компонент выбора временного интервала для отчета
 * @param props
 * @returns
 */
const ReportsDateRange: FC<Props> = (props) => {
  const { dateFrom, dateTo, setDateFrom, setDateTo } = props;

  const { t } = useTranslation();

  const onFromDateChange = (value: Date | null) => {
    if (!value) {
      return;
    }

    setDateFrom(dateWithoutTimeZone(dayjs(value).startOf('day').toDate()));
  };

  const onToDateChange = (value: Date | null) => {
    if (!value) {
      return;
    }

    setDateTo(dateWithoutTimeZone(dayjs(value).endOf('day').toDate()));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography sx={{ pr: 1.25 }}>
        {t("reports.field.date-input.from")}
      </Typography>
      <DesktopDatePicker
        inputFormat="DD.MM.YYYY"
        value={dateFrom}
        onChange={onFromDateChange}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
      <Typography>{t("reports.field.date-input.to")}</Typography>
      <DesktopDatePicker
        inputFormat="DD.MM.YYYY"
        value={dateTo.getTime() - 3 * 60 * 60 * 1000}
        onChange={onToDateChange}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};

export default memo(ReportsDateRange);
