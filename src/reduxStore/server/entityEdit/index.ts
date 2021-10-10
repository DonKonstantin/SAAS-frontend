import {LoadingParams, StoreLoader} from "../system";
import {DeepPartial} from "../../../services/types";
import {ReduxStore} from "../../ReduxStore";
import {editSchemaConfiguration} from "../../../settings/pages";
import {Schemas} from "../../../settings/schema";
import {entityGetterService} from "../../../services/entityGetterService";

/**
 * Загрузчик данных для формы редактирования на стороне сервера
 */
export class EntityEditLoader implements StoreLoader<"EntityEdit"> {
    async Load(params: LoadingParams): Promise<DeepPartial<ReduxStore["EntityEdit"]>> {
        if (!params.token
            || params.token.length === 0
            || !params.initialProps.pageProps.editSchema
        ) {
            return {
                isChangeInProgress: false,
                isLoading: false,
            }
        }

        const schema: keyof Schemas = params.initialProps.pageProps.editSchema;
        const config = editSchemaConfiguration()[schema];
        if (!config) {
            return {
                isChangeInProgress: false,
                isLoading: false,
            }
        }

        const primaryKey = params.initialProps.pageProps.editPrimaryKey;
        const additionEditParams = params.initialProps.pageProps.additionEditParams || {};

        return {
            primaryKey: primaryKey,
            schema: schema,
            // @ts-ignore
            data: await entityGetterService(params.token).GetEntity(schema, primaryKey, additionEditParams),
            isChangeInProgress: false,
            isLoading: false,
            additionEditParams: additionEditParams,
        };
    }
}