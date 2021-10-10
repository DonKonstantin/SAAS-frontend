import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {editSchemaConfiguration} from "../../../settings/pages";
import {loggerFactory} from "../../../services/logger";
import {call, put} from "@redux-saga/core/effects";
import {entityGetterService} from "../../../services/entityGetterService";
import {EntityData} from "../../../services/entityGetterService/interface";
import {AdditionEditParams} from "../../../containers/EntityEdit";

/**
 * Сага перезагрузки данных сущности при изменении параметров схемы или первичного ключа
 */
export class EntityEditReloadSaga implements Saga<"ENTITY_EDIT_NEED_RELOAD_DATA"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Обработка загрузки
     * @param action
     */
    *handle(action: ReduxAction<"ENTITY_EDIT_NEED_RELOAD_DATA">): IterableIterator<Effects> {
        const schema = action.payload.schema
        const primaryKey = action.payload.primaryKey
        const additionEditParams: AdditionEditParams = JSON.parse(JSON.stringify(action.payload.additionEditParams || {}))
        const config = editSchemaConfiguration()[schema]
        if (!config) {
            return undefined
        }

        const logger = loggerFactory().make(`EntityEditReloadSaga`)
        logger.Debug(`Starting loading base data for schema "${schema}" and primary key "${primaryKey}"`)

        // Включаем индикатор загрузки
        yield put<ReduxAction<"ENTITY_EDIT_CHANGE_LOADING_STATE">>({
            payload: true,
            type: "ENTITY_EDIT_CHANGE_LOADING_STATE",
        })

        // @ts-ignore
        let data: EntityData<any> = yield call(async () => await entityGetterService().GetEntity(schema, primaryKey, additionEditParams))
        logger.Debug(`Loaded base data for schema "${schema}" and primary key "${primaryKey}"`, data)

        if (!data) return undefined

        yield put<ReduxAction<"ENTITY_EDIT_STORE_LOADED_DATA">>({
            payload: {
                schema: schema,
                primaryKey: primaryKey,
                data: data,
            },
            type: "ENTITY_EDIT_STORE_LOADED_DATA",
        })
    }
}