import {FC, useCallback, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {NotificationChannel} from "../../../services/NotificationService/interface";
import NotificationsNeedSaveDialog from "./NotificationsNeedSaveDialog";
import {sendInProgress$, usePreviewTemplateNotification} from "./$PreviewNotificationContext";
import {distinctUntilKeyChanged, filter} from "rxjs";
import {LoadingButton} from "@mui/lab";

export type NotificationTemplateTestSendProps = {
    templateId: number
    onSave(): Promise<any>
}

/**
 * Компонент тестовой отправки сообщения
 * @param props
 */
const NotificationTemplateTestSend: FC<NotificationTemplateTestSendProps> = props => {
    const {templateId, onSave} = props;
    const [isOpen, setOpen] = useState(false);
    const [isShowSaveDialog, setSaveDialog] = useState(false);
    const [channel, setChannel] = useState<NotificationChannel>(NotificationChannel.mail);
    const {t} = useTranslation();
    const {
        sendNotification,
        isSendProgress
    } = usePreviewTemplateNotification(distinctUntilKeyChanged("isSendProgress"));

    useEffect(() => {
        const subscriber = sendInProgress$.pipe(
            filter(v => v)
        ).subscribe(() => {
            setOpen(false);
        });

        return () => subscriber.unsubscribe();
    }, [])

    const handleOpenClick = () => {
        if (!templateId) {
            setSaveDialog(true);

            return;
        }

        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSave = useCallback(() => setSaveDialog(false), [setSaveDialog]);
    const handleConfirmSave = useCallback(() => {
            onSave();
            setSaveDialog(false);
        },
        [onSave]
    );

    const handleSend = () => {
        sendNotification(templateId, channel);
    };

    const handleChannelChange = ({value}: SelectChangeEvent) => setChannel(value);

    const channels = Object.values(NotificationChannel);

    return (
        <>
            <Button
                onClick={handleOpenClick}
                variant={"contained"}
                color={"primary"}
                fullWidth
            >
                {t("pages.notifications_template.edit.action.testSend")}
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{t("pages.notifications_template.edit.dialog.testSend.title")}</DialogTitle>
                <DialogContent>
                    <Select
                        value={channel}
                        onChange={handleChannelChange}
                        fullWidth
                        label={t("pages.notifications_template.edit.dialog.testSend.field.channel")}
                    >
                        {channels.map(channel => (
                            <MenuItem value={channel}>
                                {t(`pages.notifications_template.edit.dialog.testSend.field.channelVariant.${channel}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t("pages.notifications_template.edit.dialog.testSend.button.close")}
                    </Button>
                    <LoadingButton onClick={handleSend} loading={isSendProgress}>
                        {t("pages.notifications_template.edit.dialog.testSend.button.start")}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <NotificationsNeedSaveDialog
                open={isShowSaveDialog}
                onClose={handleCloseSave}
                onConfirm={handleConfirmSave}
            />
        </>
    )
}


export default NotificationTemplateTestSend
