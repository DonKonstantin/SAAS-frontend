import {FC, memo, useCallback, useEffect} from "react";
import {EditFormGroupProperties} from "../../../settings/pages/system/edit";
import {Grid, Paper, Typography} from "@mui/material";
import {useEntityEdit} from "../../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import NotificationTemplateTestSend from "./NotificationTemplateTestSend";
import NotificationVariablesBlock from "./NotificationVariablesBlock";
import {useTranslation} from "react-i18next";
import {InitializerPreviewNotification, usePreviewTemplateNotification} from "./$PreviewNotificationContext";
import NotificationTemplatePreviewIframe from "./NotificationTemplatePreviewIframe";

/**
 * Компонент вывода кнопок дополнительных действий для информационных
 * рассылок
 */
const NotificationsTemplatesPreview: FC<EditFormGroupProperties> = memo(({config}) => {
    const {sizes} = config;
    const {entityData, onSave} = useEntityEdit(distinctUntilChanged())
    const {setTemplateString} = usePreviewTemplateNotification(distinctUntilChanged(() => true))

    const handlerSave = useCallback(async () => onSave(), [onSave]);
    const {t} = useTranslation();

    if (!entityData) {
        return null;
    }

    const {values} = entityData;

    useEffect(() => {
            setTemplateString(values.body as string)
        },
        [setTemplateString, values.body]
    );

    return (
        <>
            <Grid item {...sizes}>
                <Paper sx={{width: '100%', p: 3, pt: 2}}>
                    <Typography variant={"subtitle1"}>
                        {t("pages.notifications_template.edit.block.preview.title")}
                    </Typography>
                    <NotificationTemplatePreviewIframe/>
                    <NotificationVariablesBlock/>
                    <Grid container spacing={3} alignItems={"center"}>
                        <Grid item xs={12}>
                            <NotificationTemplateTestSend
                                templateId={values.id as number}
                                onSave={handlerSave}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>

    )
})

/**
 * Компонент превью с инициализатором контекста
 * @param props
 *
 */
const NotificationsTemplatesPreviewWithInitializationContext:  FC<EditFormGroupProperties> = (props ) => (
    <>
        <InitializerPreviewNotification/>
        <NotificationsTemplatesPreview {...props}/>
    </>

)
export default NotificationsTemplatesPreviewWithInitializationContext;
