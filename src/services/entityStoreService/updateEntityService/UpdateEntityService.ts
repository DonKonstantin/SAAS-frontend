import {EntityUpdateParameters, UpdateEntityServiceInterface} from "./interfaces";
import {EntityData} from "../../entityGetterService/interface";
import {SchemaField, Schemas} from "../../../settings/schema";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import {GraphQlSchemaValueConverterInterface} from "../../graphQlSchemaValueConverter/interfaces";
import {graphQlSchemaValueConverter} from "../../graphQlSchemaValueConverter";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import getPrimaryKeyForSchema from "../../helpers/GetPrimaryKeyForSchema";
import {UpdateQuery, UpdateResponse} from "./UpdateQuery";
import GetFieldToStoreFromConfiguration from "../../helpers/GetFieldToStoreFromConfiguration";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";

/**
 * Сервис обновления данных сущности
 */
export class UpdateEntityService implements UpdateEntityServiceInterface {
    private readonly logger: Logger = loggerFactory().make(`UpdateEntityService`);
    private readonly valueConverter: GraphQlSchemaValueConverterInterface = graphQlSchemaValueConverter()
    private readonly client: GraphQLClient = graphQLClient()

    /**
     * Обновление сущности. Если сохранение успешно, то будет возвращен первичный ключ
     * @param params
     */
    async Update<T extends keyof Schemas>({schema, primaryKey, data}: EntityUpdateParameters): Promise<any> {
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

                    // @ts-ignore
                    const originValue: any = passedData.originalValues[fieldCode]

                    const convertedValue = this.valueConverter.convertValueToGraphQL(fieldConfig, value)
                    const convertedOriginValue = this.valueConverter.convertValueToGraphQL(fieldConfig, originValue)

                    return {
                        fieldCode,
                        convertedValue,
                        convertedOriginValue,
                    }
                })
                .filter(item => item.convertedValue !== item.convertedOriginValue)
                .map(item => `${item.fieldCode.toString()}: ${item.convertedValue}`)
            ;

            this.logger.Debug(`generated field to update`, fields)

            // Если нет полей для обновления, то просто возвращаем ключ
            if (0 === fields.length) {
                return primaryKey
            }

            const primaryKeyConfig = getPrimaryKeyForSchema(storeSchema)
            const primaryKeyValue = this.valueConverter.convertValueToGraphQL(primaryKeyConfig.field, primaryKey)
            if (!primaryKeyValue || `${primaryKeyValue}`.length === 0) {
                return undefined
            }

            const mutation = `mutation __UPDATE_ENTITY__ {result: ${storeSchema}_update(set: {${fields.join(`,`)}}, where: {${primaryKeyConfig.code}: {_equals: ${primaryKeyValue}}}){returning {primaryKey: ${primaryKeyConfig.code}}}}`
            this.logger.Debug(`generated update query`, mutation)

            const response = await this.client.Mutation<null, UpdateResponse>(new UpdateQuery(mutation), {})
            this.logger.Info(`updated entity in schema "${storeSchema}"`, response)

            if (0 === response.result.returning.length) {
                this.logger.Error(`Empty response returned`, storeSchema, primaryKey, data, response)
                return undefined
            }

            return response.result.returning[0].primaryKey
        } catch (e) {
            this.logger.Error(`Some error occurred`, schema, primaryKey, data, e)
            return undefined
        }
    }
}