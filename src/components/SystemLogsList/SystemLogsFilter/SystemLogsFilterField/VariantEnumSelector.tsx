import {FC, useCallback} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";
import {
    FormControl, IconButton, InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent, Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";

const SelectWithReset = styled(Select)`
    & .MuiInputAdornment-positionEnd{
        margin-left: -50px
    }
    
    & .MuiInput-input  {
        padding-right: 50px!important;
    }
`

const VariantEnumSelector: FC<SystemLogsFilterFieldProps> = props => {
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
            setFilterField(fieldCode, value ? [value]: []);
        },
        [],
    );

    const handleResetField = useCallback(
        () => {
            setFilterField(fieldCode, [])
        },
        [fieldCode]
    )

    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">{t(`${i18nextPath}.title`)}</InputLabel>
            <SelectWithReset
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                variant="standard"
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
                MenuProps={{disableScrollLock: true}}
                endAdornment={
                    fieldValue.length > 0 && (
                        <InputAdornment position="end" sx={{mr: "20px"}}>
                            <Tooltip title="Очистить поле">
                                <IconButton size={"small"} onClick={handleResetField}>
                                    <CloseIcon
                                        color="primary"
                                    />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    )
                }
            >
                <MenuItem value="">
                    <em>{t(`${i18nextPath}.variants.none`)}</em>
                </MenuItem>
                {Object.values(variants).map((name: string) => (
                    <MenuItem key={name} value={name}>
                        <ListItemText primary={t(`${i18nextPath}.variants.${variants ? variants[name] : name}`)}/>
                    </MenuItem>
                ))}
            </SelectWithReset>
        </FormControl>
    )
}

export default VariantEnumSelector
