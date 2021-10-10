import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {loggerFactory} from "../../../services/logger";
import {ReduxAction} from "../../system/ReduxAction";
import {call, put} from "@redux-saga/core/effects";
import {ListOfSchema} from "../../stores/EntityList";
import {listDataLoader} from "../../../services/listDataLoader";
import {ListResponse} from "../../../services/listDataLoader/listLoader/types";

/**
 * Сага перезагрузки листинга сущностей при изменении параметров пользователем
 */
export class ReloadEntitiesListDataSaga implements Saga<"ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA">  {
    readonly eventType: EventsType = "Latest";

    /**
     * Обработка загрузки
     * @param action
     */
    *handle(action: ReduxAction<"ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA">): IterableIterator<Effects> {
        const logger = loggerFactory().make(`ReloadEntitiesListDataSaga`)
        logger.Debug(`Starting reloading schema data: "${action.payload.schema}"`, action)

        // Включаем индикатор загрузки
        yield put<ReduxAction<"ENTITY_LIST_CHANGE_LIST_RELOADING_STATE">>({
            payload: true,
            type: "ENTITY_LIST_CHANGE_LIST_RELOADING_STATE",
        })

        // @ts-ignore
        let data: ListResponse<any> = yield call(async () => await listDataLoader().Load(action.payload.data.currentData.parameters))
        const newListOfSchema: ListOfSchema<any> = JSON.parse(JSON.stringify(action.payload.data))
        newListOfSchema.currentData = JSON.parse(JSON.stringify(data))

        yield put<ReduxAction<"ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA">>({
            payload: {
                schema: action.payload.schema,
                data: newListOfSchema,
            },
            type: "ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA",
        })
    }
}