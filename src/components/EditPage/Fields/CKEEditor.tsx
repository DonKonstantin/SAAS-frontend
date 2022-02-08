import React, {FC, useEffect, useState} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {Stack, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Поле ввода числового значения
const CKEEditor: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged(
        (previous, current) => {
            return previous?.entityData?.values[fieldCode] === current?.entityData?.values[fieldCode]
                && previous?.validation[fieldCode] === current?.validation[fieldCode]
        }
    ))

    const [isLayoutReady, setIsLayoutReady] = useState(false)

    useEffect(() => {
        setIsLayoutReady(true)
    }, [])

    if (!fieldData) {
        return null
    }

    const {
        t,
        value,
        values,
        validation,
        fieldConfig: {title, isVisible = () => true, startIcon: IconComponent, validation: validators = []},
        onChangeFieldValue,
    } = fieldData

    if (!isVisible(values)) {
        return null
    }

    const handleChangeFromEditor = (value: string) => {
        onChangeFieldValue(() => value)
    }

    return (
        <Stack spacing={1}>
            <Typography>{t(title)}</Typography>
            <CKEditor
                editor={ClassicEditor}
                id="editor_box"
                data={value}
                config={{
                    toolbar: {items: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "imageUpload", "blockQuote", "insertTable", "undo", "redo"]}, // "mediaEmbed",
                    config: {
                        ui: {
                            width: '500px',
                            height: '300px'
                        }
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();

                    handleChangeFromEditor(data as string);
                }}
            />
        </Stack>
    )
}


// Экспортируем компонент
export default React.memo(CKEEditor, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})
