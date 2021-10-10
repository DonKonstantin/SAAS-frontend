import React from "react";
import {PageWithMetaTags} from "../UILayer/PageWithMetaTags";
import {Schemas} from "../../settings/schema";
import {loggerFactory} from "../../services/logger";
import {editSchemaConfiguration} from "../../settings/pages";
import EditPage from "../EditPage";
import {PageUrl} from "../../settings/pages/system/list";
import {Breadcrumb} from "../../components/Breadcrumbs";

// Дополнительные параметры, которые можно передавать в форму редактирования на уровне построения страницы
export type AdditionEditParams = Partial<{
    defaultValues: {[K in keyof Schemas[keyof Schemas]['fields']]: any}
    closeUrl: PageUrl
    isNeedCloseWindowAfterExit: boolean
    customBreadcrumbs: Breadcrumb[]
}>

// Свойства формы редактирования
export type EntityEditProps<T extends object> = T & PageWithMetaTags<T> & {
    editPrimaryKey: any,
    editSchema: keyof Schemas,
    additionEditParams?: AdditionEditParams,
}

/**
 * Класс формы редактирования сущности
 */
abstract class EntityEdit<T extends object> extends React.Component<EntityEditProps<T>>{
    /**
     * Генерация свойств страницы редактирования
     * @param schema
     * @param primaryKey
     * @param baseProps
     * @param additionParams
     */
    static async getEntityEditProps<T extends object>(schema: keyof Schemas, primaryKey: any, baseProps: T, additionParams?: AdditionEditParams): Promise<T> {
        const logger = loggerFactory().make(`EntityList`)
        const configuredSchemas = editSchemaConfiguration()
        if (!schema || !configuredSchemas[schema]) {
            logger.Error(`You should implement configuration for schema ${schema}`)
            return {...baseProps}
        }

        const config = configuredSchemas[schema]
        return {
            ...baseProps,
            header: config?.header ? config.header(primaryKey) : "" || "",
            title: config?.title ? config.title(primaryKey) : "" || "",
            editPrimaryKey: primaryKey,
            editSchema: schema,
            additionEditParams: additionParams || {},
        }
    }

    /**
     * Рендеринг страницы
     */
    render() {
        // @ts-ignore
        return (<EditPage schema={this.props.editSchema} primaryKey={this.props.editPrimaryKey} additionEditParams={this.props.additionEditParams || {}} />)
    }
}

export default EntityEdit