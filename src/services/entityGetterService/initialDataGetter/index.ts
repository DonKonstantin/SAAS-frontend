import {InitialDataGetterInterface} from "./interfaces";
import {InitialDataGetter} from "./InitialDataGetter";

// Фабрика сервиса
export const initialDataGetter: {(token?: string): InitialDataGetterInterface} = (token?: string) => {
    return new InitialDataGetter(token)
}