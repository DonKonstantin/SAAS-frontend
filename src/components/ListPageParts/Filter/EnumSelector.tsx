import {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {SimpleComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";

// Компонент вывода поля фильтра для
const EnumSelector: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, fieldSchema: {enum: enumData}, value, onChangeFilterValues} = fieldConfig
    const translationKey = `entity-list.components.filter.fields.enum-selector`

    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel id={`list-filter-${fieldCode}-label`}>{t(title)}</InputLabel>
            <Select
                labelId={`list-filter-${fieldCode}-label`}
                id={`list-filter-${fieldCode}`}
                value={(value?.value as SimpleComponentValue<string | null>)?.value || ""}
                onChange={event => {
                    let val: string | null = null
                    if (event.target.value && event.target.value !== "") {
                        val = event.target.value
                    }

                    onChangeFilterValues(fieldCode, {...value, value: {value: val}} as any)
                }}
                label={t(title)}
            >
                <MenuItem value="">
                    <Typography variant="overline" sx={{p: 0}}>
                        {t(`${translationKey}.all-variants`)}
                    </Typography>
                </MenuItem>
                {!!enumData && Object.keys(enumData.variants).map(variant => (
                    <MenuItem key={variant} value={variant}>
                        {t(enumData.variants[variant])}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

// Экспортируем компонент
export default EnumSelector