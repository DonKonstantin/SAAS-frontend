import {FC, useCallback, useEffect, useState} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";
import DateAdapter from '@mui/lab/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {IconButton, InputAdornment, Select, TextField, Tooltip} from "@mui/material";
import ruLocale from 'dayjs/locale/ru';
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";

const DatePickerWithReset = styled(DatePicker)`
    & .MuiInputAdornment-positionEnd{
        margin-left: -50px
    }
    
    & .MuiInput-input  {
        padding-right: 50px!important;
    }
`

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

    const handleResetField = useCallback(
        () => {
            setFilterField(fieldCode, undefined)
        },
        [fieldCode]
    )

    return (
        <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
            <DatePickerWithReset
                onChange={handleChangeFilterValue}
                value={selectedDate}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        fullWidth
                        label={t(`${i18nextPath}.title`) as string}
                        placeholder={t(`${i18nextPath}.placeholder`) as string}
                        variant={"standard"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {!!selectedDate && (
                                        <InputAdornment position="end" sx={{mr: -2, ml: "-50px"}}>
                                            <Tooltip title="Очистить поле">
                                                <IconButton size={"small"} onClick={handleResetField}>
                                                    <CloseIcon
                                                        color="primary"
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )}
                                    {params?.InputProps.endAdornment}
                                </>
                            )
                        }}

                    />
                }
            />

        </LocalizationProvider>
    )
}

export default EqualDate
