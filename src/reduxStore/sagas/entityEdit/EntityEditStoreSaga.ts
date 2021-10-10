import {Effects, EventsType, Saga} from "../system/SagasCollection";
import {ReduxAction} from "../../system/ReduxAction";
import {entityValidator} from "../../../services/validation/validator";
import {call, put} from "@redux-saga/core/effects";
import {Logger} from "../../../services/logger/Logger";
import {loggerFactory} from "../../../services/logger";
import {ValidationResults} from "../../../services/validation/validator/interfaces";
import {EditPageConfiguration} from "../../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../../settings/pages";
import {EntityData} from "../../../services/entityGetterService/interface";
import {Schemas} from "../../../settings/schema";
import {entityStoreService} from "../../../services/entityStoreService";
import {notificationsDispatcher} from "../../../services/notifications";
import {entityGetterService} from "../../../services/entityGetterService";
import {AdditionEditParams} from "../../../containers/EntityEdit";

/**
 * Сага сохранения сущности
 */
export class EntityEditStoreSaga implements Saga<"ENTITY_EDIT_SAVE_ENTITY"> {
    readonly eventType: EventsType = "Latest";

    /**
     * Обработка сохранения
     * @param action
     */
    *handle(action: ReduxAction<"ENTITY_EDIT_SAVE_ENTITY">): IterableIterator<Effects> {
        // @ts-ignore
        const configuration: EditPageConfiguration<any> = editSchemaConfiguration()[action.payload.entityData.schema]
        const schema = action.payload.entityData.schema
        const primaryKey = action.payload.isNeedCopy ? undefined : action.payload.entityData.primaryKey
        const data: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(action.payload.entityData))
        const additionEditParams: AdditionEditParams = JSON.parse(JSON.stringify(action.payload.additionEditParams || {}))

        const logger: Logger = loggerFactory().make(`EntityEditStoreSaga`)
        logger.Debug(`Starting storing data to schema "${schema}" and primary key "${primaryKey}"`, data)

        // Включаем индикатор загрузки
        yield put<ReduxAction<"ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE">>({
            payload: true,
            type: "ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE",
        })

        // Запускаем валидацию значений. Клонируем данные для исключения нежелательных мутаций
        // @ts-ignore
        let validationResults: ValidationResults = yield call(async () => await entityValidator().Validate(primaryKey, schema, JSON.parse(JSON.stringify(data))))
        logger.Debug(`Validation results for schema "${schema}" and primary key "${primaryKey}"`, validationResults)

        yield put<ReduxAction<"ENTITY_EDIT_CHANGE_VALIDATION_RESULTS">>({
            payload: validationResults.validationResults,
            type: "ENTITY_EDIT_CHANGE_VALIDATION_RESULTS",
        })

        // Если валидация не прошла, завершаем сагу
        if (validationResults.isError) {
            // Завершаем обработку
            yield put<ReduxAction<"ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE">>({
                payload: false,
                type: "ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE",
            })

            return undefined
        }

        // Сохраняем сущность
        const savedPrimaryKey: any = yield call(async () => entityStoreService().Store({
            schema: schema,
            primaryKey: action.payload.entityData.primaryKey,
            isNeedCopy: action.payload.isNeedCopy,
            data,
        }))

        // Необходимо сбросить данные листингов сущностей после изменения сущности
        yield put<ReduxAction<"ENTITY_LIST_STORE_RESET">>({
            payload: undefined,
            type: "ENTITY_LIST_STORE_RESET",
        })

        // Сбрасываем результаты валидации после сохранения сущности
        yield put<ReduxAction<"ENTITY_EDIT_CHANGE_VALIDATION_RESULTS">>({
            payload: [],
            type: "ENTITY_EDIT_CHANGE_VALIDATION_RESULTS",
        })

        logger.Debug(`Stored entity to schema "${schema}" with primary key:`, savedPrimaryKey)

        // Если сущность не сохранилась
        if (!savedPrimaryKey) {
            notificationsDispatcher().dispatch({
                message: "Серверная ошибка сохранения",
                type: "error"
            })

            // Завершаем обработку
            yield put<ReduxAction<"ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE">>({
                payload: false,
                type: "ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE",
            })

            return undefined
        }

        notificationsDispatcher().dispatch({
            message: "Изменения успешно сохранены",
            type: "success"
        })

        if (action.payload.entityData.schema === "language") {
            yield put<ReduxAction<"LANGUAGES_NEED_RELOAD_LANGUAGES">>({
                payload: undefined,
                type: "LANGUAGES_NEED_RELOAD_LANGUAGES",
            })
        }

        // Если запрошено закрытие страницы после сохранения то нужно редиректнуть пользователя на страницу листинга
        if (action.payload.isNeedClose) {
            if (additionEditParams.isNeedCloseWindowAfterExit) {
                window.close()
                return undefined
            }

            let url = configuration.listPageUrl
            if (additionEditParams.closeUrl) {
                url = {...additionEditParams.closeUrl}
            }

            // Устанавливаем страницу редиректа
            yield put<ReduxAction<"ENTITY_EDIT_SET_REDIRECT_TO">>({
                payload: url,
                type: "ENTITY_EDIT_SET_REDIRECT_TO",
            })

            return undefined
        }

        // Если сущность была создана, то необходимо редиректнуть пользователя на страницу редактирования
        if (!primaryKey && savedPrimaryKey) {
            // Устанавливаем страницу редиректа
            yield put<ReduxAction<"ENTITY_EDIT_SET_REDIRECT_TO">>({
                payload: configuration.editPageUrlGenerator(savedPrimaryKey, additionEditParams),
                type: "ENTITY_EDIT_SET_REDIRECT_TO",
            })

            return undefined
        }

        // Необходимо загрузить обновленные данные для сущности
        // @ts-ignore
        let newData: EntityData<any> = yield call(async () => await entityGetterService().GetEntity(schema, savedPrimaryKey, additionEditParams))
        logger.Debug(`Loaded data for schema "${schema}" and primary key "${savedPrimaryKey}"`, newData)

        // Если новые данные не удалось получить, сообщаем об этом пользователю
        if (!data) {
            notificationsDispatcher().dispatch({
                message: "Ошибка загрузки обновленных данных",
                type: "error"
            })

            // Завершаем обработку
            yield put<ReduxAction<"ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE">>({
                payload: false,
                type: "ENTITY_EDIT_CHANGE_IN_PROGRESS_CHANGE",
            })

            return undefined
        }

        // Сохраняем загруженные данные в Store
        yield put<ReduxAction<"ENTITY_EDIT_DATA_CHANGED">>({
            payload: newData,
            type: "ENTITY_EDIT_DATA_CHANGED",
        })
    }
}