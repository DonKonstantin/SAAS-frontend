import {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "./useFieldConfiguration";
import {VariantsComponentValue} from "../../../services/listDataLoader/filterLoader/fieldValues/VariantsComponentValue";
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";

// Компонент вариантного поля фильтрации для отношений (с автодополнением)
const RelationAutocompleteSelector: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode)
    if (!fieldConfig) {
        return null
    }

    const {t, fieldConfig: {title}, value, onChangeFilterValues} = fieldConfig

    const currentValue = value.value as VariantsComponentValue<(string | number)[]>
    if (!currentValue || !value.preloaded) {
        return null
    }

    const currentValues = value.preloaded.choseVariants.filter(variant => {
        return currentValue.value.find(val => variant.key === val)
    });

    const translationKey = `entity-list.components.filter.fields.autocomplete`
    return (
        <Autocomplete
            id={`list-fields-filter-${fieldCode}`}
            options={value.preloaded.choseVariants}
            getOptionLabel={(option) => option.title}
            value={currentValues}
            fullWidth
            multiple
            limitTags={1}
            noOptionsText={t(`${translationKey}.noOptionsText`)}
            closeText={t(`${translationKey}.closeText`)}
            clearText={t(`${translationKey}.clearText`)}
            openText={t(`${translationKey}.openText`)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t(title) as string}
                    variant="standard"
                />
            )}
            onChange={(_, val) => {
                onChangeFilterValues(
                    fieldCode,
                    {...value, value: {
                        value: val.map(val => typeof val === "string" ? val : val.key),
                        variants: currentValue.variants,
                    }} as any
                )
            }}
        />
    );
}

// Экспортируем компонент
export default RelationAutocompleteSelector
