import {Schemas} from "../../../settings/schema";
import {EntityData} from "../../../services/entityGetterService/interface";
import React from "react";
import {createStyles, Grid, Theme, Tooltip, withStyles} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';
import {SignOutIcon} from "../../CustomIcon/icons";
import {clientServerDetector} from "../../../services/clientServerDetector";
import ButtonsCloseDialog from "./ButtonsCloseDialog";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    main: {
        position: "fixed",
        padding: theme.spacing(2),
        right: theme.spacing(1),
        bottom: theme.spacing(1),
        zIndex: 1,
    },
    tooltipSaveAndClose: {
        width: 225
    },
    tooltipCopy: {
        width: 265
    },
    tooltipClose: {
        width: 193
    },
});

// Свойства компонента
export interface ButtonsProps {
    schema: keyof Schemas
    primaryKey: any
    isChangeInProgress: boolean
    entityData: EntityData<keyof Schemas>
    onSave: {(): void}
    onSaveAsNew: {(): void}
    onSaveAndClose: {(): void}
    onClose: {(): void}

    classes: {
        main: string
        tooltipSaveAndClose: string
        tooltipCopy: string
        tooltipClose: string
    }
}

// State компонента
interface ButtonsComponentState {
    isCloseDialogOpen: boolean
}

// Компонент вывода кнопок управления для формы редактирования
class ButtonsComponent extends React.Component<ButtonsProps, ButtonsComponentState> {
    private handleButtonPressEventWithBind: {(event: KeyboardEvent): void};

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ButtonsProps) {
        super(props);
        this.state = {
            isCloseDialogOpen: false,
        };

        // Необходимо забиндить ссылку на текущий объект в метод и сохранить его, т.к.
        // js не сможет его разбиндить, если метод изменится, а он изменится, если просто
        // выполнить бинд заново
        this.handleButtonPressEventWithBind = this.handleButtonPressEvent.bind(this)
    }

    /**
     * Подключаем обработку нажатия быстрых клавиш
     */
    componentDidMount() {
        if (clientServerDetector().isClient()) {
            document.addEventListener("keydown", this.handleButtonPressEventWithBind)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.removeEventListener("keydown", this.handleButtonPressEventWithBind)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        const schema = (new Schemas())[this.props.schema];
        const isSaveEnabled = this.props.entityData.configuration.isSaveEnabled && (
            (schema.isCreatable && !this.props.primaryKey) || (schema.isChangeable && !!this.props.primaryKey)
        );
        const isSaveAsNewEnabled = this.props.entityData.configuration.isCopyEnabled && schema.isCreatable;
        const isSaveAndCloseEnabled = this.props.entityData.configuration.isSaveAndCloseEnabled && (
            (schema.isCreatable && !this.props.primaryKey) || (schema.isChangeable && !!this.props.primaryKey)
        );

        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "KeyS" && event.ctrlKey && event.shiftKey && isSaveAndCloseEnabled:
                this.props.onSaveAndClose();

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "KeyS" && event.ctrlKey && isSaveEnabled:
                this.props.onSave();

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "Escape":
                this.handleChangeCloseDialogState(true);

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "KeyC" && event.ctrlKey && event.shiftKey && isSaveAsNewEnabled:
                this.props.onSaveAsNew();

                event.stopPropagation();
                event.preventDefault();
                return;
        }
    }

    /**
     * Обработка изменения состояния видимости диалога подтверждения выхода
     * @param state
     */
    handleChangeCloseDialogState(state: boolean) {
        this.setState({
            ...this.state,
            isCloseDialogOpen: state,
        })
    }

    /**
     * Обработка реального закрытия формы редактирования
     */
    handleSubmitClose() {
        this.setState({
            ...this.state,
            isCloseDialogOpen: false,
        });

        this.props.onClose();
    }

    /**
     * Рендеринг самих кнопок
     */
    renderButtons() {
        const schema = (new Schemas())[this.props.schema];
        const isSaveEnabled = this.props.entityData.configuration.isSaveEnabled && (
            (schema.isCreatable && !this.props.primaryKey) || (schema.isChangeable && !!this.props.primaryKey)
        );
        const isSaveAsNewEnabled = this.props.entityData.configuration.isCopyEnabled && schema.isCreatable;
        const isSaveAndCloseEnabled = this.props.entityData.configuration.isSaveAndCloseEnabled && (
            (schema.isCreatable && !this.props.primaryKey) || (schema.isChangeable && !!this.props.primaryKey)
        );

        return (
            <React.Fragment>
                <Grid container spacing={2} justify={`center`} alignItems={`center`}>
                    {isSaveEnabled && (
                        <Grid item xs={`auto`}>
                            <Tooltip
                                title={(
                                     <React.Fragment>
                                         Сохранить изменения.
                                         <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                         <i>Комбинация клавиш: <b>CTRL + S</b></i>
                                     </React.Fragment>
                                 )}
                            >
                                <div>
                                    <Fab
                                        color="primary"
                                        size={`medium`}
                                        disabled={this.props.isChangeInProgress}
                                        onClick={() => this.props.onSave()}
                                    >
                                        <SaveIcon fontSize={`small`} />
                                    </Fab>
                                </div>
                            </Tooltip>
                        </Grid>
                    )}
                    {isSaveAsNewEnabled && (
                        <Grid item xs={`auto`}>
                            <Tooltip
                                     classes={{tooltip: this.props.classes.tooltipCopy}}
                                     title={(
                                         <React.Fragment>
                                             Сохранить изменения в качестве новой сущности. Изменений в текущей сущности не происходит.
                                             <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                             <i>Комбинация клавиш: <b>CTRL + SHIFT + C</b></i>
                                         </React.Fragment>
                                     )}
                            >
                                <div>
                                    <Fab
                                        color="primary"
                                        size={`medium`}
                                        disabled={this.props.isChangeInProgress}
                                        onClick={() => this.props.onSaveAsNew()}
                                    >
                                        <FileCopyIcon fontSize={`small`} />
                                    </Fab>
                                </div>
                            </Tooltip>
                        </Grid>
                    )}
                    {isSaveAndCloseEnabled && (
                        <Grid item xs={`auto`}>
                            <Tooltip
                                     classes={{tooltip: this.props.classes.tooltipSaveAndClose}}
                                     title={(
                                         <React.Fragment>
                                             Сохранить изменения, после чего закрыть страницу редактирования.
                                             <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                             <i>Комбинация клавиш: <b>CTRL + SHIFT + S</b></i>
                                         </React.Fragment>
                                     )}
                            >
                                <div>
                                    <Fab
                                        color="primary"
                                        size={`medium`}
                                        disabled={this.props.isChangeInProgress}
                                        onClick={() => this.props.onSaveAndClose()}
                                    >
                                        <SignOutIcon fontSize={`small`} />
                                    </Fab>
                                </div>
                            </Tooltip>
                        </Grid>
                    )}
                    <Grid item xs={`auto`}>
                        <Tooltip
                                 classes={{tooltip: this.props.classes.tooltipClose}}
                                 title={(
                                     <React.Fragment>
                                         Закрыть страницу редактирования.<br/>
                                         Изменения сохранены не будут.
                                         <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                                         <i>Быстрая клавиша: <b>Esc</b></i>
                                     </React.Fragment>
                                 )}
                        >
                            <div>
                                <Fab
                                    color="secondary"
                                    size={`large`}
                                    disabled={this.props.isChangeInProgress}
                                    onClick={() => this.handleChangeCloseDialogState(true)}
                                >
                                    <CloseIcon />
                                </Fab>
                            </div>
                        </Tooltip>
                    </Grid>
                </Grid>
                <ButtonsCloseDialog
                    isDialogOpen={this.state.isCloseDialogOpen}
                    onCloseDialog={() => this.handleChangeCloseDialogState(false)}
                    onSubmitClose={() => this.handleSubmitClose()}
                />
            </React.Fragment>
        )
    }

    /**
     * Рендеринг обертки
     */
    render() {
        return (
            <div className={this.props.classes.main}>
                {this.renderButtons()}
            </div>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(ButtonsComponent)