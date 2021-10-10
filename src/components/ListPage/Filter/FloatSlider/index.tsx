import React from "react";
import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {createStyles, Slider, Theme, Tooltip, Typography, withStyles} from "@material-ui/core";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    label: {
        fontSize: theme.typography.body2.fontSize,
    },
    slider: {
        padding: "0 18px"
    }
});

// Свойства компонента
interface FieldProps extends FilterFieldProperties<"FloatSlider", any, any> {
    classes: {
        label: string
        slider: string
    }
}

// State компонента
interface FieldState {
    min: number
    max: number
    currentMin: number
    currentMax: number
}

/**
 * Компонент слайдера числовых дробных значений
 */
class FloatSlider extends React.Component<FieldProps, FieldState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: FieldProps) {
        super(props);
        this.state = {
            min: props.value.min,
            max: props.value.max,
            currentMin: props.value.currentMin,
            currentMax: props.value.currentMax,
        }
    }

    /**
     * Установка значения поля при подключении компонента
     */
    componentDidMount() {
        this.setState({
            min: this.props.value.min,
            max: this.props.value.max,
            currentMin: this.props.value.currentMin,
            currentMax: this.props.value.currentMax,
        })
    }

    /**
     * Обновляем текущее значение поля, если пришло изменение извне и значение не совпадает с текущим
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<FieldProps>) {
        if (JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)
            && JSON.stringify(this.props.value) !== JSON.stringify({
                min: this.state.min,
                max: this.state.max,
                currentMin: this.state.currentMin,
                currentMax: this.state.currentMax,
            })
        ) {
            this.setState({
                min: this.props.value.min,
                max: this.props.value.max,
                currentMin: this.props.value.currentMin,
                currentMax: this.props.value.currentMax,
            })
        }
    }

    /**
     * Получение значений снизу для слайдера
     */
    getMarksAndStep(): {marks: {value: number, label: string}[], step: number} {
        const marksQuantity = 5;
        const diapason = this.state.max - this.state.min;
        const step = diapason / marksQuantity;

        let marks: {value: number, label: string}[] = [];
        for (let i = this.state.min; i < this.state.max; i += step) {
            const value = Math.round(i * 100) / 100;
            marks.push({
                label: `${value}`,
                value: value,
            })
        }

        marks.push({
            label: `${this.state.max}`,
            value: this.state.max,
        });

        return {
            marks: marks,
            step: Math.round((step / 20) * 1000) / 1000,
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const config = this.getMarksAndStep();
        return (
            <React.Fragment>
                <Typography className={this.props.classes.label} id={`slider-${this.props.configuration.field}`} gutterBottom>
                    {this.props.configuration.title}
                </Typography>
                <Tooltip title={`Фильтрация по диапазону значений поля "${this.props.configuration.title}". Поле фильтруется по формату "${this.state.currentMin} <= значение <= ${this.state.currentMax}"`}>
                    <div className={this.props.classes.slider}>
                        <Slider
                            value={[this.state.currentMin, this.state.currentMax]}
                            getAriaValueText={value => `${value}`}
                            aria-labelledby={`slider-${this.props.configuration.field}`}
                            min={this.state.min}
                            max={this.state.max}
                            step={config.step}
                            marks={config.marks}
                            onChange={(_, values) => {
                                if (!Array.isArray(values) || values.length !== 2) {
                                    return
                                }

                                this.setState({
                                    ...this.state,
                                    currentMin: values[0],
                                    currentMax: values[1],
                                })
                            }}
                            onChangeCommitted={(_, values) => {
                                if (!Array.isArray(values) || values.length !== 2) {
                                    return
                                }

                                this.props.onChange({
                                    min: this.state.min,
                                    max: this.state.max,
                                    currentMin: values[0],
                                    currentMax: values[1],
                                })
                            }}
                            valueLabelDisplay="auto"
                        />
                    </div>
                </Tooltip>
            </React.Fragment>
        );
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(FloatSlider)