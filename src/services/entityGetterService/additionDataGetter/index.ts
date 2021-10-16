import {AdditionDataGetterInterface} from "./interfaces";
import {AdditionDataGetter} from "./AdditionDataGetter";

// Фабрика сервиса
export const additionDataGetter: { (): AdditionDataGetterInterface } = () => {
    return new AdditionDataGetter()
}