import {Schemas} from "../../../../settings/schema";
import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EntityValues} from "../../../../settings/pages/system/edit";
import {searchUntypedLoader} from "../../../../services/searchUntypedLoader";
import MultipleRelationWithSearchFieldContainer
    from "../../../../containers/EditPage/Fields/MultipleRelationWithSearchField/MultipleRelationWithSearchFieldComponent";
import {Collection} from "../../../../services/types";
import {LocalizedField} from "./MultipleRelationWithSearchFieldComponent";
import {SearchUntypedLoaderItem} from "../../../../services/searchUntypedLoader/interfaces";

// Настройки поля
export interface Params<K extends keyof Schemas> {
    fieldCode: any                                      // Код поля, для которого генерируется компонент
    captionFields: (keyof Schemas[K]['fields'])[]       // Набор полей для загрузки, будет участвовать в отображении названия варианта выбора. Может содержать первичный ключ
    localizedFields?: (keyof Schemas[K]['fields'])[]    // Набор локализованных полей, участвующих в отображении названия варианта выбора
    tooltip?: string | React.ReactNode                  // Подсказка при наведении на поле
    prefix?: React.ReactNode                            // Префикс поля, например иконка или надпись
    suffix?: React.ReactNode                            // Суффикс поля, например иконка или надпись
    editAccessRule: string                              // Право, требуемое для редактирования сущности

    targetSchema: K                                     // Схема, по которой происходит поиск
    targetSchemaPrimaryKey: keyof Schemas[K]['fields']  // Первичный ключ, который будет использоваться как значение поля
    targetEntityType: string                            // Целевой тип сущности, по которой будет происходить поиск
    targetSchemaDefaultValueField: keyof Schemas[K]['fields']   // Поле, в которое передается значение по умолчанию при добавлении нового элемента
    chipIcon?: React.ReactElement                               // Иконка, которую отображает каждая фишка выбранного элемента
    captionGenerator: {(option: SearchUntypedLoaderItem<K>, localizedFields?: Collection<LocalizedField>): string}  // Генератор названия варианта выбора.
}

// Поле ввода числового значения
export const MultipleRelationWithSearchField: TFieldsFactory<Params<keyof Schemas>> = (
    params: Params<keyof Schemas> = {
        fieldCode: "",
        captionFields: [],
        editAccessRule: "",
        captionGenerator: (option) => Object.values(option).join(", "),
        // @ts-ignore
        targetSchema: undefined,
        //@ts-ignore
        targetSchemaPrimaryKey: undefined,
        targetEntityType: "",
        //@ts-ignore
        targetSchemaDefaultValueField: undefined,
    }
) => {
    class Component<T extends keyof Schemas> extends React.Component<EditFieldProperties<T, any>> {
        render() {
            // @ts-ignore
            const Component: React.ComponentType<any> = MultipleRelationWithSearchFieldContainer;
            return (
                <Component
                    editAccessRule={params.editAccessRule}
                    initialValues={this.props.additionData}
                    captionFields={params.captionFields}
                    captionGenerator={params.captionGenerator}
                    tooltip={params.tooltip}
                    prefix={params.prefix}
                    suffix={params.suffix}
                    targetSchema={params.targetSchema}
                    targetSchemaPrimaryKey={params.targetSchemaPrimaryKey}
                    targetEntityType={params.targetEntityType}
                    targetSchemaDefaultValueField={params.targetSchemaDefaultValueField}
                    chipIcon={params.chipIcon}
                    localizedFields={params.localizedFields}
                    {...this.props}
                />
            )
        }
    }

    return {
        component: Component,
        additionData: async (values: EntityValues<any>, __: any, token?: string) => {
            const service = searchUntypedLoader(token);
            const selected = await service.LoadEntitiesById({
                fieldsToLoad: [params.targetSchemaPrimaryKey, ...params.captionFields],
                ids: (values[params.fieldCode] || []) as any[],
                primaryKey: params.targetSchemaPrimaryKey,
                schema: params.targetSchema,
                localizedFields: params.localizedFields,
            });

            const firstTenItems = await service.LoadFirstTenEntities({
                fieldsToLoad: [params.targetSchemaPrimaryKey, ...params.captionFields],
                primaryKey: params.targetSchemaPrimaryKey,
                schema: params.targetSchema,
                localizedFields: params.localizedFields,
            });

            let result = [...firstTenItems];
            selected.map(i => {
                if (!firstTenItems.find(f => f.fields[params.targetSchemaPrimaryKey] === i.fields[params.targetSchemaPrimaryKey])) {
                    result.push(i)
                }
            });

            return result
        }
    }
};