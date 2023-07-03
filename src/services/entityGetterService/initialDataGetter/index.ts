import {InitialDataGetterInterface} from "./interfaces";
import {InitialDataGetter} from "./InitialDataGetter";

// Фабрика сервиса
export const initialDataGetter: { (): InitialDataGetterInterface } = () => {
    return new InitialDataGetter()
}