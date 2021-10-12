import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Theme,
    Tooltip
} from "@mui/material";
import React, {useCallback} from "react";
import clsx from "clsx";
import {EditFieldProperties} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import CloseIcon from '@mui/icons-material/Close';
import {createStyles, makeStyles} from "@mui/styles";

// Стили компонента
const useStyles = makeStyles((theme: Theme) => createStyles({
    input: {
        padding: theme.spacing(2),
        paddingRight: 0,
        paddingLeft: 0,
    },
    inputWithoutPrefix: {
        paddingLeft: theme.spacing(2),
    },
    label: {
        transform: "translate(14px, 18px) scale(1)"
    },
    container: {
        flexWrap: "nowrap",
        alignItems: "center",
    },
    inputContainer: {
        flex: "1 1 0"
    },
}));

// Свойства компонента
export interface Props extends Omit<EditFieldProperties<keyof Schemas, any>, "value" | "onChange"> {
    index: number
    value: string
    isDeletable: boolean

    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    autoComplete?: string

    onChange: (callback: {(values: string[]): string[]}) => void
}

// Компонент одиночной строки
const SingleStringRowComponent = (props: Props) => {
    const {
        index,
        value,
        isDeletable,
        onChange,
        tooltip,
        prefix,
        suffix,
        autoComplete = "off",
        error,
        configuration,
    } = props;
    const classes = useStyles();


    let startAdornment: React.ReactNode = null;
    if (prefix) {
        startAdornment = (
            <InputAdornment position="start">
                {prefix}
            </InputAdornment>
        )
    }

    // Обработка изменения значения строки
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const {value} = e.target;
        onChange(values => {
            const newValues = [...values];
            newValues[index] = value;

            return newValues;
        })

    }, [onChange, index]);

    // Обработка удаления строки
    const handleDelete = useCallback((e: React.ChangeEvent<unknown>) => {
        e.persist();
        onChange(values => {
            return [...values].filter((_, i) => i !== index);
        });
    }, [onChange, index]);

    const field = (
        <FormControl variant="outlined" fullWidth>
            <InputLabel
                error={!!error}
                classes={{outlined: classes.label}}
            >
                {configuration.title} #{index + 1}
            </InputLabel>
            <OutlinedInput
                type={'text'}
                classes={{
                    input: classes.input,
                    root: clsx({[classes.inputWithoutPrefix]: !startAdornment})
                }}
                label={(<div>{configuration.title} #{index + 1}</div>)}
                value={value !== null ? `${value}` : ``}
                error={!!error}
                fullWidth
                startAdornment={startAdornment}
                autoComplete={autoComplete}
                endAdornment={
                    suffix
                        ? (
                            <InputAdornment position="end">
                                {suffix}
                            </InputAdornment>
                        )
                        : undefined
                }
                onChange={handleChange}
            />
            {!!error && (
                <FormHelperText error>{error}</FormHelperText>
            )}
        </FormControl>
    );

    return <>
        <Grid container className={classes.container} spacing={1}>
            <Grid item className={classes.inputContainer}>
                {!tooltip && field}
                {!!tooltip && (
                    <Tooltip title={tooltip}>
                        {field}
                    </Tooltip>
                )}
            </Grid>
            {isDeletable && (
                <Grid item>
                    <Tooltip title={"Удалить строку"}>
                        <IconButton size="small" onClick={handleDelete} color={"secondary"}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )}
        </Grid>
    </>
};

// Экспортируем компонент
export default SingleStringRowComponent;