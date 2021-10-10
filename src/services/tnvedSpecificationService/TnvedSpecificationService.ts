import {TnvedSpecification, TnvedSpecificationServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {Subject} from "rxjs";
import {FetchResult} from "apollo-link";
import {
    SubscribeToSpecificationChangesQuery,
    SubscribeToSpecificationChangesQueryResponse
} from "./SubscribeToSpecificationChangesQuery";
import {CreateSpecificationQuery, CreateSpecificationQueryResponse} from "./CreateSpecificationQuery";
import {LoadSpecificationByIdQuery, LoadSpecificationByIdQueryResponse} from "./LoadSpecificationByIdQuery";
import {UpdateSpecificationQuery} from "./UpdateSpecificationQuery";

// Сервис работы со спецификациями ТНВЭД
export class TnvedSpecificationService implements TnvedSpecificationServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TnvedSpecificationService`);
    }

    /**
     * Создание спецификации по переданным данным
     * @param companyId
     * @param baseDataFile
     */
    async CreateSpecification(companyId: number, baseDataFile: number): Promise<string> {
        try {
            const response = await this.client.Mutation<{ companyId: number, baseDataFile: number }, CreateSpecificationQueryResponse>(
                new CreateSpecificationQuery(companyId, baseDataFile),
                {},
            );
            this.logger.Debug(`Created TNVED specification`, response);

            if (0 === response.tnved_company_specification_insert.returning.length) {
                throw new Error(`Empty response`)
            }

            const [result] = response.tnved_company_specification_insert.returning;

            return result.id
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to create TNVED specification`);
        }
    }

    /**
     * Загрузка спецификации по переданному ID
     * @param specificationId
     */
    async LoadSpecificationById(specificationId: string): Promise<TnvedSpecification> {
        try {
            const response = await this.client.Query<{ specificationId: string }, LoadSpecificationByIdQueryResponse>(
                new LoadSpecificationByIdQuery(specificationId),
                {},
            );
            this.logger.Debug(`Loaded TNVED specification`, response);

            if (0 === response.tnved_company_specification_list.length) {
                throw new Error(`Empty response`)
            }

            const [result] = response.tnved_company_specification_list;

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load TNVED specification`);
        }
    }

    /**
     * Подписка на события изменения спецификации
     * @param specificationId
     */
    SubscribeToSpecificationChanges(specificationId: string): Subject<FetchResult<SubscribeToSpecificationChangesQueryResponse>> {
        return this.client.Subscribe<{ id: string }, SubscribeToSpecificationChangesQueryResponse>(
            new SubscribeToSpecificationChangesQuery(specificationId),
        );
    }

    /**
     * Обновление спецификации
     * @param specification
     */
    async UpdateSpecification(specification: TnvedSpecification): Promise<void> {
        try {
            await this.client.Mutation<{ id: string }, void>(
                new UpdateSpecificationQuery(specification),
                {},
            );
            this.logger.Debug(`Updated TNVED specification`);
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to update TNVED specification`);
        }
    }
}