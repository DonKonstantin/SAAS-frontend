import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Theme, Tooltip,
} from "@mui/material";
import React from "react";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    label: {
        fontSize: theme.typography.body2.fontSize,
    },
});

// Свойства компонента
interface ComponentProps extends FilterFieldProperties<"RelationVariantsSelector", any, any> {
    classes: {
        label: string
    }
}

/**
 * Компонент вариантного поля фильтрации для отношений
 */
class RelationVariantsSelector extends React.Component<ComponentProps> {
    render() {
        return (
            <FormControl component="fieldset" fullWidth className={`variants-selector-grid`}>
                <FormLabel component="legend" className={`variants-selector-grid-caption`}>{this.props.configuration.title}</FormLabel>
                <FormGroup>
                    {this.props.preloaded.choseVariants.map(variant => {
                        return (
                            <Tooltip
                                key={`filter-${this.props.configuration.field}-variant-tooltip-${variant.key}`}
                                title={`Показать элементы со значением поля "${this.props.configuration.title}" включающим "${variant.title}"`}
                            >
                                <FormControlLabel
                                    key={`filter-${this.props.configuration.field}-variant-${variant.key}`}
                                    control={<Checkbox
                                        color="primary"
                                        checked={this.props.value.value.indexOf(variant.key) !== -1}
                                        onChange={event => {
                                            let values = [...this.props.value.value];
                                            if (!event.target.checked) {
                                                values = values.filter(val => val !== variant.key)
                                            } else {
                                                values.push(variant.key)
                                            }

                                            this.props.onChange({
                                                value: values,
                                                variants: this.props.value.variants,
                                            })
                                        }}
                                    />}
                                    classes={{label: this.props.classes.label}}
                                    label={`${variant.title}`}
                                />
                            </Tooltip>
                        )
                    })}
                </FormGroup>
            </FormControl>
        );
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(RelationVariantsSelector)