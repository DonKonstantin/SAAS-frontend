import {ChangeEvent, FC, memo, useState} from "react";
import {Box, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {JSONValidator} from "../../../services/validation/validators/JSONValidator";
import {usePreviewTemplateNotification} from "./$PreviewNotificationContext";

/**
 * Компонент редактирования переменных для шаблона
 */
const NotificationVariablesBlock: FC = () => {
    const {
        setTemplateVariables,
        variables
    } = usePreviewTemplateNotification();

    const [variablesJSON, setVariables] = useState<string>(JSON.stringify(variables));
    const [errorJSON, setJSONSError] = useState<boolean>(false);
    const {t} = useTranslation();


    const handleChangeVariables = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.persist();

        setJSONSError(false)
        setVariables(e.currentTarget.value);

        if (!JSONValidator(e.currentTarget.value)) {
            setJSONSError(true)

            return;
        }

        setTemplateVariables(JSON.parse(e.currentTarget.value));
    }

    return (
        <Box>
            <Typography>
                {t("pages.notifications_template.edit.dialog.preview.variablesHint")}
            </Typography>
            <TextField
                sx={{mt:1}}
                multiline
                minRows={4}
                fullWidth
                value={variablesJSON}
                onChange={handleChangeVariables}
                error={errorJSON}
                label={t("pages.notifications_template.edit.dialog.preview.field.variables")}
                helperText={errorJSON ? t("pages.notifications_template.edit.dialog.preview.variablesError"): " "}
            />
        </Box>
    )
}

export default memo(NotificationVariablesBlock);
