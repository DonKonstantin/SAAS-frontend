import {FC} from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

type Props = {
    open: boolean
    isLoading: boolean
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
        isLoading = false,
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
                <Button variant={"outlined"} size={'medium'} onClick={onConfirm}>
                    {!isLoading && okText}
                    {isLoading && <CircularProgress color="success" size={18}/>}
                </Button>
                <Button variant={"outlined"} size={'medium'} color={'secondary'} onClick={onClose}>
                    {cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NotificationsNeedSaveTemplate;
