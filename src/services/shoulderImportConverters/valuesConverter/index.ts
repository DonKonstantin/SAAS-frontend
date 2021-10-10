import {ValuesConverterInterface} from "./interface";
import {ValuesConverter} from "./ValuesConverter";

// Фабрика сервиса
export const valuesConverter: {(): ValuesConverterInterface} = () => {
    return new ValuesConverter();
};