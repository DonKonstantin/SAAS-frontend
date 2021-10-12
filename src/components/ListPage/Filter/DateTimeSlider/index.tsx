import React from "react";
import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {Grid, Slider, Theme, Tooltip, Typography} from "@mui/material";
import {createStyles, withStyles} from "@mui/styles";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    label: {
        fontSize: theme.typography.body2.fontSize,
        padding: 0,
        margin: 0,
    },
    slider: {
        padding: "0 18px"
    },
});

// Свойства компонента
interface FieldProps extends FilterFieldProperties<"DateTimeSlider", any, any> {
    classes: {
        label: string
        slider: string
    }
}

// State компонента
interface FieldState {
    min: Date
    max: Date
    currentMin: Date
    currentMax: Date
}

/**
 * Компонент слайдера числовых значений
 */
class DateTimeSlider extends React.Component<FieldProps, FieldState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: FieldProps) {
        super(props);
        this.state = {
            min: new Date(props.value.min),
            max: new Date(props.value.max),
            currentMin: new Date(props.value.currentMin),
            currentMax: new Date(props.value.currentMax),
        }
    }

    /**
     * Установка значения поля при подключении компонента
     */
    componentDidMount() {
        this.setState({
            min: new Date(this.props.value.min),
            max: new Date(this.props.value.max),
            currentMin: new Date(this.props.value.currentMin),
            currentMax: new Date(this.props.value.currentMax),
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
                min: new Date(this.props.value.min),
                max: new Date(this.props.value.max),
                currentMin: new Date(this.props.value.currentMin),
                currentMax: new Date(this.props.value.currentMax),
            })
        }
    }

    /**
     * Получение значений снизу для слайдера
     */
    getMarksAndStep(): {marks: {value: number, label: string}[], step: number} {
        const marksQuantity = 5;
        const diapason = this.state.max.getTime() - this.state.min.getTime();
        const step = diapason < marksQuantity ? 1 : Math.ceil(diapason / marksQuantity);

        let marks: {value: number, label: string}[] = [];
        for (let i = this.state.min.getTime(); i < this.state.max.getTime(); i += step) {
            const dateLabel = new Date(i);
            const day = dateLabel.getDate();
            const month = dateLabel.getMonth() + 1;

            marks.push({
                label: `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`,
                value: i,
            })
        }

        marks.push({
            label: `${this.state.max.getDate() < 10 ? `0${this.state.max.getDate()}` : this.state.max.getDate()}.${this.state.max.getMonth() + 1 < 10 ? `0${this.state.max.getMonth() + 1}` : this.state.max.getMonth() + 1}`,
            value: this.state.max.getTime(),
        });

        return {
            marks: marks,
            step: diapason < marksQuantity ? 1 : Math.ceil(step / 20),
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const config = this.getMarksAndStep();
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={this.props.classes.label} id={`slider-${this.props.configuration.field}`} gutterBottom>
                        {this.props.configuration.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/*<KeyboardDatePicker*/}
                            {/*    inputVariant="outlined"*/}
                            {/*    className={`list-filter-date-input`}*/}
                            {/*    margin="normal"*/}
                            {/*    label="С"*/}
                            {/*    size={"small"}*/}
                            {/*    format="dd.MM.yyyy"*/}
                            {/*    value={this.state.currentMin}*/}
                            {/*    minDate={this.state.min}*/}
                            {/*    maxDate={this.state.max}*/}
                            {/*    cancelLabel={`Отмена`}*/}
                            {/*    onChange={date => {*/}
                            {/*        this.setState({*/}
                            {/*            ...this.state,*/}
                            {/*            currentMin: new Date(date ? date.getTime() : this.state.currentMin),*/}
                            {/*        });*/}

                            {/*        this.props.onChange({*/}
                            {/*            min: this.state.min,*/}
                            {/*            max: this.state.max,*/}
                            {/*            currentMin: new Date(date ? date.getTime() : this.state.currentMin),*/}
                            {/*            currentMax: this.state.currentMax*/}
                            {/*        })*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Grid>
                        <Grid item xs={6}>
                            {/*<KeyboardDatePicker*/}
                            {/*    inputVariant="outlined"*/}
                            {/*    className={`list-filter-date-input`}*/}
                            {/*    margin="normal"*/}
                            {/*    label="По"*/}
                            {/*    size={"small"}*/}
                            {/*    format="dd.MM.yyyy"*/}
                            {/*    value={this.state.currentMax}*/}
                            {/*    minDate={this.state.min}*/}
                            {/*    maxDate={this.state.max}*/}
                            {/*    cancelLabel={`Отмена`}*/}
                            {/*    onChange={date => {*/}
                            {/*        this.setState({*/}
                            {/*            ...this.state,*/}
                            {/*            currentMax: new Date(date ? date.getTime() : this.state.currentMax),*/}
                            {/*        });*/}

                            {/*        this.props.onChange({*/}
                            {/*            min: this.state.min,*/}
                            {/*            max: this.state.max,*/}
                            {/*            currentMin: this.state.currentMin,*/}
                            {/*            currentMax: new Date(date ? date.getTime() : this.state.currentMax)*/}
                            {/*        })*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title={`Фильтрация по диапазону значений поля "${this.props.configuration.title}". Поле фильтруется по формату "${this.state.currentMin.toISOString()} <= значение <= ${this.state.currentMax.toISOString()}"`}>
                        <div className={this.props.classes.slider}>
                            <Slider
                                value={[this.state.currentMin.getTime(), this.state.currentMax.getTime()]}
                                getAriaValueText={value => `${value}`}
                                valueLabelFormat={value => {
                                    const dateLabel = new Date(value);
                                    const day = dateLabel.getDate();
                                    const month = dateLabel.getMonth() + 1;

                                    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`
                                }}
                                aria-labelledby={`slider-${this.props.configuration.field}`}
                                min={this.state.min.getTime()}
                                max={this.state.max.getTime()}
                                step={config.step}
                                marks={config.marks}
                                onChange={(_, values) => {
                                    if (!Array.isArray(values) || values.length !== 2) {
                                        return
                                    }

                                    this.setState({
                                        ...this.state,
                                        currentMin: new Date(values[0]),
                                        currentMax: new Date(values[1]),
                                    })
                                }}
                                onChangeCommitted={(_, values) => {
                                    if (!Array.isArray(values) || values.length !== 2) {
                                        return
                                    }

                                    this.props.onChange({
                                        min: this.state.min,
                                        max: this.state.max,
                                        currentMin: new Date(values[0]),
                                        currentMax: new Date(values[1]),
                                    })
                                }}
                                valueLabelDisplay="auto"
                            />
                        </div>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(DateTimeSlider)