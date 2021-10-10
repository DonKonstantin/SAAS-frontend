import {ActionHandler} from "../system/ActionHandler";
import {Debug} from "../../../stores/Debug";
import {ReduxActionTypes} from "../../../ReduxStore";
import {setDebugState} from "../../../../services/logger";

// Обработчик изменения состояния отладки
export class DebugChangeStateHandler implements ActionHandler<Debug, "DEBUG_CHANGE_STATE"> {
    handle(store: Debug, payload: ReduxActionTypes["DEBUG_CHANGE_STATE"]): Debug {
        setDebugState(payload)
        return {
            ...store,
            isEnabled: payload,
        };
    }
}