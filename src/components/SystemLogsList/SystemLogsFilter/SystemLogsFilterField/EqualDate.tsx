import {FC, useCallback, useEffect, useState} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";
import DateAdapter from '@mui/lab/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import ruLocale from 'dayjs/locale/ru';

const EqualDate: FC<SystemLogsFilterFieldProps> = props => {
    const {t} = useTranslation();
    const {
        fieldCode
    } = props;
    const filterState = useSystemLogsFilterEntity();
    const fieldConfig = SystemLogsFilterConfiguration[fieldCode];

    if (!fieldConfig) {
        return <></>;
    }

    const {
        i18nextPath,
    } = fieldConfig;

    const {setFilterField} = filterState;

    const fieldValue = filterState[fieldCode];
    const [selectedDate, setDate] = useState<Date | null>(
        fieldValue
            ? new Date(fieldValue as string)
            : null
    );

    useEffect(
        () => {
            setDate(
                fieldValue
                    ? new Date(fieldValue as string)
                    : null
            )
        },
        [fieldValue],
    )


    const handleChangeFilterValue = useCallback(
        (date: Date | null) => {

            // @ts-ignore
            setFilterField(fieldCode, date && new Date(date) || undefined);
        },
        [],
    );

    return (
        <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
            <DatePicker
                onChange={handleChangeFilterValue}
                value={selectedDate}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        fullWidth
                        label={t(`${i18nextPath}.title`) as string}
                        placeholder={t(`${i18nextPath}.placeholder`) as string}
                        variant={"standard"}
                    />
                }
            />

        </LocalizationProvider>
    )
}

export default EqualDate
