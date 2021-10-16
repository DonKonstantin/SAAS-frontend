import {EntityGetterServiceInterface} from "./interface";
import {EntityGetterService} from "./EntityGetterService";
import {initialDataGetter} from "./initialDataGetter";
import {additionDataGetter} from "./additionDataGetter";
import {entityValuesGetter} from "./entityValuesGetter";

// Фабрика сервиса
export const entityGetterService: { (): EntityGetterServiceInterface } = () => {
    return new EntityGetterService(
        initialDataGetter(),
        additionDataGetter(),
        entityValuesGetter(),
    )
};