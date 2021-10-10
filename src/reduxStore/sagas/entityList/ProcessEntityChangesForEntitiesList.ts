import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {listSchemaConfiguration} from "../../../settings/pages";
import {call, put} from "@redux-saga/core/effects";

/**
 * Сага загрузки данных для измененной строки, прилетевшей по WSS
 */
export class ProcessEntityChangesForEntitiesList implements Saga<"ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS"> {
    readonly eventType: EventsType = "Every";

    /**
     * Обработка загрузки
     * @param action
     */
    *handle(action: ReduxAction<"ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS">): IterableIterator<Effects> {
        const config = listSchemaConfiguration()[action.payload.data.schema];
        if (!config) return undefined;

        const currentSchemaData = JSON.parse(JSON.stringify(action.payload.data));

        // Сохраняем основные изменения
        switch (action.payload.eventType) {
            case "updated":
                currentSchemaData.currentData.rows = currentSchemaData.currentData.rows.map(row => {
                    if (row.primaryKeyValue !== action.payload.changedRow.primaryKeyValue) {
                        return {...row}
                    }

                    return JSON.parse(JSON.stringify(action.payload.changedRow))
                });
                break;
            case "deleted":
                currentSchemaData.currentData.rows.filter(row => {
                    return row.primaryKeyValue !== action.payload.changedRow.primaryKeyValue
                })
        }

        // Теперь необходимо перезагрузить Addition Data для строк
        const { additionDataLoader } = config.listFields;
        if (additionDataLoader) {
            currentSchemaData.currentData.additionData = yield call(
                async () => await additionDataLoader(currentSchemaData.currentData.rows)
            );
        }

        // Сохраняем изменения в сторе
        yield put<ReduxAction<"ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA">>({
            payload: {
                schema: action.payload.data.schema,
                data: currentSchemaData,
            },
            type: "ENTITY_LIST_STORE_UPDATED_SCHEMA_DATA",
        })
    }

}