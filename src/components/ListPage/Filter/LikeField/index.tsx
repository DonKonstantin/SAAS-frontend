import React from "react";
import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {TextField, Tooltip} from "@material-ui/core";

// State компонента
interface FieldState {
    value: string | null
    timeout: NodeJS.Timeout | undefined
}

/**
 * Поле фильтрации строкового значения
 */
export class LikeField extends React.Component<FilterFieldProperties<"Like", any, any>, FieldState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: FilterFieldProperties<"Like", any, any>) {
        super(props);
        this.state = {
            value: props.value.value,
            timeout: undefined,
        }
    }

    /**
     * Установка значения поля при подключении компонента
     */
    componentDidMount() {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout)
        }

        this.setState({
            value: this.props.value.value,
            timeout: undefined,
        })
    }

    /**
     * Обновляем текущее значение поля, если пришло изменение извне и значение не совпадает с текущим
     * Запускаем проброс значения наверх (отложенный), если значение поля изменилось.
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(
        prevProps: Readonly<FilterFieldProperties<"Like", any, any>>,
        prevState: Readonly<FieldState>,
    ) {
        if (prevProps.value.value !== this.props.value.value
            && this.props.value.value !== this.state.value
        ) {
            if (this.state.timeout) {
                clearTimeout(this.state.timeout)
            }

            this.setState({
                ...this.state,
                value: this.props.value.value,
                timeout: undefined,
            })
        }

        if (prevState.value !== this.state.value) {
            if (this.state.timeout) {
                clearTimeout(this.state.timeout)
            }

            const timeout = setTimeout(() => this.props.onChange({value: this.state.value}), 300);
            this.setState({
                ...this.state,
                timeout: timeout
            })
        }
    }

    /**
     * Очищаем таймаут при размонтировании, если он установлен
     */
    componentWillUnmount() {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout)
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <Tooltip title={`Фильтрация по частичному соответствию значения поля "${this.props.configuration.title}"`}>
                <TextField
                    label={this.props.configuration.title}
                    variant="outlined"
                    value={this.state.value !== null ? `${this.state.value}` : ``}
                    fullWidth
                    autoComplete={"off"}
                    onChange={e => {
                        const fieldValue = (e.target as HTMLInputElement).value;
                        let val: string | null = fieldValue.length > 0 ? fieldValue : null;

                        this.setState({
                            ...this.state,
                            value: val,
                        })
                    }}
                />
            </Tooltip>
        );
    }
}