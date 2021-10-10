import React from "react";
import {EntityListProperties} from "../../reduxStore/server/entityList/EntityListProperties";
import {listSchemaConfiguration} from "../../settings/pages";
import {PageWithMetaTags} from "../UILayer/PageWithMetaTags";
import {Schemas} from "../../settings/schema";
import {loggerFactory} from "../../services/logger";
import ListPage from "../ListPage";
import {Breadcrumb} from "../../components/Breadcrumbs";

/**
 * Класс индексной страницы пользователей
 */
abstract class EntityList<T extends object> extends React.Component<PageWithMetaTags<EntityListProperties<T>>>{
    /**
     * Генерация свойств страницы листинга
     * @param schema
     * @param baseProps
     * @param additionFilters
     * @param customBreadCrumbs
     */
    static async getEntityListProps<T extends object>(
        schema: keyof Schemas,
        baseProps: T,
        additionFilters: {[T: string]: string} = {},
        customBreadCrumbs?: Breadcrumb[],
    ): Promise<T> {
        const logger = loggerFactory().make(`EntityList`);
        const configuredSchemas = listSchemaConfiguration();
        if (!schema || !configuredSchemas[schema]) {
            logger.Error(`You should implement configuration for schema ${schema}`);
            return {...baseProps}
        }

        const config = configuredSchemas[schema];
        return {
            ...baseProps,
            header: config?.header || "",
            title: config?.title || "",
            configuration: config,
            additionFilters: additionFilters,
            customBreadCrumbs: customBreadCrumbs,
        }
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return (
            <ListPage
                //@ts-ignore
                schema={this.props.configuration?.schema}
                configuration={this.props.configuration}
                additionFilter={this.props.additionFilters}
                customBreadCrumbs={this.props.customBreadCrumbs}
            />
        )
    }
}

export default EntityList