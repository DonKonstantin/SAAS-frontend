import {ListLoaderInterface, ListLoadingParameters} from "./interfaces";
import {Schemas} from "../../../settings/schema";
import {ListResponse} from "./types";
import {CountResult, QueryGeneratorInterface, RowResult} from "./queryGenerator/interfaces";
import {GraphQLClient, GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import gql from "graphql-tag";
import {listSchemaConfiguration} from "../../../settings/pages";
import {ListPageConfiguration} from "../../../settings/pages/system/list";

/**
 * Загрузчик листинга сущностей
 */
export class ListLoader implements ListLoaderInterface {
    private readonly queryGenerator: QueryGeneratorInterface;
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly token?: string;

    /**
     * Конструктор загрузчика
     * @param queryGenerator
     * @param client
     * @param logger
     * @param token
     */
    constructor(
        queryGenerator: QueryGeneratorInterface,
        client: GraphQLClient,
        logger: LoggerFactory,
        token?: string,
    ) {
        this.queryGenerator = queryGenerator;
        this.client = client;
        this.logger = logger.make(`ListLoader`);
        this.token = token;
    }

    /**
     * Загрузка листинга сущностей
     * @param params
     */
    async Load<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<ListResponse<T>> {
      
      //!!  возврат моковых данных
      // if (params.schema === 'player') {
      //   return {
      //     count: 3,
      //     parameters: params,
      //     //@ts-ignore
      //     rows: plaerRows,
      //     additionData: additionData,
      //   }
      // }
        const {list, count} = this.queryGenerator.GenerateQuery(params);
        try {
            // @ts-ignore
            const actualConfig: ListPageConfiguration<T> = listSchemaConfiguration()[params.schema];

            type TempResults = {list: any, count: any}
            let results: TempResults = {list: undefined, count: undefined};
            const promises = [list, count].map(async (query: string, i): Promise<undefined> => {
                if (query === "") {
                    return
                }

                const rawData = await this.client.Query<null, any>(new class implements GraphQLQuery<null> {
                    readonly query: any = gql`${query}`;
                    readonly variables: null = null;
                }, {});

                this.logger.Debug("Loaded raw data", rawData);

                let key: keyof TempResults = "list";
                if (i === 1) {
                    key = "count"
                }

                results[key] = rawData;

                return
            });

            await Promise.all(promises);

            const listRawData: RowResult<T> = results.list;
            const countRawData: CountResult<T> | undefined = results.count;

            const offset = count.length === 0 ? params.offset : 0;
            const rows = await this.queryGenerator.GenerateValuesByRowResult(params, listRawData);
            const countRes = countRawData ? countRawData[params.schema][0].count : undefined;
            const newParameters = JSON.parse(JSON.stringify(params));
            newParameters.offset = offset;
            newParameters.prevFilterValues = JSON.parse(JSON.stringify(newParameters.currentFilterValues || null));

            let additionData: any = undefined;
            if (actualConfig.listFields.additionDataLoader) {
                additionData = await actualConfig.listFields.additionDataLoader(rows, this.token)
            }

            const result = {
                count: countRes,
                parameters: newParameters,
                rows: rows,
                additionData: additionData,
            };

            this.logger.Debug("Loaded list response", result);

            return result
        } catch (e) {
            this.logger.Error(`Loading error`, e);
            return {
                count: 0,
                parameters: JSON.parse(JSON.stringify(params)),
                rows: [],
                additionData: undefined,
            };
        }
    }
}