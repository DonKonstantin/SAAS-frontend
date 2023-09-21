import {EntityListStoreLoaderInterfaces} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {ListPageConfiguration} from "../../settings/pages/system/list";
import {ListLoadingParameters, OrderParameter} from "../listDataLoader/listLoader/interfaces";
import {ListSchemaConfiguration} from "../../settings/pages";
import {BaseData, ListDataLoaderInterfaces} from "../listDataLoader/interfaces";
import {ListOfSchema} from "../../context/EntityListContext";

/**
 * Загрузчик конфигурации Store
 */
export class EntityListStoreLoader implements EntityListStoreLoaderInterfaces {
    private readonly configurationBuilder: { (): ListSchemaConfiguration };
    private readonly dataLoader: ListDataLoaderInterfaces;

    /**
     * Конструктор сервиса
     * @param configurationBuilder
     * @param dataLoader
     */
    constructor(configurationBuilder: { (): ListSchemaConfiguration }, dataLoader: ListDataLoaderInterfaces) {
        this.configurationBuilder = configurationBuilder;
        this.dataLoader = dataLoader;
    }

    /**
     * Загрузка Store для переданной конфигурации
     * @param configuration
     * @param additionFilter
     */
    async LoadStoreForConfiguration<T extends keyof Schemas>(
        configuration: ListPageConfiguration<T>,
        additionFilter: { [T: string]: string },
    ): Promise<ListOfSchema<T>> {
        // @ts-ignore
        const baseConfiguration: ListSchemaConfiguration<T> = this.configurationBuilder()[configuration.schema];

        // @ts-ignore
        const currentConfiguration: ListSchemaConfiguration<T> = this.configurationBuilder()[configuration.schema];

        const {defaultSortField} = configuration.listFields;
        let firstField = defaultSortField && configuration.listFields.fields[defaultSortField] || undefined;
        // Получаем первое из простых полей
        if (!defaultSortField) {
            firstField = Object.values(configuration.listFields.fields).filter(field => field.fieldType.config === undefined)[0] || undefined;
        }

        let baseOrder: OrderParameter<T>[] = [];
        let currentOrder: OrderParameter<T>[] = [];
        if (firstField) {
            baseOrder = [{
                by: firstField.field,
                direction: baseConfiguration.listFields.defaultOrderDirection || "asc",
                priority: 1
            }];

            currentOrder = [{
                by: firstField.field,
                direction: currentConfiguration.listFields.defaultOrderDirection || "asc",
                priority: 1
            }]
        }

        let result: ListOfSchema<T> = {
            baseConfiguration: <ListLoadingParameters<T>>{
                schema: baseConfiguration.schema,
                additionFilter: additionFilter,
                listConfiguration: baseConfiguration.listFields,
                filterConfiguration: baseConfiguration.filter,
                limit: baseConfiguration.elementsPerPage,
                offset: 0,
                order: baseOrder,
                listOrderType: baseConfiguration.orderType || "multiple",
            },
            baseData: <BaseData<T>>{
                filter: {},
                list: {},
            },
            currentData: {
                count: undefined,
                rows: [],
                parameters: <ListLoadingParameters<T>>{
                    schema: currentConfiguration.schema,
                    additionFilter: additionFilter,
                    listConfiguration: currentConfiguration.listFields,
                    filterConfiguration: currentConfiguration.filter,
                    limit: currentConfiguration.elementsPerPage,
                    offset: 0,
                    order: currentOrder,
                },
                additionData: undefined,
            },
            schema: configuration.schema
        };

        const pageData = await this.dataLoader.LoadBaseData(result.baseConfiguration);

        result.baseData = JSON.parse(JSON.stringify(pageData));
        result.currentData = JSON.parse(JSON.stringify(pageData.list));

        return result
    }
}
