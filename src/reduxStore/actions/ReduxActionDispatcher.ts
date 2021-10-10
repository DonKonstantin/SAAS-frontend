import {ActionDispatcher} from "./ActionDispatcher";
import {AvailableAction, ReduxActionTypes} from "../ReduxStore";
import {ReduxActionFactory} from "../system/BaseReduxAction";
import {Action, Dispatch} from "redux";

/**
 * Сервис отправки событий в Redux
 */
export class ReduxActionDispatcher implements ActionDispatcher {

    private readonly actionFactory: ReduxActionFactory;
    private readonly dispatcher: Dispatch<Action>;

    /**
     * Конструктор службы
     *
     * @param actionFactory
     * @param dispatcher
     */
    constructor(actionFactory: ReduxActionFactory, dispatcher: Dispatch<Action>) {
        this.actionFactory = actionFactory;
        this.dispatcher = dispatcher;
    }

    /**
     * Отправляет типизированное событие в Redux Store
     *
     * @param type
     * @param payload
     */
    dispatch<T extends AvailableAction>(type: T, payload: ReduxActionTypes[T]): void {
        this.dispatcher(this.actionFactory<T>(type, payload));
    }
}
