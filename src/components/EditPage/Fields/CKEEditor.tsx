import React, {FC, useState} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {FormControlLabel, Stack, Switch, TextField, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Поле ввода строки с текстовым редактором
const CKEEditor: FC<EditFieldProperties> = props => {
    const {fieldCode} = props;
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged(
        (previous, current) => {
            return previous?.entityData?.values[fieldCode] === current?.entityData?.values[fieldCode]
                && previous?.validation[fieldCode] === current?.validation[fieldCode]
        }
    ))

    const [editorEnabled, setEditorEnable] = useState(true);

    if (!fieldData) {
        return null;
    }

    const {
        t,
        value,
        values,
        validation,
        fieldConfig: {title, isVisible = () => true, validation: validators = []},
        onChangeFieldValue,
    } = fieldData;

    if (!isVisible(values)) {
        return null;
    }

    const handleChangeFromEditor = (value: string) => {
        onChangeFieldValue(() => value);
    }

    if (!editorEnabled) {
        return (
            <Stack spacing={1}>
                <Typography>{t(title)}</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            defaultChecked
                            size="small"
                            value={editorEnabled}
                            onChange={event => setEditorEnable(event.target.checked)}
                        />
                    }
                    label={t("entity-edit.fields.CKEEditor.switcher.label")}
                />
                <TextField
                    label={t(title)}
                    multiline
                    minRows={6}
                    sx={{minHeight: 180}}
                    value={value}
                    onChange={e => handleChangeFromEditor(e.target.value)}
                    required={validators.length > 0}
                    helperText={validation ? t(validation) : undefined}
                />
            </Stack>
        )
    }

    return (
        <Stack spacing={1}>
            <Typography>{t(title)}</Typography>
            <FormControlLabel
                control={
                    <Switch
                        defaultChecked
                        size="small"
                        value={editorEnabled}
                        onChange={event => setEditorEnable(event.target.checked)}
                    />
                }
                label={t("entity-edit.fields.CKEEditor.switcher.label")}
            />
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    id="editor_box"
                    data={value}
                    required={validators.length > 0}
                    helperText={validation ? t(validation) : undefined}
                    config={{
                        toolbar: {items: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "imageUpload", "blockQuote", "insertTable", "undo", "redo"]}, // "mediaEmbed",
                        config: {
                            ui: {
                                width: '500px',
                                height: '300px'
                            }
                        }
                    }}
                    onChange={(editor) => {
                        const data = editor.getData();

                        handleChangeFromEditor(data as string);
                    }}
                />
            </div>
        </Stack>
    )
}


// Экспортируем компонент
export default React.memo(CKEEditor, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})
