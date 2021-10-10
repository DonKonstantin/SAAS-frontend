import React from "react";
import {
    createStyles,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Theme,
    Tooltip, withStyles
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {ValidationResult} from "../../../settings/pages/system/edit";

// Стили компонента
const styles = (theme: Theme) => createStyles({
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
    }
});

// Свойства компонента поля пароля
export interface PasswordProps {
    value: string
    label: string
    name: string
    error?: ValidationResult
    onChange: {(value: string): void}

    classes: {
        input: string,
        label: string,
        inputWithoutPrefix: string,
    }
}

// State компонента
interface ComponentState {
    isVisibleValue: boolean
}

// Компонент поля пароля
class PasswordField extends React.Component<PasswordProps, ComponentState> {
    state = {isVisibleValue: false};

    /**
     * Переключение состояния видимости значения пароля
     */
    handleToggleVisibility() {
        this.setState({
            ...this.state,
            isVisibleValue: !this.state.isVisibleValue,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <FormControl variant="outlined" fullWidth>
                <InputLabel error={!!this.props.error} classes={{outlined: this.props.classes.label}} htmlFor={this.props.name}>{this.props.label}</InputLabel>
                <OutlinedInput
                    id={this.props.name}
                    type={this.state.isVisibleValue ? "text" : "password" }
                    classes={{
                        input: this.props.classes.input,
                        root: this.props.classes.inputWithoutPrefix,
                    }}
                    label={(<div>{this.props.label}</div>)}
                    value={this.props.value}
                    error={!!this.props.error}
                    autoComplete={"new-password"}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <Tooltip title={`${this.state.isVisibleValue ? "Скрыть" : "Показать" } пароль`}>
                                <IconButton
                                    size={`small`}
                                    onClick={() => this.handleToggleVisibility()}
                                    color={!!this.props.error ? `secondary` : `primary`}
                                    edge="end"
                                >
                                    {!this.state.isVisibleValue ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                    onChange={e => {
                        this.props.onChange((e.target as HTMLInputElement).value)
                    }}
                />
                {!!this.props.error && (
                    <FormHelperText error>{this.props.error}</FormHelperText>
                )}
            </FormControl>
        )
    }
}

export default withStyles(styles)(PasswordField)