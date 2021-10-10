import React, {useCallback} from "react";
import {EditFieldProperties, EditValueType, EntityValues} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {FileData} from "../../../../services/filesService/interface";
import FileFieldContainer from "./FileFieldContainer";
import {filesService} from "../../../../services/filesService";

// Настройки поля
export interface Params<T extends keyof Schemas, F extends keyof Schemas[T]['fields']> {
    field: F                            // Поле, для которого создается конфигурация
    tooltip?: string | React.ReactNode  // Подсказка при наведении на поле
    availableExtensions?: string[]      // Доступные расширения для загрузки файлов
}

// Поле ввода числового значения
function FilesField<T extends keyof Schemas, F extends keyof Schemas[T]['fields']>(params: Params<T, F>) {
    const {field, tooltip, availableExtensions} = params;
    const Component = (props: EditFieldProperties<keyof Schemas, any>) => {
        const {configuration: {title}, additionData, onAdditionDataChange} = props;

        // Callback изменения файлов, загруженных пользователем
        const handleChangeFiles = useCallback((files: FileData[]) => {
            onAdditionDataChange(files);
        }, []);

        return (
            <FileFieldContainer
                title={title}
                files={additionData as FileData[]}
                onChangeFiles={handleChangeFiles}
                tooltip={tooltip}
                availableExtensions={availableExtensions}
            />
        )
    };

    return {
        component: Component,
        additionData: async (values: EntityValues<any>, __: any, token?: string) => {
            const value = (Array.isArray(values[field]) ? values[field] : [values[field]]) as string[];

            return await filesService(token).LoadFilesById(value);
        },
        onBeforeSave: async (
            _: EditValueType,
            values: EntityValues<keyof Schemas>,
            additionData: any,
        ): Promise<EntityValues<keyof Schemas>> => {
            return {
                ...values,
                [field]: (additionData as FileData[]).map(f => f.id),
            }
        },
        onCopyValue: async (
            _: any,
            ___: EditValueType,
            __: EditValueType,
            additionData: any,
        ): Promise<{ value: EditValueType, additionData: any }> => {
            const clones = await filesService().CloneFiles((additionData as FileData[]).map(f => f.id));

            return {
                value: clones.map(c => c.id),
                additionData: clones,
            }
        }
    }
}

// Экспортируем фабрику поля
export default FilesField
