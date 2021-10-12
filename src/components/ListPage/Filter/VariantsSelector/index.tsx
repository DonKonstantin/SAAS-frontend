import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Theme, Tooltip,} from "@mui/material";
import React from "react";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    label: {
        fontSize: theme.typography.body2.fontSize,
    },
});

// Свойства компонента
interface ComponentProps extends FilterFieldProperties<"VariantsSelectorInt" | "VariantsSelectorFloat" | "VariantsSelectorString", any, any> {
    classes: {
        label: string
    }
}

/**
 * Компонент вариантного поля фильтрации
 */
class VariantsSelector extends React.Component<ComponentProps> {
    render() {
        return (
            <FormControl component="fieldset" fullWidth className={`variants-selector-grid`}>
                <FormLabel component="legend"
                           className={`variants-selector-grid-caption`}>{this.props.configuration.title}</FormLabel>
                <FormGroup>
                    {
                        // @ts-ignore
                        this.props.value.variants.map((variant: number | string, i: number): any => {
                            return (
                                <Tooltip
                                    key={`filter-${this.props.configuration.field}-variant-tooltip-${i}`}
                                    title={`Показать элементы со значением поля "${this.props.configuration.title}" включающим "${variant}"`}
                                >
                                    <FormControlLabel
                                        key={`filter-${this.props.configuration.field}-variant-${i}`}
                                        control={<Checkbox
                                            color="primary"
                                            checked={
                                                // @ts-ignore
                                                this.props.value.value.indexOf(variant) !== -1
                                            }
                                            onChange={event => {
                                                let values = [...this.props.value.value];
                                                if (!event.target.checked) {
                                                    values = values.filter(val => val !== variant)
                                                } else {
                                                    values.push(variant)
                                                }

                                                this.props.onChange({
                                                    // @ts-ignore
                                                    value: values,
                                                    variants: this.props.value.variants,
                                                })
                                            }}
                                        />}
                                        classes={{label: this.props.classes.label}}
                                        label={`${variant}`}
                                    />
                                </Tooltip>
                            )
                        })
                    }
                </FormGroup>
            </FormControl>
        );
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(VariantsSelector)