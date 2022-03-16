import {
    FC,
    useEffect,
    useState
} from "react";

import {DateRangePicker, LocalizationProvider} from "@mui/lab";
import {
    Stack,
    TextField
} from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import {FilterFieldProperties} from "../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "../ListPageParts/Filter/useFieldConfiguration";
import {SliderComponentValues} from "services/listDataLoader/filterLoader/fieldValues/Slider";
import DateFnsUtils from '@date-io/date-fns';


// Слайдер для значений типа Int
const DateTimeRangeField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props;

    //  получаем конфигурацию поля
    const fieldConfig = useFieldConfiguration(fieldCode);

    //  стэйт данных полей ввода
    const [stateValue, setStateValue] = useState<SliderComponentValues<string | null>>();

    const {value} = fieldConfig || {};

    //  записываем значение стэйта данных полей
    useEffect(() => {
        if (JSON.stringify(value?.value || {}) === JSON.stringify(stateValue)) {
            return
        }

        setStateValue(value?.value as SliderComponentValues<string>);
    }, [value?.value]);

    if (!fieldConfig || !stateValue) {
        return null
    }

    const {t, fieldConfig: {title}, onChangeFilterValues} = fieldConfig;

    return (
        <LocalizationProvider dateAdapter={DateFnsUtils}>
            <div className={'filter-title'}>{t(title)}</div>
            <DateRangePicker
                startText={'from'}
                toolbarTitle={t(title)}
                endText={'to'}
                mask={"__.__.____"}
                value={[stateValue.currentMin, stateValue.currentMax]}
                minDate={new Date(stateValue.min as string)}
                maxDate={new Date(stateValue.max as string)}
                onChange={(newValue) => {
                    let [min, max] = newValue

                    const parsedMin = !!min ? (typeof min === "string" ? new Date(min) : min) : undefined
                    if (parsedMin) {
                        parsedMin.setHours(0)
                        parsedMin.setMinutes(0)
                        parsedMin.setSeconds(0)
                    }

                    const parsedMax = !!max ? (typeof max === "string" ? new Date(max) : max) : undefined
                    if (parsedMax) {
                        parsedMax.setHours(23)
                        parsedMax.setMinutes(59)
                        parsedMax.setSeconds(59)
                    }

                    setStateValue(value => ({
                        ...(value as SliderComponentValues<string | null>),
                        currentMin: min as any,
                        currentMax: max as any,
                    }));

                    if (!parsedMin || !parsedMax || isNaN(parsedMin as any) || isNaN(parsedMax as any)) {
                        return
                    }

                    return onChangeFilterValues(
                        fieldCode,
                        {
                            ...value,
                            value: {
                                ...stateValue,
                                currentMin: parsedMin.toISOString(),
                                currentMax: parsedMax.toISOString()
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
                            sx={{
                                width: '100%'
                            }}
                        />
                        <DateRangeIcon/>
                        <TextField
                            {...endProps}
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Stack>
                )}
            />
        </LocalizationProvider>
    );
};

// Экспортируем компонент
export default DateTimeRangeField;
