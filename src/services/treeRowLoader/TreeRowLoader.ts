import {TreeRowLoaderInterface, TreeRowLoaderParameters} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {listSchemaConfiguration} from "../../settings/pages";
import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {RowResult} from "./queryGenerator/interfaces";
import {loggerFactory} from "../logger";
import {queryGenerator} from "./queryGenerator";
import {graphQLClient} from "../graphQLClient";
import {ListResponse} from "../listDataLoader/listLoader/types";
import {ListLoadingParameters} from "../listDataLoader/listLoader/interfaces";

/**
 * Сервис загрузки строк для отображения дочерних сущностей
 */
export class TreeRowLoader implements TreeRowLoaderInterface {
    private readonly logger = loggerFactory().make(`TreeRowLoader`);
    private readonly queryGenerator = queryGenerator();
    private readonly client = graphQLClient();

    /**
     * Загрузка строк для отображения
     */
    async LoadRows<T extends keyof Schemas>(params: TreeRowLoaderParameters<T>): Promise<ListResponse<T>> {
        const list = this.queryGenerator.GenerateQuery(params.schema, params.primaryKeyValues);

        // @ts-ignore
        const defaultResult: ListResponse<T> = {additionData: undefined, count: 0, rows: []};
        try {
            const actualConfig = listSchemaConfiguration()[params.schema];
            if (!actualConfig || list === "") {
                return defaultResult
            }

            const parameters: ListLoadingParameters<T> = {
                currentFilterValues: undefined,
                additionFilter: {},
                filterConfiguration: {},
                limit: 0,
                listConfiguration: actualConfig.listFields,
                offset: 0,
                order: [],
                originalFilterValues: undefined,
                prevFilterValues: undefined,
                schema: params.schema
            };

            const listRawData = await this.client.Query<null, RowResult<T>>(new class implements GraphQLQuery<null> {
                readonly query: any = gql`${list}`;
                readonly variables: null = null;
            }, {});

            this.logger.Debug("Loaded raw data", listRawData);

            const rows = await this.queryGenerator.GenerateValuesByRowResult(params.schema, listRawData);

            let additionData: any = undefined;
            if (actualConfig.listFields.additionDataLoader) {
                additionData = await actualConfig.listFields.additionDataLoader(rows)
            }

            const result = {
                additionData: additionData,
                count: 0,
                parameters: parameters,
                rows: rows
            };

            this.logger.Debug("Loaded list response", result);

            return result
        } catch (e) {
            this.logger.Error(`Loading error`, e);
            return defaultResult
        }
    }
}