import React from "react";
import dynamic from "next/dynamic";

// Свойства компонента
export interface EditorProps {
    value: string
    onChange: {(value: string): void}
}

/**
 * Компонент редактора CKEditor
 */
class Editor extends React.Component<EditorProps> {
    /**
     * Рендерим блок редактора
     */
    render() {
        const CKEditor = require('@ckeditor/ckeditor5-react')
        const ClassicEditor = require('@ckeditor/ckeditor5-build-classic')

        // TODO: Реализовать загрузку дополнительных файлов для вставки из редактора
        return (
            <CKEditor
                data={this.props.value}
                config={{
                    toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent",
                        "|",
                        // "imageUpload",
                        "blockQuote",
                        "insertTable",
                        // "mediaEmbed",
                        "undo", "redo",
                    ]
                }}
                editor={ClassicEditor}
                onChange={(_: any, editor: any) => {
                    this.props.onChange(editor.getData())
                }}
            />
        )
    }
}

// Отключаем SSR для редактора
const NoSsrEditor = dynamic(async () => Editor, {ssr: false})

// Экспортируем компонент с отключенным SSR
export default class extends React.Component<EditorProps> {
    render() {
        return (
            <NoSsrEditor {...this.props} />
        )
    }
}