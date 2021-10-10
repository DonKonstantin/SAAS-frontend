import {NullableTerminalLoaderInterface} from "./interface";
import {NullableTerminalLoader} from "./NullableTerminalLoader";
import {graphQLClient} from "../../../graphQLClient";

// Фабрика сервиса
export const nullableTerminalLoader: {(): NullableTerminalLoaderInterface} = () => {
    return new NullableTerminalLoader(graphQLClient())
};