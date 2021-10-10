import {AdditionDataGetterInterface} from "./interfaces";
import {AdditionDataGetter} from "./AdditionDataGetter";

// Фабрика сервиса
export const additionDataGetter: {(token?: string): AdditionDataGetterInterface} = (token?: string) => {
    return new AdditionDataGetter(token)
}