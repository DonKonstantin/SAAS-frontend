import {TnvedCategory, TnvedCategoryServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {SearchTnvedCategoryByCodeQuery, SearchTnvedCategoryByCodeQueryResponse} from "./SearchTnvedCategoryByCodeQuery";
import {
    SearchTnvedCategoryByStringQuery,
    SearchTnvedCategoryByStringQueryResponse
} from "./SearchTnvedCategoryByStringQuery";
import {LoadTnvedCategoryByIdQuery, LoadTnvedCategoryByIdQueryResponse} from "./LoadTnvedCategoryByIdQuery";
import {Subject} from "rxjs";
import {FetchResult} from "@apollo/client";
import {
    SubscribeToCategoryChangesQuery,
    SubscribeToCategoryChangesQueryResponse
} from "./SubscribeToCategoryChangesQuery";
import {CreateCategoryQuery, CreateCategoryQueryResponse} from "./CreateCategoryQuery";
import {UpdateCategoryQuery, UpdateCategoryQueryResponse} from "./UpdateCategoryQuery";

/**
 * Сервис для поиска категорий ТНВЭД
 */
export class TnvedCategoryService implements TnvedCategoryServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TnvedCategorySearchService`);
    }

    /**
     * Поиск категории по переданному коду ТНВЭД
     * @param code
     * @param companyId
     */
    async SearchTnvedCategoryByCode(code: string[], companyId: number): Promise<TnvedCategory[]> {
        try {
            const response = await this.client.Query<{ code: string[], companyId: number }, SearchTnvedCategoryByCodeQueryResponse>(
                new SearchTnvedCategoryByCodeQuery(code, companyId),
                {},
            );
            this.logger.Debug(`Loaded TNVED category`, response);

            return response.tnved_company_category_list
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to search category by code`);
        }
    }

    /**
     * Поиск категорий по переданной строке поиска
     * @param searchString
     * @param companyId
     */
    async SearchTnvedCategoryByString(searchString: string, companyId: number): Promise<TnvedCategory[]> {
        try {
            const response = await this.client.Query<{ searchString: string }, SearchTnvedCategoryByStringQueryResponse>(
                new SearchTnvedCategoryByStringQuery(searchString),
                {},
            );
            this.logger.Debug(`Loaded TNVED category IDs`, response);

            if (0 === response.searchLocalizedEntities.length) {
                return []
            }

            const ids = response.searchLocalizedEntities.map(e => e.entityId);

            const result = await this.client.Query<{ id: string[], companyId: number }, LoadTnvedCategoryByIdQueryResponse>(
                new LoadTnvedCategoryByIdQuery(ids, companyId),
                {},
            );
            this.logger.Debug(`Loaded TNVED categories by IDs`, result);

            return result.tnved_company_category_list
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to search category by code`);
        }
    }

    /**
     * Подписка на события изменения категорий ТНВЭД
     */
    SubscribeToCategoryChanges(): Subject<FetchResult<SubscribeToCategoryChangesQueryResponse>> {
        return this.client.Subscribe<null, SubscribeToCategoryChangesQueryResponse>(
            new SubscribeToCategoryChangesQuery(),
        );
    }

    /**
     * Создание категории ТНВЭД
     * @param category
     */
    async CreateCategory(category: TnvedCategory): Promise<TnvedCategory> {
        try {
            const response = await this.client.Mutation<{category: Partial<TnvedCategory>}, CreateCategoryQueryResponse>(
                new CreateCategoryQuery(category),
                {},
            );
            this.logger.Debug(`Created TNVED category`, response);

            if (0 === response.tnved_company_category_insert.returning.length) {
                throw new Error(`Empty response`)
            }

            const [result] = response.tnved_company_category_insert.returning;

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to create category`);
        }
    }

    /**
     * Обновление категории ТНВЭД
     * @param category
     */
    async UpdateCategory(category: TnvedCategory): Promise<TnvedCategory> {
        try {
            const response = await this.client.Mutation<{category: Partial<TnvedCategory>, id: string}, UpdateCategoryQueryResponse>(
                new UpdateCategoryQuery(category),
                {},
            );
            this.logger.Debug(`Updated TNVED category`, response);

            if (0 === response.tnved_company_category_update.returning.length) {
                throw new Error(`Empty response`)
            }

            const [result] = response.tnved_company_category_update.returning;

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to update category`);
        }
    }

    /**
     * Загрузка категорий ТНВЭД по переданному списку ID
     * @param id
     * @param companyId
     */
    async LoadTnvedCategoriesById(id: string[], companyId: number): Promise<TnvedCategory[]> {
        try {
            if (0 === id.length) {
                return []
            }

            const result = await this.client.Query<{ id: string[], companyId: number }, LoadTnvedCategoryByIdQueryResponse>(
                new LoadTnvedCategoryByIdQuery(id, companyId),
                {},
            );
            this.logger.Debug(`Loaded TNVED categories by IDs`, result);

            return result.tnved_company_category_list
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to search category by code`);
        }
    }
}