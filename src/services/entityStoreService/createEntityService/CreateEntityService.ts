import {CreateEntityServiceInterface} from "./interfaces";
import {SchemaField, Schemas} from "../../../settings/schema";
import {EntityData} from "../../entityGetterService/interface";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import getPrimaryKeyForSchema from "../../helpers/GetPrimaryKeyForSchema";
import {GraphQlSchemaValueConverterInterface} from "../../graphQlSchemaValueConverter/interfaces";
import {graphQlSchemaValueConverter} from "../../graphQlSchemaValueConverter";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {CreateQuery, CreateResponse} from "./CreateQuery";
import GetFieldToStoreFromConfiguration from "../../helpers/GetFieldToStoreFromConfiguration";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";

/**
 * Сервис создания сущностей
 */
export class CreateEntityService implements CreateEntityServiceInterface {
    private readonly logger: Logger = loggerFactory().make(`CreateEntityService`);
    private readonly valueConverter: GraphQlSchemaValueConverterInterface = graphQlSchemaValueConverter()
    private readonly client: GraphQLClient = graphQLClient()

    /**
     * Создание сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param schema
     * @param data
     */
    async Create<T extends keyof Schemas>(schema: T, data: EntityData<keyof Schemas>): Promise<any> {
        try {
            // @ts-ignore
            const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[schema]
            const storeSchema = configuration.storeSchema ? configuration.storeSchema : schema

            const passedData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(data))
            const fieldsAvailableToStore = GetFieldToStoreFromConfiguration(schema, passedData.values)
            const schemaConfig = (new Schemas())[storeSchema]
            const fields = Object.keys(data.values)
                .filter(fieldCode => fieldsAvailableToStore.indexOf(fieldCode) !== -1)
                .map((fieldCode: keyof Schemas[T]['fields']) => {
                    // @ts-ignore
                    const fieldConfig: SchemaField = schemaConfig.fields[fieldCode]
                    // @ts-ignore
                    let value: any = passedData.values[fieldCode];
                    
                    if (typeof value === 'string') {
                      value = value.replace(/[\r\n]/gm, ' ');
                    }

                    let convertedValue = this.valueConverter.convertValueToGraphQL(fieldConfig, value)

                    if (!convertedValue || convertedValue.replace(' ', '').length === 2) {
                      convertedValue = "\"\"";
                    }

                    // @ts-ignore
                    return `${fieldCode}: ${convertedValue}`
                })

            this.logger.Debug(`generated field to insert`, fields)

            if (0 === fields.length) {
                return undefined
            }

            const primaryKey = getPrimaryKeyForSchema(storeSchema)
            // @ts-ignore
            const mutation = `mutation __INSERT_ENTITY__ {result: ${storeSchema}_insert(objects: [{${fields.join(`,`)}}]){returning {primaryKey: ${primaryKey.code}}}}`

            this.logger.Debug(`generated insert query`, mutation)

            const response = await this.client.Mutation<null, CreateResponse>(new CreateQuery(mutation), {})

            this.logger.Info(`created entity in schema "${storeSchema}"`, response)

            if (0 === response.result.returning.length) {
                this.logger.Error(`Empty response returned`, storeSchema, data, response)
                return undefined
            }

            return response.result.returning[0].primaryKey
        } catch (e) {
            this.logger.Error(`Some error occurred`, schema, data, e)
            return undefined
        }
    }
}