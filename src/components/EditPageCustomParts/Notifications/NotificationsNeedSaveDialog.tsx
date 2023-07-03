import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useTranslation} from "react-i18next";

type Props = {
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

/**
 * Компонент оповещения о необходимости сохранения шаблона
 * @param props
 */
const NotificationsNeedSaveDialog: FC<Props> = props => {
    const {open, onConfirm, onClose} = props;
    const {t} = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {t("pages.notifications_template.edit.dialog.needSave.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("pages.notifications_template.edit.dialog.needSave.bodyText")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {t("pages.notifications_template.edit.dialog.needSave.button.no")}
                </Button>
                <Button onClick={onConfirm}>
                    {t("pages.notifications_template.edit.dialog.needSave.button.yes")}
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default NotificationsNeedSaveDialog;
