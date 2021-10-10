import {PrimarySearchServiceInterface, SearchResponse, SearchResponseItem} from "./interfaces";
import {Collection} from "../types";
import {store} from "../../reduxStore/system";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";
import {PrimarySearchQuery, PrimarySearchQueryResponse} from "./PrimarySearchQuery";
import {SchemaDataLoadQuery, SchemaDataLoadQueryResponse} from "./SchemaDataLoadQuery";
import {SearchConfig} from "../../settings/search/system/types";

/**
 * Сервис поиска сущностей
 */
export class PrimarySearchService implements PrimarySearchServiceInterface {
    private readonly client = graphQLClient();
    private readonly logger = loggerFactory().make(`PrimarySearchService`);
    private readonly searchConfig: SearchConfig;

    /**
     * Конструктор сервиса
     * @param searchConfig
     */
    constructor(searchConfig: SearchConfig) {
        this.searchConfig = searchConfig
    }

    /**
     * Поиск сущностей по поисковой строке
     * @param id
     * @param searchString
     */
    async Search(id: string, searchString: string): Promise<SearchResponse> {
        this.logger.Debug(`Requested search string`, searchString);
        if (searchString.length === 0) {
            return {id: id, data: []}
        }

        const accessRules = store().getState().Authorization.user.permissions;
        const searchConf = this.searchConfig.filter(conf => {
            return conf.editAccessRule.reduce((result: boolean, rule: string): boolean => (
                result && accessRules.indexOf(rule) !== -1
            ), true)
        });

        this.logger.Debug(`Loaded search configuration`, searchConf);

        if (searchConf.length === 0) {
            return {id: id, data: []}
        }

        try {
            const response = await this.client.Query<null, PrimarySearchQueryResponse>(
                new PrimarySearchQuery(searchString, searchConf.map(c => c.entityCode)),
                {}
            );

            this.logger.Debug(`Loaded primary search data`, response);
            if (0 === response.searchLocalizedEntities.length) {
                return {id: id, data: []}
            }

            const entityGroups = response.searchLocalizedEntities.reduce(
                (result: Collection<any[]>, entity: {entityId: string, entityType: string}): Collection<any[]> => {
                  return {
                      ...result,
                      [entity.entityType]: [...(result[entity.entityType] || []), <any>entity.entityId],
                  }
                },
                {}
            );

            let groupedResults: Collection<SearchResponseItem[]> = {};
            await Promise.all(Object.keys(entityGroups).map(async group => {
                const searchConfig = searchConf.find(conf => conf.entityCode === group);
                if (!searchConfig) {
                    return
                }

                const response = await this.client.Query<null, SchemaDataLoadQueryResponse>(
                    new SchemaDataLoadQuery(searchConfig.schema, searchConfig.fieldsToLoad.map(f => `${f}`), entityGroups[group]),
                    {}
                );

                if (0 === response.data.length) {
                    return
                }

                const additionData: any = searchConfig.additionDataLoader
                    ? await searchConfig.additionDataLoader(entityGroups[group])
                    : undefined;

                groupedResults[group] = await Promise.all(response.data.map(async data => ({
                    entityType: group,
                    searchProps: {
                        primaryKey: `${data.primaryKey}`,
                        fields: JSON.parse(JSON.stringify(data)),
                        additionData: additionData ? JSON.parse(JSON.stringify(additionData)) : undefined,
                        entityData: searchConfig.entityDataLoader
                            ? await searchConfig.entityDataLoader(JSON.parse(JSON.stringify(data)))
                            : undefined,
                    }
                })))
            }));

            // @ts-ignore
            let data: SearchResponseItem[] = response.searchLocalizedEntities
                .map(entity => {
                    return groupedResults[entity.entityType].find(item => item.searchProps.primaryKey === entity.entityId)
                })
                .filter(entity => !!entity)
            ;

            return {id: id, data: data}
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return {id: id, data: []}
        }
    }
}