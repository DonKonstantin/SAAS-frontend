import { EntityDeleteServiceInterface } from "./interfaces";
import { Schemas } from "../../settings/schema";
import { ListLoadingParameters } from "../listDataLoader/listLoader/interfaces";
import { Logger, LoggerFactory } from "../logger/Logger";
import getPrimaryKeyForSchema from "../helpers/GetPrimaryKeyForSchema";
import { SchemaValueConverterInterface } from "../schemaValueConverter/interfaces";
import { GraphQLClient } from "../graphQLClient/GraphQLClient";
import { listSchemaConfiguration } from "../../settings/pages";
import { ListPageConfiguration } from "../../settings/pages/system/list";
import { DeleteItemsByIdMutation } from "./Mutations/DeleteItemsById";
import { DeleteItemsByIdProps } from "./types";

/**
 * Сервис удаления сущностей
 */
export class EntityDeleteService implements EntityDeleteServiceInterface {
  private readonly logger: Logger;
  private readonly valueConverter: SchemaValueConverterInterface;
  private readonly client: GraphQLClient;

  /**
   * Конструктор сервиса
   * @param logger
   * @param valueConverter
   * @param client
   */
  constructor(
    logger: LoggerFactory,
    valueConverter: SchemaValueConverterInterface,
    client: GraphQLClient
  ) {
    this.logger = logger.make(`EntityDeleteService`);
    this.valueConverter = valueConverter;
    this.client = client;
  }

  /**
   * Удаление сущностей по переданному списку ID
   * @param params
   * @param items
   */
  async DeleteItemsById<T extends keyof Schemas>(
    params: ListLoadingParameters<T>,
    items: any[]
  ): Promise<boolean> {
    try {
      // @ts-ignore
      const schemaConfig: ListPageConfiguration<any> =
        listSchemaConfiguration()[params.schema];
      const deleteSchema = schemaConfig.deleteSchema
        ? schemaConfig.deleteSchema
        : params.schema;

      const primaryKey = getPrimaryKeyForSchema(deleteSchema);
      const ids: string[] = items.map((item) =>
        this.valueConverter.convertValueToGraphQL(primaryKey.field.type, item)
      );

      this.logger.Debug(`Query parameters`, primaryKey, ids);

      await this.client.Mutation<DeleteItemsByIdProps, any>(
        new DeleteItemsByIdMutation(deleteSchema, primaryKey.code, ids),
        {}
      );

      this.logger.Debug(`Successfully executed delete query`);

      return true;
    } catch (e) {
      this.logger.Error(`Some error occurred`, e);
      return false;
    }
  }
}
