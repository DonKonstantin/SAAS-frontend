import React from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip
} from "@material-ui/core";
import {clientServerDetector} from "../../../../services/clientServerDetector";

interface ButtonsCloseDialogProps {
    isDialogOpen: boolean

    onCloseDialog: {(): void}
    onSubmitClose: {(): void}
}

/**
 * Компонент диалогового окна закрытия формы редактирования
 */
class ButtonsCloseDialog extends React.Component<ButtonsCloseDialogProps> {
    private readonly handleButtonPressEventWithBind: {(event: KeyboardEvent): void};

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ButtonsCloseDialogProps) {
        super(props);

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
            document.getElementsByTagName(`body`)[0].addEventListener("keydown", this.handleButtonPressEventWithBind)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.getElementsByTagName(`body`)[0].removeEventListener("keydown", this.handleButtonPressEventWithBind)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        switch (true) {
            case event.code === "Escape" && this.props.isDialogOpen:
                this.props.onCloseDialog();

                event.stopPropagation();
                event.preventDefault();
                return;
            case event.code === "Enter" && this.props.isDialogOpen:
                this.props.onSubmitClose();

                event.stopPropagation();
                event.preventDefault();
                return;
        }
    }

    render() {
        return (
            <Dialog open={this.props.isDialogOpen} onClose={() => this.props.onCloseDialog()}>
                <DialogTitle>Подтвердите закрытие окна редактирования</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Необходимо подтвердить закрытие формы редактирования. После закрытия все, внесенные Вами,
                        изменения будут потеряны.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Tooltip title={`Отменить закрытие окна редактирования`}>
                        <Button onClick={() => this.props.onCloseDialog()} color="primary">
                            Отмена
                        </Button>
                    </Tooltip>
                    <Tooltip title={`Подтвердить закрытие окна редактирования`}>
                        <Button onClick={() => this.props.onSubmitClose()} color="secondary">
                            Закрыть
                        </Button>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ButtonsCloseDialog