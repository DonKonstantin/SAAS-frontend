import React from "react";
import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {
    createStyles, FormControl,
    FormControlLabel, FormLabel,
    Radio,
    RadioGroup,
    Theme,
    Tooltip,
    withStyles
} from "@material-ui/core";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    label: {
        fontSize: theme.typography.body2.fontSize,
    },
    root: {
        padding: "0 18px",
    },
    radio: {
        padding: "4px 9px",
    },
    caption: {
        paddingBottom: 8,
        fontSize: theme.typography.body2.fontSize,
    }
});

// Свойства компонента
interface ChooseGroupProps extends FilterFieldProperties<"Checkbox" | "Switch", any, any> {
    classes: {
        label: string
        root: string
        radio: string
        caption: string
    }
}

/**
 * Поле фильтра типа "Checkbox" или "Switch"
 */
class ChooseGroupFilterField extends React.Component<ChooseGroupProps> {
    render() {
        let val: string = "und";
        switch (this.props.value.value) {
            case true:
                val = "true";
                break;
            case false:
                val = "false";
                break
        }

        return (
            <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" className={this.props.classes.caption}>{this.props.configuration.title}</FormLabel>
                <RadioGroup
                    name={`radio-${this.props.configuration.field}`}
                    value={val}
                    onChange={e => {
                        let val: boolean | null = null;
                        switch ((e.target as HTMLInputElement).value) {
                            case "true":
                                val = true;
                                break;
                            case "false":
                                val = false
                        }

                        this.props.onChange({value: val})}
                    }
                >
                    <Tooltip title={`Не учитывать флаг "${this.props.configuration.title}"`}>
                        <FormControlLabel
                            value="und"
                            control={<Radio size={"small"} color={"primary"} className={this.props.classes.radio} />}
                            label="Оба варианта"
                            classes={{
                                label: this.props.classes.label,
                                root: this.props.classes.root,
                            }}
                        />
                    </Tooltip>
                    <Tooltip title={`Показать элементы с флагом "${this.props.configuration.title}"`}>
                        <FormControlLabel
                            value="true"
                            control={<Radio size={"small"} color={"primary"} className={this.props.classes.radio} />}
                            label="Да"
                            classes={{
                                label: this.props.classes.label,
                                root: this.props.classes.root,
                            }}
                        />
                    </Tooltip>
                    <Tooltip title={`Показать элементы без флага "${this.props.configuration.title}"`}>
                        <FormControlLabel
                            value="false"
                            control={<Radio size={"small"} color={"primary"} className={this.props.classes.radio} />}
                            label="Нет"
                            classes={{
                                label: this.props.classes.label,
                                root: this.props.classes.root,
                            }}
                        />
                    </Tooltip>
                </RadioGroup>
            </FormControl>
        );
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(ChooseGroupFilterField)