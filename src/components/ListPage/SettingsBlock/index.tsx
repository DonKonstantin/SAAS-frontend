import React from "react";
import {ListResponse} from "../../../services/listDataLoader/listLoader/types";
import {Schemas} from "../../../settings/schema";
import {
    Button,
    ButtonGroup,
    createStyles,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    Theme,
    Tooltip, withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import {clientServerDetector} from "../../../services/clientServerDetector";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    elementsPerPageCaption: {
        textAlign: "left",
        flexGrow: 1,
        flexShrink: 1,
    },
    leftAlign: {
        textAlign: "left",
    },
    rightAlign: {
        textAlign: "right",
    },
    denseLabel: {
        fontSize: theme.typography.body2.fontSize,
    },
});

// Свойства компонента
export interface SettingsBlockProps {
    dense: boolean
    hasEditAccess: boolean
    isFilterVisible: boolean
    response: ListResponse<keyof Schemas>
    onDenseChange: {(state: boolean): void}
    onChangeLimit: {(limit: number): void}
    onToggleFilterState: {(): void}
    onCreateNewItem: {(): void}

    classes: {
        paper: string
        leftAlign: string
        rightAlign: string
        elementsPerPageCaption: string
        denseLabel: string
    }
}

/**
 * Компонент вывода блока настроек таблицы листинга сущностей
 */
class SettingsBlock extends React.Component<SettingsBlockProps> {
    private readonly limits = [10, 20, 30, 50];

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: SettingsBlockProps) {
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
        const schema = (new Schemas())[this.props.response.parameters.schema];
        const isCreatable = this.props.hasEditAccess && schema.isCreatable;

        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "KeyA" && event.ctrlKey && event.shiftKey && isCreatable:
                this.props.onCreateNewItem();

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "KeyS" && event.ctrlKey && event.shiftKey:
                this.props.onDenseChange(!this.props.dense);

                event.stopPropagation();
                event.preventDefault();
                return;
            case !!["Digit1", "Numpad1"].find(val => val === event.code) && event.ctrlKey:
                this.props.onChangeLimit(this.limits[0]);

                event.stopPropagation();
                event.preventDefault();
                return;
            case !!["Digit2", "Numpad2"].find(val => val === event.code) && event.ctrlKey:
                this.props.onChangeLimit(this.limits[1]);

                event.stopPropagation();
                event.preventDefault();
                return;
            case !!["Digit3", "Numpad3"].find(val => val === event.code) && event.ctrlKey:
                this.props.onChangeLimit(this.limits[2]);

                event.stopPropagation();
                event.preventDefault();
                return;
            case !!["Digit4", "Numpad4"].find(val => val === event.code) && event.ctrlKey:
                this.props.onChangeLimit(this.limits[3]);

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const schema = (new Schemas())[this.props.response.parameters.schema];
        const isCreatable = this.props.hasEditAccess && schema.isCreatable;
        return (
            <Paper className={this.props.classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems={"center"}>
                            <Grid item className={this.props.classes.elementsPerPageCaption}>
                                Элементов на странице
                            </Grid>
                            <Grid item className={this.props.classes.rightAlign}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    {this.limits.map((val, i) => {
                                        const selected = val === this.props.response.parameters.limit;
                                        return (
                                            <Tooltip
                                                key={`limit-change-btn-tooltip-${val}`}
                                                title={(
                                                    <React.Fragment>
                                                        {`Вывести ${val} элементов на странице`}
                                                        <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                                        <i>Комбинация клавиш: <b>CTRL + {i + 1}</b></i>
                                                    </React.Fragment>
                                                )}
                                            >
                                                <Button
                                                    key={`limit-change-btn-${val}`}
                                                    size={"small"}
                                                    variant={selected ? "contained" : "outlined"}
                                                    onClick={() => this.props.onChangeLimit(val)}
                                                >{val}</Button>
                                            </Tooltip>
                                        )
                                    })}
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.leftAlign}>
                                <Tooltip
                                    title={(
                                        <React.Fragment>
                                            Уменьшает отступы между строк в таблице листинга элементов. Может помочь для отображения большего количества элементов на одном экране.
                                            <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                            <i>Комбинация клавиш: <b>CTRL + SHIFT + S</b></i>
                                        </React.Fragment>
                                    )}
                                >
                                    <FormControlLabel
                                        control={<Switch
                                            checked={this.props.dense}
                                            onChange={event => this.props.onDenseChange(event.target.checked)}
                                        />}
                                        label="Уменьшить отступы"
                                        classes={{
                                            label: this.props.classes.denseLabel
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            {isCreatable && (
                                <Grid item xs={6}>
                                    <Tooltip
                                        title={(
                                            <React.Fragment>
                                                Добавить новый элемент
                                                <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                                <i>Комбинация клавиш: <b>CTRL + SHIFT + A</b></i>
                                            </React.Fragment>
                                        )}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            endIcon={(<AddLocationIcon />)}
                                            onClick={() => this.props.onCreateNewItem()}
                                        >
                                            Добавить
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            )}
                            <Grid item xs={isCreatable ? 6 : 12}>
                                <Tooltip title={this.props.isFilterVisible ? `Скрыть фильтр элементов` : `Показать фильтр элементов`}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        onClick={() => this.props.onToggleFilterState()}
                                    >
                                        Фильтр {this.props.isFilterVisible ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

// Экспортируем компонент и подключаем стили к нему
export default withStyles(styles)(SettingsBlock)