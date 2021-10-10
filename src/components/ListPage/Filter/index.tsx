import React from "react";
import {Button, createStyles, Grid, Paper, Theme, Tooltip, Typography, withStyles} from "@material-ui/core";
import {ListResponse} from "../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../settings/schema";
import {listSchemaConfiguration} from "../../../settings/pages";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {
    AvailableFilterField,
    BaseFilterFieldConfiguration,
    FilterFieldComponents,
    FilterFieldProperties,
} from "../../../services/listDataLoader/filterLoader/types";
import {LoadedFilterData} from "../../../services/listDataLoader/filterLoader/interfaces";
import {filterFieldComponents} from "./components";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {clientServerDetector} from "../../../services/clientServerDetector";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
    },
});

// Свойства компонента
export interface FilterComponentProps {
    response: ListResponse<keyof Schemas>
    onFilterReset: {(): void}
    onChangeFilterValue: {
        <T extends keyof Schemas, F extends keyof Schemas[T]['fields']>(field: F, value: LoadedFilterData<keyof FilterFieldComponents, T, F>): void
    }

    classes: {
        paper: string
    }
}

/**
 * Компонент вывода фильтра листинга сущностей
 */
class FilterComponent extends React.Component<FilterComponentProps> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: FilterComponentProps) {
        super(props);

        this.handleButtonPressEvent = this.handleButtonPressEvent.bind(this)
    }

    /**
     * Подключаем обработку нажатия быстрых клавиш
     */
    componentDidMount() {
        if (clientServerDetector().isClient()) {
            document.addEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.removeEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "KeyR" && event.ctrlKey:
                this.props.onFilterReset();

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        // @ts-ignore
        const actualConfiguration: ListPageConfiguration<any> = listSchemaConfiguration()[this.props.response.parameters.schema];
        return (
            <Paper className={this.props.classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" style={{margin: 0}} gutterBottom>Параметры фильтрации</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {Object.values(this.props.response.parameters.filterConfiguration).map((config, i) => {
                                // @ts-ignore
                                const filterFieldConfig: BaseFilterFieldConfiguration<any, any, AvailableFilterField> = actualConfiguration.filter[config.field];
                                const Component: React.ComponentType<FilterFieldProperties<keyof FilterFieldComponents, any, any>> = filterFieldConfig.customComponent || filterFieldComponents()[filterFieldConfig.filterType];
                                filterFieldConfig.field;
                                // @ts-ignore
                                const value: LoadedFilterData<keyof FilterFieldComponents, any, any> = this.props.response.parameters.currentFilterValues[filterFieldConfig.field];

                                return (
                                    <Grid item xs={12} key={`filter-field-grid-${i}`}>
                                        <Component
                                            key={`filter-field-${i}`}
                                            value={value.value}
                                            onChange={val => {
                                                this.props.onChangeFilterValue(filterFieldConfig.field, {
                                                    configuration: value.configuration,
                                                    preloaded: value.preloaded,
                                                    value: val,
                                                })
                                            }}
                                            configuration={value.configuration}
                                            preloaded={value.preloaded}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip
                            title={(
                                <React.Fragment>
                                    Сброс установленных значений фильтра.
                                    <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                    <i>Комбинация клавиш: <b>CTRL + R</b></i>
                                </React.Fragment>
                            )}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                size={`large`}
                                fullWidth
                                endIcon={<RotateLeftIcon />}
                                onClick={() => this.props.onFilterReset()}
                            >
                                Сброс фильтра
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

// Экспортируем компонент и подключаем стили к нему
export default withStyles(styles)(FilterComponent)