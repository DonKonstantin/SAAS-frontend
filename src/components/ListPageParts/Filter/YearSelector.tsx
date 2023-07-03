import React, {FC, memo} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {auditTime} from "rxjs";

const now = new Date();

// Компонент выбора года
const YearSelector: FC<FilterFieldProperties> = props => {
    const {
        fieldCode
    } = props;
    const fieldConfig = useFieldConfiguration(fieldCode, auditTime(100))
    if (!fieldConfig) {
        return null
    }

    const options = Array.from(new Array(100)).map(
        (_, index) => +now.getFullYear() - index
    );

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig

    // Обработка изменения выбранных элементов
    const handleChangeValue = newValue => {
        return onChangeFilterValues(fieldCode, {...value, value: {value: newValue}} as any)
    }

    // @ts-ignore
    const currentValue = value?.value?.value || null;

    return (
        <Autocomplete
            fullWidth
            options={options}
            title={t(`${title}`)}
            onChange={(_, newValue) => handleChangeValue(newValue)}
            value={currentValue}
            getOptionLabel={newValue => `${newValue}`}
            renderInput={
                (params) =>
                    <TextField
                        {...params}
                        variant={"standard"}
                        label={t(title as string)}
                        fullWidth
                    />
            }
        />
    )
}

export default memo(YearSelector, ((prevProps, nextProps) => prevProps.fieldCode === nextProps.fieldCode));
