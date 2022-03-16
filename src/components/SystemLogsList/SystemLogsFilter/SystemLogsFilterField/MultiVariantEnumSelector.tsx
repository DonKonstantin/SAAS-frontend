import {FC, useCallback} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";

const MultiVariantEnumSelector: FC<SystemLogsFilterFieldProps> = props => {
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
        variants
    } = fieldConfig;

    if (!variants) {
        return <></>;
    }

    const {setFilterField} = filterState;

    const fieldValue = filterState[fieldCode] as string[] || [];

    const handleChangeFilterValue = useCallback(
        (event: SelectChangeEvent<typeof variants>) => {
            const value = event.target.value;

            // @ts-ignore
            setFilterField(fieldCode, value);
        },
        [],
    );


    return (
        <FormControl   variant="standard" fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">{t(`${i18nextPath}.title`)}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                // @ts-ignore
                value={fieldValue}
                onChange={handleChangeFilterValue}
                renderValue={(selected) =>
                    // @ts-ignore
                    selected.map(
                            (value) => t(`${i18nextPath}.variants.${variants ? variants[value] : value}`)
                        )
                        .join(', ')
                }
                MenuProps={{disablePortal: true}}
            >

                {Object.values(variants).map((name: string) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={fieldValue.indexOf(name) > -1}/>
                        <ListItemText primary={t(`${i18nextPath}.variants.${variants ? variants[name] : name}`)}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default MultiVariantEnumSelector
