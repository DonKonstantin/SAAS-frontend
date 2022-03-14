import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type Props = {
    open: boolean
    onConfirm: () => void
    onClose: () => void
    title: string
    content: string
    okText?: string
    cancelText?: string
}

/**
 * Компонент оповещения о необходимости сохранения шаблона
 * @param props
 */
const NotificationsNeedSaveTemplate: FC<Props> = props => {
    const {
        open,
        onConfirm,
        onClose,
        title,
        content,
        okText = 'Да',
        cancelText = 'Нет'
    } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {okText}
                </Button>
                <Button onClick={onConfirm}>
                    {cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NotificationsNeedSaveTemplate;
