import {FC, useEffect, useMemo, useState} from "react";
import {DateRange, DateRangePicker, LocalizationProvider} from "@mui/lab";
import {Stack, TextField} from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import {FilterFieldProperties} from "../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "../ListPageParts/Filter/useFieldConfiguration";
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import ruLocale from 'dayjs/locale/ru'
import dayjs from "dayjs";

// Слайдер для значений типа Int
const DateTimeRangeField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props;

    //  получаем конфигурацию поля
    const fieldConfig = useFieldConfiguration(fieldCode);

    //  стэйт данных полей ввода
    const [stateValue, setStateValue] = useState<DateRange<Date>>([null, null]);

    const {value} = fieldConfig || {};
    const [minDate, maxDate] = useMemo(
        () => {
            if (!value?.value) {
                return [undefined, undefined]
            }

            return [
                value?.value.min ? dayjs(value?.value.min as string) : undefined,
                value?.value.max ? dayjs(value?.value.max as string) : undefined,
            ]
        },
        [value?.value],
    )

    //  записываем значение стэйта данных полей
    useEffect(() => {
        if (JSON.stringify(value?.value || {}) === JSON.stringify(stateValue)) {
            return
        }

        const currentMin = value?.value.currentMin ? new Date(value.value.currentMin) : null
        const currentMax = value?.value.currentMax ? new Date(value.value.currentMax) : null

        setStateValue([currentMin, currentMax]);
    }, [value?.value]);

    if (!fieldConfig || !stateValue) {
        return null
    }

    const {t, fieldConfig: {title}, onChangeFilterValues} = fieldConfig;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div className={'filter-title'}>{t(title)}</div>
            <DateRangePicker
                startText={''}
                toolbarTitle={t(title)}
                endText={''}
                value={stateValue}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newValue) => {
                    const [min, max] = newValue;

                    setStateValue(newValue);

                    return onChangeFilterValues(
                        fieldCode,
                        {
                            ...value,
                            value: {
                                ...value.value,
                                currentMin: dayjs(min).startOf("day").toDate().toISOString(),
                                currentMax: dayjs(max).endOf("day").toDate().toISOString(),
                            }
                        } as any
                    )
                }}
                renderInput={(startProps, endProps) => (
                    <Stack
                        spacing={2}
                        direction={"row"}
                        alignItems={"center"}
                        sx={{
                            flexWrap: "nowrap",
                            justifyContent: "space-between",
                            width: '100%'
                        }}
                    >
                        <TextField
                            {...startProps}
                            variant={"standard"}
                            fullWidth
                        />
                        <DateRangeIcon/>
                        <TextField
                            {...endProps}
                            variant={"standard"}
                            fullWidth
                        />
                    </Stack>
                )}
            />
        </LocalizationProvider>
    );
};

// Экспортируем компонент
export default DateTimeRangeField;
