import {ActionHandler} from "../system/ActionHandler";
import {EntityList} from "../../../stores/EntityList";
import {DefaultEntityList} from "../../defaults";

/**
 * Обработчик сброса Store листинга сущностей
 */
export class ResetStoreHandler implements ActionHandler<EntityList, "ENTITY_LIST_STORE_RESET"> {
    handle(): EntityList {
        return {...new DefaultEntityList()};
    }
}