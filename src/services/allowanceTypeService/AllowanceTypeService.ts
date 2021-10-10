import {Allowance, AllowanceSearchResult, AllowanceTypeServiceInterface} from "./interfaces";
import {loggerFactory} from "../logger";
import {AllowanceGroupLoader} from "../searchLoaders/allowanceGroupsLoader/AllowanceGroupLoader";
import {AllowanceLoader} from "../searchLoaders/allowanceLoader/AllowanceLoader";
import {allowanceGroupsLoader} from "../searchLoaders/allowanceGroupsLoader";
import {allowanceLoader} from "../searchLoaders/allowanceLoader";
import {AllowanceGroupData} from "../searchLoaders/allowanceGroupsLoader/AllowanceGroupLoaderQuery";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {AllowanceSearchQuery, AllowanceSearchQueryResponse} from "./AllowanceSearchQuery";

/**
 * Сервис для работы с типами надбавок
 */
export class AllowanceTypeService implements AllowanceTypeServiceInterface {
    private readonly logger = loggerFactory().make(`AllowanceTypeService`)
    private readonly allowanceGroupLoader: AllowanceGroupLoader
    private readonly allowanceLoader: AllowanceLoader
    private readonly client: GraphQLClient

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.allowanceGroupLoader = allowanceGroupsLoader(token)
        this.allowanceLoader = allowanceLoader(token)
        this.client = graphQLClient(token)
    }

    /**
     * Получение надбавок по переданным ID
     * @param ids
     */
    async GetAllowances(ids: any[]): Promise<Allowance[]> {
        if (0 === ids.length) {
            return []
        }

        const allowanceGroups = await this.allowanceGroupLoader.Load()
        const result = (await this.allowanceLoader.Load(ids)).map(allowanceBase => {
            return {
                ...allowanceBase,
                allowance_group: allowanceGroups.find(g => g.id === allowanceBase.allowance_group) as AllowanceGroupData
            }
        })

        this.logger.Debug(`GetAllowances() - Loaded allowances`, result)

        return result
    }

    /**
     * Поиск надбавок по названию
     * @param id
     * @param name
     */
    async SearchAllowancesByName(id: string, name: string): Promise<AllowanceSearchResult> {
        if (name === "") {
            return {
                id: id,
                items: []
            }
        }

        try {
            const response = await this.client.Query<null, AllowanceSearchQueryResponse>(new AllowanceSearchQuery(name), {})
            this.logger.Debug(`SearchAllowancesByName() - Found items`, response)

            if (response.searchLocalizedEntities.length === 0) {
                return {
                    id: id,
                    items: []
                }
            }

            const allowances = await this.GetAllowances(response.searchLocalizedEntities.reduce((result: any[], response: {entityId: string}): any[] => {
                return [...result, response.entityId]
            }, []))

            return {
                id: id,
                items: allowances
            }
        } catch (e) {
            this.logger.Error(`SearchAllowancesByName() - Some error occurred`, e)
            return {
                id: id,
                items: []
            }
        }
    }
}