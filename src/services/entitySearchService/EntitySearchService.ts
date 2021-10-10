import {EntitySearchServiceInterface, RelationConfiguration, SearchItem} from "./interface";
import {Schemas} from "../../settings/schema";
import {PhoneticSearchServiceInterface} from "./phoneticSearchService/interface";
import {Logger} from "../logger/Logger";
import {SearchUntypedLoaderInterface} from "../searchUntypedLoader/interfaces";

/**
 * Сервис для поиска целевых сущностей по переданным параметрам
 */
export class EntitySearchService implements EntitySearchServiceInterface {
    private readonly phoneticSearchService: PhoneticSearchServiceInterface;
    private readonly searchUntypedLoader: SearchUntypedLoaderInterface<any>;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param phoneticSearchService
     * @param searchUntypedLoader
     * @param logger
     */
    constructor(
        phoneticSearchService: PhoneticSearchServiceInterface,
        searchUntypedLoader: SearchUntypedLoaderInterface<any>,
        logger: Logger
    ) {
        this.phoneticSearchService = phoneticSearchService;
        this.searchUntypedLoader = searchUntypedLoader;
        this.logger = logger;
    }

    /**
     * Поиск сущностей с поддержкой фонетики
     * @param searchString
     * @param relationParameters
     */
    async phoneticSearch<S extends keyof Schemas>(
        searchString: string,
        relationParameters: RelationConfiguration<S>,
    ): Promise<SearchItem<S>[]> {
        if (0 === searchString.length) {
            return []
        }

        const {
            relatedEntityCode,
            relatedEntitySchema,
            fieldsToLoad,
        } = relationParameters;
        const relations = await this.phoneticSearchService.search(searchString, [relatedEntityCode]);
        this.logger.Debug(`Loaded relations for phonetic search`, relations);

        if (relations.length === 0) {
            return []
        }

        const schemas = new Schemas();
        const schema = schemas[relatedEntitySchema];
        const primaryKey = Object.keys(schema.fields)
            .find(fieldKey => schema.fields[fieldKey]) as keyof Schemas[S]['fields'];

        const entities = await this.searchUntypedLoader.LoadEntitiesById({
            ids: relations.map(r => r.entityId),
            schema: relatedEntitySchema,
            primaryKey: primaryKey,
            fieldsToLoad: fieldsToLoad,
        });

        this.logger.Debug(`Loaded entities`, entities);

        const result = relations
            .map(relation => {
                const entity = entities.find(entity => entity.fields[primaryKey] === relation.entityId);
                if (!entity) {
                    return undefined
                }

                return entity.fields
            })
            .filter(entity => !!entity)
        ;

        return result as SearchItem<S>[];
    }
}