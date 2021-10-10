import {EntityGetterServiceInterface} from "./interface";
import {EntityGetterService} from "./EntityGetterService";
import {initialDataGetter} from "./initialDataGetter";
import {additionDataGetter} from "./additionDataGetter";
import {entityValuesGetter} from "./entityValuesGetter";

// Фабрика сервиса
export const entityGetterService: {(token?: string): EntityGetterServiceInterface} = (token?: string) => {
    return new EntityGetterService(
        initialDataGetter(token),
        additionDataGetter(token),
        entityValuesGetter(token),
        token,
    )
};