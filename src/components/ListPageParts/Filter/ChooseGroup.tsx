import {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {RadioGroupProps} from "@mui/material/RadioGroup/RadioGroup";
import useFieldConfiguration from "./useFieldConfiguration";
import {SimpleComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/SimpleComponentValue";

// Компонент вывода группы радиокнопок для логических полей
const ChooseGroup: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig
    const handleChange: RadioGroupProps['onChange'] = (_, v) => {
        let val: boolean | null = null
        switch (true) {
            case v === "true":
                val = true
                break
            case v === "false":
                val = false
                break
        }

        onChangeFilterValues(fieldCode, {...value, value: {value: val}} as any)
    }

    const currentValue = value?.value as SimpleComponentValue<boolean | null>
    if (!currentValue) {
        return null
    }

    let textValue = "all"
    switch (currentValue.value) {
        case true:
            textValue = "true"
            break
        case false:
            textValue = "false"
            break
    }

    const translationKey = `entity-list.components.filter.fields.choose-group`
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{t(title)}</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={textValue}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="all"
                    control={<Radio/>}
                    label={t(`${translationKey}.all`) as string}
                />
                <FormControlLabel
                    value="true"
                    control={<Radio/>}
                    label={t(`${translationKey}.yes`) as string}
                />
                <FormControlLabel
                    value="false"
                    control={<Radio/>}
                    label={t(`${translationKey}.no`) as string}
                />
            </RadioGroup>
        </FormControl>
    )
}

// Экспортируем компонент
export default ChooseGroup