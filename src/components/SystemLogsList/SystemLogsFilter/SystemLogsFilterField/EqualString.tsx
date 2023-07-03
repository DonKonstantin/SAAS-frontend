import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";

const useDebounceValue: {<T>(value: T, delay: number): T} = (value, delay) => {
    const [delayValue, setValue] = useState(value);
    useEffect(
        () => {
            const timer = setTimeout(
                () => setValue(value),
                delay,
            )

            return () => clearTimeout(timer);
        },
        [value]
    )

    return delayValue
}

const EqualStringField: FC<SystemLogsFilterFieldProps> = props => {
    const {t} = useTranslation();
    const {
        fieldCode
    } = props;
    const filterState = useSystemLogsFilterEntity();
    const fieldConfig = SystemLogsFilterConfiguration[fieldCode];
    const [value, setValue] = useState<string>(filterState[fieldCode] as string || "");
    const updateValue = useDebounceValue(value, 500);

    useEffect(
        () => {
            if (!filterState[fieldCode]) {
                setValue("");

                return;
            }

            setValue(filterState[fieldCode] as string);
        },
        [filterState[fieldCode]],
    )

    const handleChangeFilterValue = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const value = event.target.value;

            // @ts-ignore
            setValue(value);
        },
        [],
    );

    useEffect(
        () => {
            setFilterField(fieldCode, updateValue);
        },
        [updateValue],
    )

    if (!fieldConfig) {
        return <></>;
    }

    const {
        i18nextPath,
    } = fieldConfig;

    const {setFilterField} = filterState;

    return (
        <TextField
            value={value}
            label={t(`${i18nextPath}.title`) as string}
            fullWidth
            variant="standard"
            autoComplete={"off"}
            placeholder={t(`${i18nextPath}.placeholder`) as string}
            onChange={handleChangeFilterValue}
        />
    )
}

export default EqualStringField
