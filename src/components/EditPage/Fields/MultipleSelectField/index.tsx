import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    createStyles,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip, withStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params<T extends EditValueType> {
    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    variants: {value: T, caption: string}[]
}

// Поле ввода числового значения
export const MultipleSelectField: TFieldsFactory<Params<EditValueType>> = (params: Params<EditValueType> = {variants: []}) => {

    // Стили компонента
    const styles = createStyles({
        label: {
            transform: "translate(14px, 18px) scale(1)"
        }
    });

    // Сортируем переданные варианты значений
    const options = params.variants
        .map((option) => {
            const firstLetter = option.caption[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        })
        .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
    ;

    // Свойства компонента
    interface ComponentProps extends EditFieldProperties<keyof Schemas, any> {
        classes: {
            label: string,
        }
    }

    // Компонент вывода поля для ввода
    class Component extends React.Component<ComponentProps> {
        /**
         * Обработка изменения значения поля
         * @param value
         */
        handleChange(value: EditValueType) {
            this.props.onChange(value)
        }

        /**
         * Условия рендера компонента
         * @param nextProps
         */
        shouldComponentUpdate(nextProps: Readonly<EditFieldProperties<keyof Schemas, any>>): boolean {
            const data = JSON.stringify(this.props.value || {});
            const nextData = JSON.stringify(nextProps.value || {});

            return data !== nextData || this.props.error !== nextProps.error
        }

        /**
         * Рендеринг поля
         */
        renderField() {
            const baseValue = Array.isArray(this.props.value) ? this.props.value : [this.props.value];
            // @ts-ignore
            const currentValue: {value: EditValueType, caption: string, firstLetter: string}[] = baseValue
                .map(val => options.find(variant => variant.value === val))
                .filter(item => item !== undefined);

            const isPrefixVisible = !!params.prefix || currentValue.length > 0;

            return (
                <Autocomplete
                    id={`outlined-adornment-autocomplete-${this.props.configuration.field}`}
                    options={options}
                    multiple
                    value={currentValue || undefined}
                    getOptionLabel={option => option.caption}
                    groupBy={(option) => option.firstLetter}
                    onChange={(_, val) => {
                        // @ts-ignore
                        this.handleChange(val ? val.map(value => value.value) : null)
                    }}
                    clearText={`Очистить поле`}
                    popupIcon={<KeyboardArrowDownIcon />}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            classes={{
                                root: `edit-field-autocomplete-input`,
                            }}
                            InputLabelProps={{
                                ...props.InputLabelProps,
                                classes: {
                                    outlined: this.props.classes.label
                                }
                            }}
                            error={!!this.props.error}
                            helperText={this.props.error}
                            InputProps={{
                                ...props.InputProps,
                                ...isPrefixVisible
                                    ? {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {params.prefix}
                                                <div>{props.InputProps.startAdornment}</div>
                                            </InputAdornment>
                                        )
                                    }
                                    : {},
                                autoComplete: "off",
                                name: `outlined-adornment-autocomplete-${this.props.configuration.field}`,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {params.suffix}
                                        <div className={`edit-field-autocomplete-arrow`}>{props.InputProps.endAdornment}</div>
                                        <Tooltip title={`Восстановить значение по умолчанию`}>
                                            <IconButton
                                                size={`small`}
                                                color={!!this.props.error ? `secondary` : `primary`}
                                                onClick={() => ResetDefaultValueForField({
                                                    configuration: this.props.configuration,
                                                    values: this.props.values,
                                                    additionData: this.props.additionData,
                                                    onSetValue: this.props.onChange,
                                                })}
                                                edge="end"
                                            >
                                                <RestoreOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                            label={this.props.configuration.title}
                            variant="outlined"
                        />
                    )}
                />
            )
        }

        /**
         * Рендеринг компонента
         */
        render() {
            if (0 === options.length) return null;

            const isWithTooltip = !!params.tooltip && (typeof params.tooltip !== "string" || params.tooltip.length > 0);
            return (
                <React.Fragment>
                    {isWithTooltip && (
                        <Tooltip title={params.tooltip ? params.tooltip : ``}>
                            {this.renderField()}
                        </Tooltip>
                    )}
                    {!isWithTooltip && this.renderField()}
                </React.Fragment>
            )
        }
    }

    // Подключаем стили к компоненту
    return {component: withStyles(styles)(Component)}
};