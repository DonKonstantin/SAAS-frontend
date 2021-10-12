import React from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel, Tooltip
} from "@mui/material";

// Свойства диалогового окна удаления сущностей
export interface DeleteDialogProps {
    isVisible: boolean
    isDeleteInProgress: boolean
    checkedItems: any[]
    onDeleteSubmit: {(submitted: any[]): void}
    onDeleteCancel: {(): void}
}

// State компонента
export interface DeleteDialogState {
    isSubmitted: boolean
    isSubmitClicked: boolean
}

/**
 * Компонент вывода диалогового окна удаления сущностей
 */
export class DeleteDialog extends React.Component<DeleteDialogProps, DeleteDialogState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: DeleteDialogProps) {
        super(props);
        this.state = {
            isSubmitClicked: false,
            isSubmitted: false,
        }
    }

    /**
     * Сбрасываем флаги диалогового окна при:
     *  1. изменении пула удаляемых элементов
     *  2. завершении удаления
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<DeleteDialogProps>) {
        if (JSON.stringify(prevProps.checkedItems) !== JSON.stringify(this.props.checkedItems)
            || (!this.props.isDeleteInProgress && prevProps.isDeleteInProgress)
        ) {
            this.setState({
                isSubmitted: false,
                isSubmitClicked: false,
            })
        }
    }

    /**
     * Обработка удаления элементов
     */
    handleDeleteItems() {
        if (!this.state.isSubmitted) return;

        this.setState({
            ...this.state,
            isSubmitClicked: true
        });

        this.props.onDeleteSubmit([...this.props.checkedItems])
    }

    /**
     * Обработка отмены удаления элементов
     */
    handleCancelDelete() {
        this.setState({
            ...this.state,
            isSubmitted: false,
        });

        this.props.onDeleteCancel()
    }

    /**
     * Обработка изменения состояния подтверждения удаления элементов
     * @param state
     */
    handleChangeSubmitting(state: boolean) {
        this.setState({
            ...this.state,
            isSubmitted: state,
        })
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const isDeleteDisabled = this.state.isSubmitClicked || !this.state.isSubmitted;
        return (
            <Dialog open={this.props.isVisible} onClose={() => this.handleCancelDelete()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Удалить элементы</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для подтверждения удаления выбранных вами элементов ({this.props.checkedItems.length} шт.)
                        поставьте флаг в поле ниже и нажмите кнопку "Удалить"
                    </DialogContentText>
                    <Tooltip title={`Необходимо установить данный флаг для подтвержде- ния удаления элементов`}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.isSubmitted}
                                onChange={event => this.handleChangeSubmitting(event.target.checked)}
                                name="submit-delete"
                            />}
                            label="Я подтверждаю удаление элементов"
                        />
                    </Tooltip>
                </DialogContent>
                <DialogActions>
                    <Tooltip title={`Отменить удаление элементов`}>
                        <Button onClick={() => this.handleCancelDelete()} color="primary">
                            Отмена
                        </Button>
                    </Tooltip>
                    {isDeleteDisabled && (
                        <Button
                            onClick={() => this.handleDeleteItems()}
                            disabled={isDeleteDisabled}
                            color="secondary"
                        >
                            Удалить ({this.props.checkedItems.length})
                        </Button>
                    )}
                    {!isDeleteDisabled && (
                        <Tooltip title={`Подтвердить удаление элементов`}>
                            <Button
                                onClick={() => this.handleDeleteItems()}
                                disabled={this.state.isSubmitClicked || !this.state.isSubmitted}
                                color="secondary"
                            >
                                Удалить ({this.props.checkedItems.length})
                            </Button>
                        </Tooltip>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}